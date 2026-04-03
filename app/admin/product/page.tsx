"use client";

import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { productsConfig } from "@/lib/config/productsConfig";

const ProductPage = () => {
  return <GenericCrudPage config={productsConfig} />;
};

export default ProductPage;