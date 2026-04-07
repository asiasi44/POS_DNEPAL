import { ColumnDef } from "@tanstack/react-table";
import { BrandType } from "./schema";

export const getBrandColumns = (): ColumnDef<BrandType>[] => [
	{
		accessorKey: "name",
		header: "Brand",
		cell: ({ row }) => row.getValue("name"),
	},
	{
		accessorKey: "createdAt",
		header: "Created Date",
		cell: ({ row }) => {
			const val = row.getValue("createdAt") as Date;
			return val ? new Date(val).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (row.getValue("status") ? "Active" : "Inactive"),
	},
];
