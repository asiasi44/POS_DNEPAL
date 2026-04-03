import { ColumnDef } from "@tanstack/react-table";
import { PackageType } from "./schema";

export const getPackagesColumns = (): ColumnDef<PackageType>[] => [
	{
		accessorKey: "name",
		header: "Package Name",
		cell: ({ row }) => row.getValue("name"),
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => row.getValue("price"),
	},
	{
		accessorKey: "interval",
		header: "Interval",
		cell: ({ row }) => row.getValue("interval"),
	},
	{
		accessorKey: "maxProducts",
		header: "Max Products",
		cell: ({ row }) => row.getValue("maxProducts"),
	},
	{
		accessorKey: "maxStaff",
		header: "Max Staff",
		cell: ({ row }) => row.getValue("maxStaff"),
	},
	{
		accessorKey: "maxWarehouses",
		header: "Max Warehouses",
		cell: ({ row }) => row.getValue("maxWarehouses"),
	},
	{
		accessorKey: "enableReports",
		header: "Reports Enabled",
		cell: ({ row }) => (row.getValue("enableReports") ? "Yes" : "No"),
	},
	{
		accessorKey: "enableAdvanced",
		header: "Advanced Enabled",
		cell: ({ row }) => (row.getValue("enableAdvanced") ? "Yes" : "No"),
	},
];
