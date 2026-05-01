import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { companyWithAdminFormSchema } from "@/lib/clientSchema/company/schema";
import { verifyAuth } from "@/lib/auth";
import { User } from "@/app/generated/prisma/client";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
	try {
		const user = await verifyAuth();

		if (user.role !== "SUPER_ADMIN") {
			return NextResponse.json(
				{
					success: false,
					message: "Only Super admin can create companies",
				},
				{ status: 403 },
			);
		}

		const json = await request.json();
		const body = companyWithAdminFormSchema.parse(json);

		const token = crypto.randomBytes(32).toString("hex");
		await prisma.emailVerificationToken.create({
			data: {
				email: body.adminEmail,
				token,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60),
			},
		});
		await sendVerificationEmail(body.adminEmail, token);

		const existingUser = await prisma.user.findUnique({
			where: { email: body.adminEmail },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "Email already exists" },
				{ status: 400 },
			);
		}

		const passwordHash = await bcrypt.hash(body.adminPassword, 10);

		const newCompany = await prisma.company.create({
			data: {
				name: body.name,
				address: body.address,
				phone: body.phone,
				pan: body.pan,
				logoUrl: body.logoUrl,

				isActive: false,
				currency: body.currency,
				rounding: body.rounding,

				users: {
					create: {
						name: body.adminName,
						email: body.adminEmail,
						password: passwordHash,
						role: "COMPANY_ADMIN",

						isActive: false,
					},
				},
			},
		});

		return NextResponse.json(
			{
				message: "Company created successfully",
				data: newCompany,
			},
			{ status: 201 },
		);
	} catch (error: any) {
		console.error("Create Company Error:", error);

		if (error?.errors) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{ message: "Error creating company" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	try {
		const user: User = await verifyAuth();

		if (user.role !== "SUPER_ADMIN") {
			return NextResponse.json(
				{
					message: "Only Super Admin can view companies",
					companies: [],
				},
				{ status: 403 },
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

		const formatted = companies.map((c) => ({
			...c,
			adminName: c.users?.[0]?.name || "-",
			adminEmail: c.users?.[0]?.email || "-",
			adminPassword: "",
		}));

		return NextResponse.json({
			message: "Companies fetched successfully",
			companies: formatted,
		});
	} catch (error) {
		console.error("Fetch Company Error:", error);

		return NextResponse.json(
			{ message: "Error fetching companies" },
			{ status: 500 },
		);
	}
}
