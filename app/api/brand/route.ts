import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const GET = async () => {
  const user = await verifyAuth();

  if (user.companyId === null) {
    const brandsForSuperadmin = await prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      brandsForSuperadmin,
    });
  }

  const brands = await prisma.brand.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      companyId: user.companyId,
    },
  });

  return NextResponse.json({
    success: true,
    brands,
  });
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const user = await verifyAuth();

  const brand = await prisma.brand.create({
    data: {
      ...body,
      companyId: user.companyId!,
    },
  });

  return NextResponse.json({
    success: true,
    brand,
  });
};
