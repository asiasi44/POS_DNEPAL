//@ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/Company";
import dbConnect from "@/lib/mongodb";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const passwordHash = await bcrypt.hash(reqBody.password, 10);

    const startDate = new Date();
    let endDate = new Date(startDate);

    const givenPackage = await prisma.package.findUnique({
      where: {
        id: parseInt(reqBody.packageId),
      },
    });

    if (givenPackage.type == "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    }
    if (givenPackage.type == "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const newCompany = await prisma.company.create({
      data: {
        name: reqBody.name,
        address: reqBody.address,
        phone: reqBody.phone,
        pan: reqBody.pan,
        users: {
          create: {
            name: reqBody.name,
            email: reqBody.email,
            password: passwordHash,
            role: "COMPANY_ADMIN",
          },
        },
        subscriptions: {
          create: {
            packageId: parseInt(reqBody.packageId),
            startDate: startDate,
            endDate: endDate,
            isActive: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Company created successfully",
      data: newCompany,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Company created successfully",
        data: newCompany,
      }),
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Error processing package", error: error }),
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const companiesRaw = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        pan: true,
        users: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
        subscriptions: {
          where: {
            isActive: true,
          },
          take: 1,
          select: {
            package: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    const companies = companiesRaw.map((c) => ({
      ...c,
      currentSubscription: c.subscriptions[0] ?? null,
      subscriptions: undefined,
    }));
    return NextResponse.json({
      message: "Company fetched",
      companies,
    });
    return new NextResponse(
      JSON.stringify({ message: "Company fetched", companies }),
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching packages", error: error }),
      { status: 500 },
    );
  }
}
