import { CrudConfig } from "../clientSchema/crud/schema";
import {
  packageFormSchema,
  PackageFormType,
} from "../clientSchema/package/schema";
import PackageFormView from "@/components/package/PackageFormView";
import {
  useCreatePackage,
  useDeletePackage,
  useGetAllPackages,
  usePackagesTable,
  useUpdatePackage,
} from "../hooks/usePackage";

export const packageConfig: CrudConfig<PackageFormType, PackageFormType> = {
  entityName: "Package",
  entityNamePlural: "Packages",
  description: "Add new subscription packages to the system",
  schema: {
    create: packageFormSchema,
    update: packageFormSchema,
    row: packageFormSchema,
  },
  defaultValues: {
    name: "",
    price: 0,
    interval: "MONTHLY",
    maxProducts: 1,
    maxStaff: 1,
    maxWarehouses: 0,
    maxStockAdjust: 0,
    enableReports: true,
    enableAdvanced: false,
  },
  FormView: PackageFormView,
  formId: "form-rhf-package",
  hooks: {
    useTable: usePackagesTable,
    useUpdate: useUpdatePackage,
    useDelete: useDeletePackage,
    useGetAll: useGetAllPackages,
    useCreate: useCreatePackage,
  },
};
