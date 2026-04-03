//@ts-nocheck

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const subscriptions = await prisma.subscription.findMany({
      select: {
        startDate: true,
        endDate: true,
        package: {
          select: {
            id: true,
            name: true,
            interval: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Successfully fetched Subscriptions",
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching subscriptions", success: false },
      { status: 500 },
    );
  }
}
