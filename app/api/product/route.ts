import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { UserRole } from "@/app/generated/prisma/enums";

export const GET = async () => {
  try {
    const user = await verifyAuth();

		const products = await prisma.product.findMany({
			include: {
				brand: true,
				category: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const formatted = products.map((p) => ({
			...p,
			brandName: p.brand?.name,
			categoryName: p.category?.name,
		}));

		return NextResponse.json({
			success: true,
			products: formatted, 
		});
	} catch (e) {
		console.log(e, "GET PRODUCT ERROR");
		return NextResponse.json(
			{
				success: false,
				message: "Error fetching products",
			},
			{ status: 500 }
		);
	}
};

export const POST = async (req: Request) => {
	try {
		const user = await verifyAuth();
		const body = await req.json();

		let companyId = user.companyId;

		//SUPER_ADMIN support
		if (user.role === UserRole.SUPER_ADMIN) {
			const company = await prisma.company.findFirst();

			if (!company) {
				return NextResponse.json({
					success: false,
					message: "No company found. Create one first.",
				});
			}

			companyId = company.id;
		}

		const product = await prisma.product.create({
			data: {
				...body,
				companyId: companyId!,
				createdBy: user.role,
			},
		});

		return NextResponse.json({
			success: true,
			product,
		});
	} catch (e) {
		console.log(e, "POST PRODUCT ERROR");
		return NextResponse.json(
			{
				success: false,
				message: "Error creating product",
			},
			{ status: 500 }
		);
	}
};
