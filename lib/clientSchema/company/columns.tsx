import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { CompanyWithAdminTypeForm } from "./schema";
import { ColumnDef } from "@tanstack/react-table";

export const getCompanyColumns = (): ColumnDef<CompanyWithAdminTypeForm>[] => [
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.getValue("address"),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    accessorKey: "pan",
    header: "PAN Number",
    cell: ({ row }) => row.getValue("pan"),
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => row.getValue("logoUrl"),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      if (row.getValue("isActive") === true) {
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
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => row.getValue("currency"),
  },
  {
    accessorKey: "adminName",
    header: "Admin User",
    cell: ({ row }) => row.getValue("adminName"),
  },
];
