import { StockType } from "../clientSchema/stock/schema";
import { getStockColumns } from "../clientSchema/stock/columns";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const stockCrud = createCrudHooks<StockType>({
	endpoint: "stock",
	queryKey: "stocks",
});

export const {
	useGetAll: useGetAllStocks,
	useCreate: useCreateStock,
	useDelete: useDeleteStock,
	useUpdate: useUpdateStock,
} = stockCrud;

export const useStockTable = createCrudTableHook<StockType>({
	useGetAll: useGetAllStocks,
	getColumns: getStockColumns,
	dataKey: "stocks",
});
