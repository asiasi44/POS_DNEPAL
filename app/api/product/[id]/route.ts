import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export const PATCH = async (req: Request, { params }: any) => {
	try {
		const body = await req.json();
		const user = await verifyAuth();

		const existing = await prisma.product.findFirst({
			where: {
				id: params.id,
				companyId: user.companyId!,
			},
		});

		if (!existing) {
			return NextResponse.json(
				{ success: false, message: "Product not found or unauthorized" },
				{ status: 404 },
			);
		}

		const updated = await prisma.product.update({
			where: {
				id: params.id,
			},
			data: body,
		});

		return NextResponse.json({
			success: true,
			updated,
		});
	} catch (e: any) {
		console.error("PATCH PRODUCT ERROR:", e);
		return NextResponse.json(
			{ success: false, message: "Update failed" },
			{ status: 500 },
		);
	}
};

export const DELETE = async (_: Request, { params }: any) => {
	try {
		const user = await verifyAuth();

		const existing = await prisma.product.findFirst({
			where: {
				id: params.id,
				companyId: user.companyId!,
			},
		});

		if (!existing) {
			return NextResponse.json(
				{ success: false, message: "Product not found or unauthorized" },
				{ status: 404 },
			);
		}

		const deleted = await prisma.product.delete({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json({
			success: true,
			deleted,
		});
	} catch (e: any) {
		console.error("DELETE PRODUCT ERROR:", e);
		return NextResponse.json(
			{ success: false, message: "Delete failed" },
			{ status: 500 },
		);
	}
};
