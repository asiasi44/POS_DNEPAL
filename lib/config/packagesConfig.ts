import PackagesFormView from "@/components/packages/PackageFormView";
import {PackageFormType, packageFormSchema} from "../clientSchema/package/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
	usePackagesTable,
	useCreatePackage,
	useDeletePackage,
	useGetAllPackages,
	useUpdatePackage,
} from "../hooks/usePackage";

export const packagesConfig: CrudConfig<PackageFormType, PackageFormType> = {
	entityName: "Package",
	entityNamePlural: "Packages",
	description: "Manage subscription packages in the system",
	schema: {
		create: packageFormSchema,
		update: packageFormSchema,
		row: packageFormSchema,
	},
	defaultValues: {
		name: "",
		price: 0,
		interval: "MONTHLY",
		maxProducts: 0,
		maxStaff: 0,
		maxWarehouses: 0,
		maxStockAdjust: 0,
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
