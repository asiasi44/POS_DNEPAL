import { ColumnDef } from "@tanstack/react-table";
import { CompanyStaffType } from "./schema";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

export const getCompanyStaffColumns = (): ColumnDef<CompanyStaffType>[] => [
  {
    accessorKey: "name",
    header: "Staff Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "role",
    header: "Staff Role",
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
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
];
