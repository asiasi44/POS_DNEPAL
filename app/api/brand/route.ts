import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const GET = async () => {
	const brands = await prisma.brand.findMany({
		orderBy: { createdAt: "desc" },
	});

	return NextResponse.json({
		success: true,
		brands,
	});
};

export const POST = async (req: Request) => {
	const body = await req.json();
	const user = await verifyAuth();

	const brand = await prisma.brand.create({
		data: {
			...body,
			companyId: user.companyId!,
		},
	});

	return NextResponse.json({
		success: true,
		brand,
	});
};
