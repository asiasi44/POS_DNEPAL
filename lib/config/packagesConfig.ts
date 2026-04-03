import PackagesFormView from "@/components/packages/PackageFormView";
import { packageSchema, PackageType } from "../clientSchema/package/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
	usePackagesTable,
	useCreatePackage,
	useDeletePackage,
	useGetAllPackages,
	useUpdatePackage,
} from "../hooks/usePackage";

export const packagesConfig: CrudConfig<PackageType, PackageType> = {
	entityName: "Package",
	entityNamePlural: "Packages",
	description: "Manage subscription packages in the system",
	schema: {
		create: packageSchema,
		update: packageSchema,
		row: packageSchema,
	},
	defaultValues: {
		name: "",
		price: 0,
		interval: "MONTHLY",
		maxProducts: 0,
		maxStaff: 0,
		maxWarehouses: null,
		maxStockAdjust: null,
		enableReports: true,
		enableAdvanced: false,
	},
	FormView: PackagesFormView,
	formId: "form-rhf-packages",
	hooks: {
		useTable: usePackagesTable,
		useUpdate: useUpdatePackage,
		useCreate: useCreatePackage,
		useDelete: useDeletePackage,
		useGetAll: useGetAllPackages,
	},
};
