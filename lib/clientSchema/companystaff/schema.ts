import * as z from "zod";

export const companyStaffSchema = z.object({
  id: z.string().optional(),
  email: z.email("Required Value"),
  password: z
    .string("Required Value")
    .min(8, "Should be minimum of 8 characters long"),
  name: z.string("Required Value").min(4, "Should be minimum of 4 characters"),
  role: z.enum(["COMPANY_ADMIN", "STAFF"]),
  isActive: z.boolean().optional(),
});

export type CompanyStaffType = z.infer<typeof companyStaffSchema>;
