import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const GET = async () => {
	const user = await verifyAuth();

	const stocks = await prisma.stockLog.findMany({
		include: {
			product: true,
			user: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formatted = stocks.map((s) => ({
		...s,
		productName: s.product?.name,
		userName: s.user?.name,
	}));

	return NextResponse.json({
		success: true,
		stocks: formatted,
	});
};

export const POST = async (req: Request) => {
	const body = await req.json();
	const user = await verifyAuth();

	const stock = await prisma.stockLog.create({
		data: {
			...body,
			userId: user.id,
		},
	});

	return NextResponse.json({
		success: true,
		stock,
	});
};
