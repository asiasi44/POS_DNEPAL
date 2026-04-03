import { ProductFormType } from "../clientSchema/product/schema";
import { getProductsColumns } from "../clientSchema/product/columns";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const productCrud = createCrudHooks<ProductFormType>({
  endpoint: "product",
  queryKey: "products",
});

export const {
  useGetAll: useGetAllProducts,
  useCreate: useCreateProduct,
  useUpdate: useUpdateProduct,
  useDelete: useDeleteProduct,
} = productCrud;

export const useProductsTable = createCrudTableHook<ProductFormType>({
  useGetAll: useGetAllProducts,
  getColumns: getProductsColumns,
  dataKey: "products",
});