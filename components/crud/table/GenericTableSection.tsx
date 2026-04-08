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

  return (
    <div className="flex flex-col gap-8 w-full min-w-0">
      <div className="w-full min-w-0 overflow-hidden">
        <GenericTableView table={table} />
      </div>
      <GenericPaginationView table={table} />
    </div>
  );
}
