//@ts-nocheck
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deletedCompany = await prisma.company.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Deleted Successfully",
      success: true,
      deletedCompany,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting", success: false },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const updatedCompany = await prisma.company.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        pan: body.pan,
        users: {
          update: {
            where: {
              role: "COMPANY_ADMIN",
            },
            data: {
              email: body.email,
              ...(body.password && {
                password: await bcrypt.hash(body.password, 10),
              }),
            },
          },
        },
      },
    });
    console.log(body);
    return NextResponse.json({
      message: "Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Updating", success: false },
      { status: 500 },
    );
  }
}
