import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const PATCH = async (req: Request, { params }: any) => {
	const body = await req.json();
	const user = await verifyAuth();

	const updated = await prisma.product.update({
		where: {
			id: params.id,
			companyId: user.companyId,
		},
		data: body,
	});

	return NextResponse.json({
		success: true,
		updated,
	});
};

export const DELETE = async (_: Request, { params }: any) => {
	const user = await verifyAuth();

	const deleted = await prisma.product.delete({
		where: {
			id: params.id,
			companyId: user.companyId,
		},
	});

	return NextResponse.json({
		success: true,
		deleted,
	});
};
