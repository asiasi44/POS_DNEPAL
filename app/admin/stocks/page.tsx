"use client";

import GenericCrudPage from "@/components/crud/GenericCrudPage";
import { stocksConfig } from "@/lib/config/stocksConfig";

const StocksPage = () => {
	return <GenericCrudPage config={stocksConfig} />;
};

export default StocksPage;
