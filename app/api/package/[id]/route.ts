import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export const PATCH = withErrorHandler<Params>(async function (
	request: NextRequest,
	{ params }: Params,
) {
	const body = await request.json();
	const { id } = await params;

	const updatedPackage = await prisma.package.update({
		where: {
			id,
		},
		data: {
			name: body.name,
			price: body.price,
			interval: body.interval,
			maxProducts: body.maxProducts,
			maxStaff: body.maxStaff,
			maxWarehouses: body.maxWarehouses,
			maxStockAdjust: body.maxStockAdjust,
			enableReports: body.enableReports,
			enableAdvanced: body.enableAdvanced,
		},
	});

	return NextResponse.json({
		success: true,
		message: `PATCH package ${id}`,
		updatedPackage,
	});
});

export const DELETE = withErrorHandler<Params>(async function (
	request: NextRequest,
	{ params }: Params,
) {
	const { id } = await params;

	const deletedPackage = await prisma.package.delete({
		where: { id },
	});

	return NextResponse.json({
		success: true,
		deletedPackage,
	});
});
