import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { getColumnsWithActions } from "../clientSchema/crud/columns";
import { useMemo } from "react";
import { toast } from "react-toastify";

export function createCrudHooks<TForm extends { id?: string }>({
  endpoint,
  queryKey,
}: {
  endpoint: string;
  queryKey: string;
}) {
  const baseUrl = `/api/${endpoint}`;

  const useGetAll = () => {
    return useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        try {
          const response = await axios.get(baseUrl);
          return response.data;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Some error occured");
          throw error;
        }
      },
      retry: 1,
    });
  };
  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { body: TForm }>({
      mutationFn: async ({ body }: { body: TForm }) => {
        const response = await axios.post(baseUrl, body);
        return response.data;
      },
      onSuccess: (response) => {
        toast.success(response.data?.message || "some error occurred");

        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Some error occured");
      },
    });
  };
  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: TForm }) => {
        const response = await axios.patch(`${baseUrl}/${id}`, data);
        return response.data;
      },
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { id: string }>({
      mutationFn: async ({ id }: { id: string }) => {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
      },
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return {
    useGetAll,
    useCreate,
    useUpdate,
    useDelete,
  };
}

export function createCrudTableHook<TRow>({
  useGetAll,
  getColumns,
  dataKey,
}: {
  useGetAll: () => { data: any; isLoading: boolean; error: any };
  getColumns: () => ColumnDef<TRow>[];
  dataKey?: string;
}) {
  return function useCrudTable({
    onEdit,
    onDelete,
  }: {
    onEdit: (item: TRow) => void;
    onDelete: (item: TRow) => void;
  }) {
    const { data: response, isLoading, error } = useGetAll();

    // Extract data using dataKey if provided, otherwise use response directly
    const data = useMemo(() => {
      if (!response) return [];

      const targetData = dataKey ? response[dataKey] : response;
      return Array.isArray(targetData) ? targetData : [];
    }, [response, dataKey]);

    const columns = useMemo(
      () =>
        getColumnsWithActions(getColumns(), {
          onEdit,
          onDelete,
        }),
      [onEdit, onDelete],
    );

    return useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  };
}
