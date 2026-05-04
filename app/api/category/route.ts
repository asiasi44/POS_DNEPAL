import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errorHandler";
import { verifyAuth } from "@/lib/auth";
import slugify from "slugify";

type Params = { params: Promise<{ id: string }> };

export const POST = withErrorHandler(async function (
  request: NextRequest,
) {
  const body = await request.json();

  const slug = slugify(body.name, {
    lower: true,
  });
  const user = await verifyAuth();

  const createdUser = user.role;

  const createdCategory = await prisma.category.create({
    data: {
      name: body.name,
      slug: slug,
      createdBy: user.role,
      companyId: user.companyId,
    },
  });

  return NextResponse.json({
    sucess: true,
    categories: createdCategory,
  });
});

export const GET = withErrorHandler(async function (
  request: NextRequest,
) {
  const user = await verifyAuth();
  const allCategories = await prisma.category.findMany({
    where: { companyId: user.companyId },
  });

  return NextResponse.json({
    success: true,
    categories: allCategories,
  });
});
