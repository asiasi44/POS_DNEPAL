import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { User } from "@/app/generated/prisma/client";

export const GET = async () => {
  try {
    await verifyAuth();

    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      brandName: p.brand?.name,
      categoryName: p.category?.name,
    }));

    return NextResponse.json({
      success: true,
      products: formatted,
    });
  } catch (e: any) {
    console.error("GET PRODUCT ERROR:", e.message);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const user: User = await verifyAuth();
    const body = await req.json();

    console.log("Incoming Product Body:", body);

    if (!body.name || !body.sku) {
      return NextResponse.json(
        { success: false, message: "Name and SKU are required" },
        { status: 400 }
      );
    }

    let companyId = user.companyId;
    
    if (user.role === "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, message: "Super Admin cannot create product" },
        { status: 403 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        costPrice: body.costPrice,
        sellingPrice: body.sellingPrice,
        unit: body.unit,
        minStock: body.minStock ?? 0,
        openingStock: body.openingStock ?? 0,
        categoryId: body.categoryId || null,
        brandId: body.brandId || null,
        expiryDate: body.expiryDate || null,
        companyId: companyId!,
        createdBy: user.role,
      },
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (e: any) {
    console.error("POST PRODUCT ERROR:", e);
    return NextResponse.json(
      {
        success: false,
        message: e.message || "Error creating product",
      },
      { status: 500 }
    );
  }
};