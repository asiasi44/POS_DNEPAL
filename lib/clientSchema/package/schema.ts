import * as z from "zod";

export const packageSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	price: z.number(),
	interval: z.enum(["MONTHLY", "YEARLY"]),
	maxProducts: z.number().int(),
	maxStaff: z.number().int(),
	maxWarehouses: z.number().int().optional().nullable(),
	maxStockAdjust: z.number().int().optional().nullable(),
	enableReports: z.boolean().default(true),
	enableAdvanced: z.boolean().default(false),
	createdAt: z.date().optional(),
});

export type PackageType = z.infer<typeof packageSchema>;
