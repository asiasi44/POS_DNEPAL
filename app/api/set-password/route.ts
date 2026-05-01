import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { token, password } = await req.json();

	const record = await prisma.emailVerificationToken.findUnique({
		where: { token },
	});

	if (!record) {
		return NextResponse.json({ message: "Invalid token" }, { status: 400 });
	}

	if (record.expiresAt < new Date()) {
		return NextResponse.json({ message: "Token expired" }, { status: 400 });
	}

	const hashed = await bcrypt.hash(password, 10);

	await prisma.user.update({
		where: { email: record.email },
		data: {
			password: hashed,
			isActive: true,
		},
	});

	await prisma.company.updateMany({
		where: {
			users: {
				some: { email: record.email },
			},
		},
		data: { isActive: true },
	});

	await prisma.emailVerificationToken.deleteMany({
		where: { token },
	});

	return NextResponse.json({
		message: "Password set successfully",
	});
}
