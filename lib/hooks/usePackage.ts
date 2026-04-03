import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";
import { PackageFormType } from "../clientSchema/package/schema";
import { getPackagesColumns } from "../clientSchema/package/columns";

const packageCrud = createCrudHooks<PackageFormType>({
  endpoint: "package",
  queryKey: "packages",
});

export const {
  useGetAll: useGetAllPackages,
  useCreate: useCreatePackage,
  useUpdate: useUpdatePackage,
  useDelete: useDeletePackage,
} = packageCrud;

export const usePackagesTable = createCrudTableHook<PackageFormType>({
  useGetAll: useGetAllPackages,
  getColumns: getPackagesColumns,
  dataKey: "packages",
});
