import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errorHandler";
import { verifyAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export const POST = withErrorHandler<Params>(async function (
	request: NextRequest,
	{ params }: Params,
) {
	const body = await request.json();
	const user = await verifyAuth();
	const createdUser = user.role;

	const createdPackage = await prisma.package.create({
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
			// optional: if you want to track who created it
			// createdBy: createdUser,  // add field in Prisma if needed
		},
	});

	return NextResponse.json({
		success: true,
		packages: createdPackage,
	});
});

export const GET = withErrorHandler<Params>(async function (
	request: NextRequest,
	{ params }: Params,
) {
	const allPackages = await prisma.package.findMany();

	return NextResponse.json({
		success: true,
		packages: allPackages,
	});
});
