//@ts-nocheck
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();

    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    // ❌ User not found
    if (!findUser) {
      return NextResponse.json(
        { message: "Credentials do not match!" },
        { status: 401 }
      );
    }

    // ❌ Inactive user (✅ ADDED)
    if (!findUser.isActive) {
      return NextResponse.json(
        { message: "Your account is not active. Contact admin." },
        { status: 403 }
      );
    }

    // 🔐 Check password
    const passwordCorrect = await bcrypt.compare(
      body.password,
      findUser.password
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Wrong password!" },
        { status: 401 }
      );
    }

    // 🏢 Company Admin Subscription Check
    if (findUser.role === "COMPANY_ADMIN") {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          companyId: findUser.companyId,
          isActive: true,
        },
      });

      if (!findSubscription) {
        return NextResponse.json(
          { message: "No active subscription found" },
          { status: 403 }
        );
      }

      if (new Date() > findSubscription.endDate) {
        await prisma.subscription.update({
          where: { id: findSubscription.id },
          data: { isActive: false },
        });

        await prisma.company.update({
          where: { id: findUser.companyId },
          data: { isActive: false }, // ✅ FIXED (was true before ❌)
        });

        return NextResponse.json(
          { message: "Subscription expired. Contact admin." },
          { status: 403 }
        );
      }
    }

    // 🔑 Create JWT
    const token = jwt.sign(
      {
        id: findUser.id,
        name: findUser.name,
        companyId: findUser.companyId,
        role: findUser.role,
        email: findUser.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    // 🍪 Set cookie
    (await cookies()).set({
      name: "auth",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return NextResponse.json({
      message: "User Logged in Successfully",
      user: {
        id: findUser.id,
        role: findUser.role,
        companyId: findUser.companyId,
        name: findUser.name,
      },
    });
  } catch (error) {
    console.log("Error finding User", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// 🚪 LOGOUT
export async function DELETE() {
  try {
    (await cookies()).delete("auth");

    return NextResponse.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}