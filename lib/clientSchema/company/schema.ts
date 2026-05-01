import * as z from "zod";

export const companyWithAdminFormSchema = z.object({
  id: z.string().optional(),

  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  pan: z.string().min(1, "PAN is required"),

  logoUrl: z.string().optional(),

  isActive: z.boolean().default(false),

  currency: z.string().default("NPR"),
  rounding: z.number().int().default(2),

  adminEmail: z.email(),
  adminName: z.string().min(1, "Admin name is required"),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),

  adminIsActive: z.coerce.boolean().default(false),
});

export type CompanyWithAdminTypeForm = z.infer<
  typeof companyWithAdminFormSchema
>;