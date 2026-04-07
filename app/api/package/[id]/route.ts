import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // const deletedPackage = await prisma.package.delete({
    //   where: {
    //     id: parseInt(id),
    //   },
    // });
    return NextResponse.json({
      message: "Successfully Deleted Package",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while Deleting Package",
        error: error,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const patchedPackage = await prisma.package.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        price: parseFloat(body.price),
        interval: body.interval,
        maxProducts: parseInt(body.maxProducts),
        maxStaff: parseInt(body.maxStaff),
        maxWarehouses: parseInt(body.maxWarehouses),
        maxStockAdjust: parseInt(body.maxStockAdjust),
        enableAdvanced: body.enableReports,
        enableReports: body.enableAdvanced,
      },
    });
    console.log(patchedPackage);
    return NextResponse.json({
      message: "Package Edited Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error editing Package",
        error: error,
      },
      { status: 500 },
    );
  }
}
