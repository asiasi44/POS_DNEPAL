import * as z from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  sku: z.string(),
  sellingPrice: z.number(),
  unit: z.string(),
  openingStock: z.number(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  categoryName: z.string().optional(),
  brandName: z.string().optional(),
  createdBy: z.string().optional(),
});

export type ProductType = z.infer<typeof productSchema>;