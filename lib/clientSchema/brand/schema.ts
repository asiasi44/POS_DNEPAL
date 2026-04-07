import * as z from "zod";

export const brandSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	status: z.boolean().default(true),
	createdAt: z.date().optional(),
});

export type BrandType = z.infer<typeof brandSchema>;
