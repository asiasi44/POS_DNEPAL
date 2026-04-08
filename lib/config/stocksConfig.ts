import StockFormView from "@/components/stocks/StockFormView";
import { stockSchema, StockType } from "../clientSchema/stock/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
	useStockTable,
	useCreateStock,
	useDeleteStock,
	useGetAllStocks,
	useUpdateStock,
} from "../hooks/useStock";

export const stocksConfig: CrudConfig<StockType, StockType> = {
	entityName: "Stock",
	entityNamePlural: "Stock Logs",
	description: "Manage stock movements",
	schema: {
		create: stockSchema,
		update: stockSchema,
		row: stockSchema,
	},
	defaultValues: {
		productId: "",
		quantity: 0,
		action: "STOCK_IN",
	},
	FormView: StockFormView,
	formId: "form-rhf-stocks",
	hooks: {
		useTable: useStockTable,
		useCreate: useCreateStock,
		useUpdate: useUpdateStock,
		useDelete: useDeleteStock,
		useGetAll: useGetAllStocks,
	},
};	