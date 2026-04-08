'use client'
import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { subscriptionConfig } from "@/lib/config/subscriptionConfig";

export default function SubscriptionPage() {
  return <GenericCrudPage config={subscriptionConfig} />;
}
