import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errorHandler";
import { verifyAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

<<<<<<< HEAD
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
=======
    const newPackage = await prisma.package.create({
      data: {
        name: reqBody.name,
        price: parseFloat(reqBody.price),
        interval: reqBody.interval,
        maxProducts: parseInt(reqBody.maxProducts),
        maxStaff: parseInt(reqBody.maxStaff),
        maxWarehouses: parseInt(reqBody.maxWarehouses),
        maxStockAdjust: parseInt(reqBody.maxStockAdjust),
        enableReports: reqBody.enableReports,
        enableAdvanced: reqBody.enableAdvanced,
      },
    });

    return NextResponse.json(
      {
        message: "Package created successfully",
        data: reqBody,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating package", error: error },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const packages = await prisma.package.findMany();
    return NextResponse.json({
      message: "Packages fetched",
      packages: packages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching packages", error: error },
      { status: 500 },
    );
  }
}
>>>>>>> main
