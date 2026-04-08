import { ColumnDef } from "@tanstack/react-table";
import { ProductFormType } from "./schema";
import { FaEdit, FaTrash } from "react-icons/fa";

export const getProductsColumns = (): ColumnDef<ProductFormType>[] => [
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => row.getValue("sku"),
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => row.getValue("categoryName"),
  },
  {
    accessorKey: "brandName",
    header: "Brand",
    cell: ({ row }) => row.getValue("brandName"),
  },
  {
    accessorKey: "sellingPrice",
    header: "Price",
    cell: ({ row }) => row.getValue("sellingPrice"),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => row.getValue("unit"),
  },
  {
    accessorKey: "openingStock",
    header: "Qty",
    cell: ({ row }) => row.getValue("openingStock"),
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => row.getValue("createdBy"),
  },
  {
  id: "actions",
  header: "Actions",
  cell: ({ row, table }) => {
    const data = row.original;

    return (
      <div className="flex gap-3">
        <button onClick={() => table.options.meta?.onEdit(data)}>
          <FaEdit className="text-blue-500 cursor-pointer" />
        </button>

        <button onClick={() => table.options.meta?.onDelete(data)}>
          <FaTrash className="text-red-500 cursor-pointer" />
        </button>
      </div>
    );
  },
}
];

