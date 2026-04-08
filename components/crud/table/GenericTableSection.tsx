"use client";

import { CrudConfig } from "@/lib/clientSchema/crud/schema";
import { FieldValues } from "react-hook-form";
import GenericTableView from "./GenericTableView";
import GenericPaginationView from "./GenericPaginationView";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function GenericTableSection<TForm extends FieldValues, TRow>({
  config,
  setEditData,
}: {
  config: CrudConfig<TForm, TRow>;
  setEditData: (data: TForm | null) => void;
}) {
  const deleteMutation = config.hooks.useDelete();

  const table = config.hooks.useTable({
    onEdit: (item: TForm) => {
      setEditData(item);
    },
    onDelete: (data: TForm) => {
      deleteMutation.mutate({ id: data.id });
    },
  });

  const [filterValues, setFilterValues] = useState<any>({
    search: "",
  });

  const originalData = table.getRowModel().rows.map((row) => row.original);

  const filteredData = originalData.filter((item: any) => {
    let isValid = true;

    if (filterValues.search && config.filters?.search) {
      const fields = config.filters.search.fields;

      const match = fields.some((field: string) =>
        item[field]
          ?.toString()
          .toLowerCase()
          .includes(filterValues.search.toLowerCase())
      );

      if (!match) isValid = false;
    }

    if (config.filters?.selects) {
      config.filters.selects.forEach((filter: any) => {
        if (filterValues[filter.key]) {
          if (item[filter.key] !== filterValues[filter.key]) {
            isValid = false;
          }
        }
      });
    }

    return isValid;
  });

  table.setOptions((prev) => ({
    ...prev,
    data: filteredData,
  }));

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-8">
      {/* 🔥 FILTER UI */}
      {config.filters && (
        <div className="flex justify-between items-center">
          {/* 🔍 SEARCH */}
          {config.filters.search && (
            <Input
              placeholder={config.filters.search.placeholder || "Search..."}
              value={filterValues.search}
              onChange={(e) =>
                setFilterValues((prev: any) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              className="w-[300px]"
            />
          )}

          {/* 📂 DROPDOWNS */}
          <div className="flex gap-3">
            {config.filters.selects?.map((filter: any) => (
              <select
                key={filter.key}
                value={filterValues[filter.key] || ""}
                onChange={(e) =>
                  setFilterValues((prev: any) => ({
                    ...prev,
                    [filter.key]: e.target.value,
                  }))
                }
                className="border p-2 rounded-md"
              >
                <option value="">{filter.placeholder}</option>
                {filter.options.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}

      <GenericTableView table={table} />

=======
    <div className="flex flex-col gap-8 h-full">
      <div className="flex-1 min-h-0  min-w-0 overflow-hidden">
        <GenericTableView table={table} />
      </div>
>>>>>>> main
      <GenericPaginationView table={table} />
    </div>
  );
}