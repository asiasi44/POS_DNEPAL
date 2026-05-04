import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { companyWithAdminFormSchema } from "@/lib/clientSchema/company/schema";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth();
    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Only Super admin are allowed to create companies",
        },
        { status: 500 },
      );
    }

    const json = await request.json();

    const body = companyWithAdminFormSchema.parse(json);

    const passwordHash = await bcrypt.hash(body.adminPassword, 10);

    const newCompany = await prisma.company.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        pan: body.pan,
        logoUrl: body.logoUrl,
        isActive: true,
        currency: body.currency,
        rounding: body.rounding,
        users: {
          create: {
            name: body.adminName,
            password: passwordHash,
            email: body.adminEmail,
            role: "COMPANY_ADMIN",
            isActive: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Company created successfully",
      data: newCompany,
    });
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
    const user = await verifyAuth();

    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          message: "Only Super Admin can view Companies",
          success: false,
          companies: [],
        },
        { status: 500 },
      );
    }
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        pan: true,
        logoUrl: true,
        isActive: true,
        currency: true,
        rounding: true,
        users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const formatted = companies.map((c: any) => ({
      ...c,
      adminName: c.users?.[0]?.name || "-",
      adminEmail: c.users?.[0]?.email || "-",
      adminPassword: "",
    }));

    // const companies = companiesRaw.map((c) => ({
    //   ...c,
    //   currentSubscription: c.subscriptions[0] ?? null,
    //   subscriptions: undefined,
    // }));
    return NextResponse.json({
      message: "Company fetched",
      companies: formatted,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching packages", error: error }),
      { status: 500 },
    );
  }
}
