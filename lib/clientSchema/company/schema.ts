import * as z from "zod";

export const companyWithAdminFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  pan: z.string(),
  logoUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  currency: z.string().default("NPR"),
  rounding: z.number().int().default(2),
  adminEmail: z.email(),
  adminName: z.string(),
  adminPassword: z.string(),
  adminIsActive: z.coerce.boolean(),
});

export type CompanyWithAdminTypeForm = z.infer<
  typeof companyWithAdminFormSchema
>;
