import { ProductType } from "../clientSchema/product/schema";
import { getProductsColumns } from "../clientSchema/product/columns";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const productCrud = createCrudHooks<ProductType>({
  endpoint: "product",
  queryKey: "products",
});

export const {
  useGetAll: useGetAllProducts,
  useCreate: useCreateProduct,
  useUpdate: useUpdateProduct,
  useDelete: useDeleteProduct,
} = productCrud;

export const useProductsTable = createCrudTableHook<ProductType>({
  useGetAll: useGetAllProducts,
  getColumns: getProductsColumns,
  dataKey: "products",
});