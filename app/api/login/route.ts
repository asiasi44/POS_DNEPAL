//@ts-nocheck
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body)
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,

      },
    });
    if (!findUser) {
      return NextResponse.json(
        { message: "Crendentials do not match!" },
        { status: 401 }
      );
    }
    if (findUser) {
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
      if (passwordCorrect) {
        const token = jwt.sign(
          {
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

        (await cookies()).set({
          name: "auth",
          value: token,
          httpOnly: true,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        return NextResponse.json({
          message: "User Logged in Successfully",
          name: findUser.name,
        });
      }
    }
  } catch (error) {
    console.log("Error finding User", error);
  }
  return NextResponse.json(
    { message: "Wrong Credentials!!!" },
    { status: 401 }
  );
}

export async function DELETE() {
  try {
    const deletedCookies = (await cookies()).delete({ name: "auth" });
    return NextResponse.json({ success: "Successfully Removed Cookie" });
  } catch (error) {
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
}
