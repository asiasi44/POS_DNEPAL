import { verifyAuth } from "@/lib/auth";
import { subscriptionSchema } from "@/lib/clientSchema/subscription/schema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await verifyAuth();

    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          sucess: false,
          subscriptions: [],
          message: "Only Super admin are allowed to view subscriptions",
        },
        { status: 500 },
      );
    }

    const subscriptions = await prisma.subscription.findMany({
      select: {
        id: true,
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
            id: true,
            name: true,
          },
        },
      },
    });

    const returnedSubscription = subscriptions.map((eachSubscription: any) => {
      const companyName = eachSubscription.company.name;
      const packageName = eachSubscription.package.name;
      const packageType = eachSubscription.package.interval;
      return {
        ...eachSubscription,
        companyName,
        packageName,
        packageType,
        packageId: eachSubscription.package.id,
        companyId: eachSubscription.company.id,
        startDate: new Date(eachSubscription.startDate)
          .toISOString()
          .split("T")[0],
      };
    });

    return NextResponse.json({
      message: "Successfully fetched Subscriptions",
      success: true,
      subscriptions: returnedSubscription,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching subscriptions", success: false },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth();
    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          message: "Only Super admin are allowed to add new Subscriptions",
          success: false,
        },
        { status: 500 },
      );
    }
    const json = await request.json();
    const body = subscriptionSchema.parse(json);

    const packageInfo = await prisma.package.findFirst({
      where: {
        id: body.packageId,
      },
    });
    if (!packageInfo) {
      throw new Error("Package not found");
    }

    // clone start date
    const startDate = new Date(body.startDate);
    let endDate = new Date(startDate);

    // monthly default
    endDate.setMonth(endDate.getMonth() + 1);

    // yearly override
    if (packageInfo.interval === "YEARLY") {
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    const newSubscription = await prisma.subscription.create({
      data: {
        packageId: body.packageId,
        companyId: body.companyId,
        startDate,
        endDate,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Subscription created Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to Create Subscription",
    });
  }
}
