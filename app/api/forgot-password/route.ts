import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json(
				{ message: "Email is required" },
				{ status: 400 },
			);
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json({
				message: "If this email exists, a reset link has been sent",
			});
		}

		const token = crypto.randomBytes(32).toString("hex");

		await prisma.emailVerificationToken.deleteMany({
			where: { email },
		});

		await prisma.emailVerificationToken.create({
			data: {
				email,
				token,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
			},
		});

		await sendVerificationEmail(email, token);

		return NextResponse.json({
			message: "If this email exists, a reset link has been sent",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 },
		);
	}
}
