import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const GET = async () => {
  try {
    const user = await verifyAuth();

    const products = await prisma.product.findMany();

    // console.log(products, "hello");
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (e) {
    console.log(e, "heeeee");
    return NextResponse.json(
      {
        success: false,
        message: "Error aayo yaar",
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  const user = await verifyAuth();
  if (!user.userId) {
    return NextResponse.json({
      success: true,
      message: "Superadmin can not add product haii",
    });
  }
  const body = await req.json();

  // const product = await prisma.product.create({
  // 	data: {
  // 		...body,
  // 		companyId: user.companyId,
  // 		createdBy: user.role,
  // 	},
  // });

  return NextResponse.json({
    success: true,
  });
};
