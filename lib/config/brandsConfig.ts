import BrandFormView from "@/components/brand/BrandFormView";
import { brandSchema, BrandType } from "../clientSchema/brand/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
	useBrandTable,
	useCreateBrand,
	useDeleteBrand,
	useGetAllBrands,
	useUpdateBrand,
} from "../hooks/useBrand";

export const brandsConfig: CrudConfig<BrandType, BrandType> = {
	entityName: "Brand",
	entityNamePlural: "Brands",
	description: "Manage brands",
	schema: {
		create: brandSchema,
		update: brandSchema,
		row: brandSchema,
	},
	defaultValues: {
		name: "",
		status: true,
	},
	FormView: BrandFormView,
	formId: "form-rhf-brands",
	hooks: {
		useTable: useBrandTable,
		useCreate: useCreateBrand,
		useUpdate: useUpdateBrand,
		useDelete: useDeleteBrand,
		useGetAll: useGetAllBrands,
	},

	filters: {
		search: {
			placeholder: "Search brand...",
			fields: ["name"],
		},
		selects: [
			{
				key: "status",
				placeholder: "Filter by Status",
				options: [
					{ label: "Active", value: "true" },
					{ label: "Inactive", value: "false" },
				],
			},
		],
	},
};
