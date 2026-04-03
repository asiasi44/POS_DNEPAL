//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your singleton Prisma client

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

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
