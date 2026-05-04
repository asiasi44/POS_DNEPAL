import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { stockSchema } from "@/lib/clientSchema/stock/schema";
import { stockService } from "@/lib/services/stock.service";

export const GET = async () => {
  const user = await verifyAuth();

  const stocks = await prisma.stockLog.findMany({
    include: {
      product: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted = stocks.map((s: any) => ({
    ...s,
    productName: s.product?.name,
    userName: s.user?.name,
  }));

  return NextResponse.json({
    success: true,
    stocks: formatted,
  });
};

export const POST = async (req: Request) => {
  const body = await req.json();

  const user = await verifyAuth();

  const stockData = stockSchema.parse(body);

  await prisma.$transaction(async (tx: any) => {
    if (stockData.action === "STOCK_IN") {
      await stockService.stockIn(tx, {
        productId: stockData.productId,
        reason: stockData.reason,
        quantity: stockData.quantity,
        userId: user.id,
      });
    }

    if (stockData.action === "STOCK_OUT") {
      await stockService.stockOut(tx, {
        productId: stockData.productId,
        reason: stockData.reason,
        quantity: stockData.quantity,
        userId: user.id,
      });
    }
  });

  return NextResponse.json({
    success: true,
    stock: [],
  });
};
