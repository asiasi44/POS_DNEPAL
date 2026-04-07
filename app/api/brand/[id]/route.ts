import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: any) => {
	const body = await req.json();

	const updated = await prisma.brand.update({
		where: { id: params.id },
		data: body,
	});

	return NextResponse.json({
		success: true,
		updated,
	});
};

export const DELETE = async (_: Request, { params }: any) => {
	await prisma.brand.delete({
		where: { id: params.id },
	});

	return NextResponse.json({
		success: true,
	});
};
