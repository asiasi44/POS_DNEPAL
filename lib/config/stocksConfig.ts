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

	filters: { 
		search: {
			placeholder: "Search product...",
			fields: ["productName"],
		},
		selects: [
			{
				key: "action",
				placeholder: "Filter by Type",
				options: [
					{ label: "Stock In", value: "STOCK_IN" },
					{ label: "Stock Out", value: "STOCK_OUT" },
					{ label: "Adjustment", value: "ADJUSTMENT" },
				],
			},
			{
				key: "warehouse",
				placeholder: "Filter by Warehouse",
				options: [
					{ label: "Main", value: "Main" },
					{ label: "Store", value: "Store" },
				],
			},
		],
	},
};	