import { Product, User } from "@/app/generated/prisma/client";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user: User = await verifyAuth();
  if (!user.companyId) {
    return NextResponse.json({
      success: false,
      message: "Company user of a specific company can checkout",
    });
  }
  const items = await prisma.sale.create({
    data: {
      userId: user.id,
      companyId: user.companyId,
      subtotal: body.subtotal,
      discount: body.discount,
      vat: body.vat,
      total: body.total,
      status: "PENDING",

      items: {
        create: body.cart.map(
          (item: { product: Product; quantity: number }) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.sellingPrice,
            total: item.product.sellingPrice * item.quantity,
            companyId: user.companyId,
          }),
        ),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  // Get company details
  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
  });

  return NextResponse.json({
    success: true,
    message: "Checkout Carried Successfully",
    data: {
      sale: items,
      company,
      user,
    },
  });
}

export async function GET(request: NextRequest) {
  const sales = await prisma.sale.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
    message: "All checkouts",
    sales,
  });
}
