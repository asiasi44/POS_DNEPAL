import * as z from "zod";

export const stockSchema = z.object({
	id: z.string().optional(),
	productId: z.string(),
	quantity: z.number(),
	action: z.enum(["STOCK_IN", "STOCK_OUT", "ADJUSTMENT"]),
	source: z.string().optional(),
	reason: z.string().optional(),
	warehouse: z.string().optional(),

	productName: z.string().optional(),
	userName: z.string().optional(),
	balance: z.number().optional(),
	createdAt: z.date().optional(),
});

export type StockType = z.infer<typeof stockSchema>;
