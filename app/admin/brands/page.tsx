"use client";

import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { brandsConfig } from "@/lib/config/brandsConfig";

const BrandsPage = () => {
	return <GenericCrudPage config={brandsConfig} />;
};

export default BrandsPage;
