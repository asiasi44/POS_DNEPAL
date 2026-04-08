import { companyStaffSchema } from "@/lib/clientSchema/companystaff/schema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const staffs = await prisma.user.findMany({
    where: {
      role: {
        not: "SUPER_ADMIN",
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      companyId: true,
    },
  });
  console.log(staffs);
  return NextResponse.json({
    success: true,
    staffs,
  });
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  const body = companyStaffSchema.parse(json);

  const passwordHash = await bcrypt.hash(body.password, 10);

  const newStaff = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: passwordHash,
      role: body.role,
    },
  });
  return NextResponse.json({
    success: true,
    message: "Staff Added Successfully",
    newStaff,
  });
}
