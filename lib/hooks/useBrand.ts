import { BrandType } from "../clientSchema/brand/schema";
import { getBrandColumns } from "../clientSchema/brand/columns";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const brandCrud = createCrudHooks<BrandType>({
	endpoint: "brand",
	queryKey: "brands",
});

export const {
	useGetAll: useGetAllBrands,
	useCreate: useCreateBrand,
	useUpdate: useUpdateBrand,
	useDelete: useDeleteBrand,
} = brandCrud;

export const useBrandTable = createCrudTableHook<BrandType>({
	useGetAll: useGetAllBrands,
	getColumns: getBrandColumns,
	dataKey: "brands",
});
