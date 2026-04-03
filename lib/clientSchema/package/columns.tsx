import { ColumnDef } from "@tanstack/react-table";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { PackageFormType } from "./schema";

export const getPackagesColumns = (): ColumnDef<PackageFormType>[] => [
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `Rs. ${row.getValue("price")}`,
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
    accessorKey: "maxStockAdjust",
    header: "Max StockAdjust",
    cell: ({ row }) => row.getValue("maxStockAdjust"),
  },
  {
    accessorKey: "enableReports",
    header: "Report",
    cell: ({ row }) => {
      if (row.getValue("enableReports") === true) {
        return (
          <div>
            <FaToggleOn className="text-green-500 text-2xl" />
          </div>
        );
      }
      return (
        <div>
          <FaToggleOff className="text-2xl" />
        </div>
      );
    },
  },
  {
    accessorKey: "enableAdvanced",
    header: "Advanced",
    cell: ({ row }) => {
      if (row.getValue("enableAdvanced") === true) {
        return (
          <div>
            <FaToggleOn className="text-green-500 text-2xl" />
          </div>
        );
      }
      return (
        <div>
          <FaToggleOff className="text-2xl" />
        </div>
      );
    },
  },
];
