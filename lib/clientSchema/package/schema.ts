import * as z from "zod";

export const packageFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  interval: z.enum(["MONTHLY", "YEARLY"]),
  maxProducts: z.number(),
  maxStaff: z.number(),
  maxWarehouses: z.number().optional(),
  maxStockAdjust: z.number().optional(),
  enableReports: z.boolean().default(true),
  enableAdvanced: z.boolean().default(false),
});

export type PackageFormType = z.infer<typeof packageFormSchema>;
