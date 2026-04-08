import { SubscriptionFormView } from "@/components/subscription/SubscriptionFormView";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
  SubscriptionFormType,
  SubscriptionRowType,
  subscriptionSchema,
} from "../clientSchema/subscription/schema";
import {
  useCreateSubscription,
  useDeleteSubscription,
  useGetAllSubscriptions,
  useSubscriptionsTable,
  useUpdateSubscription,
} from "../hooks/useSubscription";

export const subscriptionConfig: CrudConfig<
  SubscriptionFormType,
  SubscriptionRowType
> = {
  entityName: "Subscription",
  entityNamePlural: "Subscriptions",
  description: "Subscribe a Pacakge for your Company",
  schema: {
    create: subscriptionSchema,
    update: subscriptionSchema,
    row: subscriptionSchema,
  },
  defaultValues: {
    startDate: new Date().toISOString().split("T")[0],
  },
  FormView: SubscriptionFormView,
  formId: "form-rhf-subscription",
  hooks: {
    useTable: useSubscriptionsTable,
    useUpdate: useUpdateSubscription,
    useCreate: useCreateSubscription,
    useGetAll: useGetAllSubscriptions,
    useDelete: useDeleteSubscription,
  },
};
