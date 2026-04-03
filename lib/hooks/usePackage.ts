import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";
import { PackageType } from "../clientSchema/package/schema";
import { getPackagesColumns } from "../clientSchema/package/columns";

const packageCrud = createCrudHooks<PackageType>({
  endpoint: "package",
  queryKey: "packages",
});

export const {
  useGetAll: useGetAllPackages,
  useCreate: useCreatePackage,
  useUpdate: useUpdatePackage,
  useDelete: useDeletePackage,
} = packageCrud;

export const usePackagesTable = createCrudTableHook<PackageType>({
  useGetAll: useGetAllPackages,
  getColumns: getPackagesColumns,
  dataKey: "packages",
});
