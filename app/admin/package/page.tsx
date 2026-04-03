//@ts-nocheck
"use client";
import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { packageConfig } from "@/lib/config/packageConfig";

const PackagePage = () => {
  return <GenericCrudPage config={packageConfig} />;
};

export default PackagePage;
