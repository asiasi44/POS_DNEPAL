import * as z from "zod";

export const subscriptionSchema = z.object({
  id: z.string().optional(),
  companyId: z.string(),
  packageId: z.string(),
  startDate: z.string().date(),
  companyName: z.string().optional(),
  packageName: z.string().optional(),
  packageType: z.enum(["MONTHLY", "YEARLY"]).optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().optional(),
});

export type SubscriptionRowType = {
  id: string;
  companyName: string;
  packageName: string;
  packageType: "MONTHLY" | "YEARLY";
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};

export type SubscriptionFormType = z.infer<typeof subscriptionSchema>;
