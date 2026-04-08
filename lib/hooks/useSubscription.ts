import { getSubscriptionColumns } from "../clientSchema/subscription/columns";
import {
  SubscriptionFormType,
  SubscriptionRowType,
} from "../clientSchema/subscription/schema";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const subscriptionCrud = createCrudHooks<SubscriptionFormType>({
  endpoint: "subscription",
  queryKey: "subscriptions",
});

export const {
  useGetAll: useGetAllSubscriptions,
  useCreate: useCreateSubscription,
  useUpdate: useUpdateSubscription,
  useDelete: useDeleteSubscription,
} = subscriptionCrud;

export const useSubscriptionsTable = createCrudTableHook<SubscriptionFormType>({
  useGetAll: useGetAllSubscriptions,
  getColumns: getSubscriptionColumns,
  dataKey: "subscriptions",
});
