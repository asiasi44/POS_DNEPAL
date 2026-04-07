import { ColumnDef } from "@tanstack/react-table";
import { StockType } from "./schema";

export const getStockColumns = (): ColumnDef<StockType>[] => [
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
	},
	{
		accessorKey: "productName",
		header: "Product",
		cell: ({ row }) => row.getValue("productName"),
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse",
		cell: ({ row }) => row.getValue("warehouse") || "-",
	},
	{
		accessorKey: "action",
		header: "Type",
		cell: ({ row }) => row.getValue("action"),
	},
	{
		accessorKey: "quantity",
		header: "Qty",
		cell: ({ row }) => {
			const val = row.getValue("quantity") as number;
			return val > 0 ? `+${val}` : val;
		},
	},
	{
		accessorKey: "balance",
		header: "Balance",
		cell: ({ row }) => row.getValue("balance"),
	},
	{
		accessorKey: "source",
		header: "Source",
		cell: ({ row }) => row.getValue("source") || "-",
	},
	{
		accessorKey: "userName",
		header: "Person",
		cell: ({ row }) => row.getValue("userName"),
	},
];
