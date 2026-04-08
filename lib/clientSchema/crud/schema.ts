import { DefaultValues, FieldValues } from "react-hook-form";
import { ZodType } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Table } from "@tanstack/react-table";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type UpdateInput<T> = {
  id: string;
  data: Partial<T>;
};

export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "date";
};

export type CrudConfig<TForm extends FieldValues, TRow> = {
  entityName: string;
  entityNamePlural: string;
  description: string;
  schema: {
    create: ZodType<TForm, any, any>;
    update: ZodType<TForm, any, any>;
    row: ZodType<TRow, any, any>;
  };
  defaultValues: DefaultValues<TForm>;
  FormView: React.ComponentType<{
    form: UseFormReturn<TForm>;
  }>;
  formId: string;
  hooks: {
    useTable: (args: {
      onEdit: (item: TForm) => void;
      onDelete: (item: TForm) => void;
    }) => Table<TForm>;
    useUpdate: () => UseMutationResult<
      any,
      Error, // error
      { id: string; data: TForm },
      unknown
    >;
    useGetAll: () => UseQueryResult<any, Error>;
    useCreate: () => UseMutationResult<any, Error, {body: TForm}, unknown>;
    useDelete: () => UseMutationResult<any, Error, {id: string}, unknown>;
  };
};
