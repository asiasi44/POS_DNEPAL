import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { User } from "@/app/generated/prisma/client";
import { productFormSchema } from "@/lib/clientSchema/product/schema";
import { stockService } from "@/lib/services/stock.service";

export const GET = async () => {
  try {
    await verifyAuth();

    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      brandName: p.brand?.name,
      categoryName: p.category?.name,
      createdByName: p.createdBy?.name,
      expiryDate: p.expiryDate
        ? new Date(p.expiryDate).toISOString().split("T")[0]
        : null,
    }));
    return NextResponse.json({
      success: true,
      products: formatted,
    });
  } catch (e: any) {
    console.error("GET PRODUCT ERROR:", e.message);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const user: User = await verifyAuth();
    const body = await req.json();

    const productData = productFormSchema.parse(body);

    const product = await prisma.$transaction(async (tx) => {
      if (user.companyId === null) {
        return NextResponse.json(
          { success: false, message: "Super Admin cannot create product" },
          { status: 403 },
        );
      }
      const product = await tx.product.create({
        data: {
          name: productData.name,
          sku: productData.sku,
          costPrice: productData.costPrice,
          sellingPrice: productData.sellingPrice,
          unit: productData.unit,
          image: "empty.com",
          currentStock: productData.currentStock,
          minStock: productData.minStock,
          categoryId: productData.categoryId || null,
          brandId: productData.brandId || null,
          expiryDate: new Date(productData.expiryDate) || null,
          companyId: user.companyId,
          createdById: user.id,
        },
      });
      await stockService.initializeStock(tx, {
        productId: product.id,
        userId: user.id,
        quantity: product.currentStock,
        reason: "Initialize Product",
      });

      return product;
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
      { status: 500 },
    );
  }
};
