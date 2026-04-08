import { SubscriptionFormType } from "./schema";
import { ColumnDef } from "@tanstack/react-table";

export const getSubscriptionColumns = (): ColumnDef<SubscriptionFormType>[] => [
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => row.getValue("companyName"),
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
    cell: ({ row }) => row.getValue("packageName"),
  },
  {
    accessorKey: "packageType",
    header: "Package Interval",
    cell: ({ row }) => row.getValue("packageType"),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("startDate")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("endDate")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
];
