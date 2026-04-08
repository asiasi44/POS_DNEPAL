import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deletedSubscription = await prisma.subscription.delete({
      where: {
        id: id,
      },
    });
    console.log(deletedSubscription);
    return NextResponse.json({
      success: true,
      message: "Subscription Deleted Successfully",
    });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json(
      {
        success: false,
        message: "Failed to Delete Subscription",
      },
      { status: 500 },
    );
  }
}
