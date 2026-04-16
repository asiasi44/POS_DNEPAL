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
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => row.getValue("quantity"),
  },
  {
    accessorKey: "action",
    header: "Type",
    cell: ({ row }) => row.getValue("action"),
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => row.getValue("balance"),
  },
  {
    accessorKey: "userName",
    header: "Created By",
    cell: ({ row }) => row.getValue("userName"),
  },
  {
    accessorKey: "reason",
    header: "Note",
    cell: ({ row }) => row.getValue("reason"),
  },
];
