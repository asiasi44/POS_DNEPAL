"use client";

import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { staffConfig } from "@/lib/config/staffConfig";

export default function StaffPage() {
  return <GenericCrudPage config={staffConfig} />;
}
