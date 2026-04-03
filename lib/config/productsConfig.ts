import ProductFormView from "@/components/products/ProductFormView";
import { productSchema, ProductType } from "../clientSchema/product/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
  useProductsTable,
  useCreateProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
} from "../hooks/useProduct";

export const productsConfig: CrudConfig<ProductType, ProductType> = {
  entityName: "Product",
  entityNamePlural: "Products",
  description: "Add new Products",
  schema: {
    create: productSchema,
    update: productSchema,
    row: productSchema,
  },
  defaultValues: {
    name: "",
    sku: "",
    sellingPrice: 0,
    unit: "",
    openingStock: 0,
  },
  FormView: ProductFormView,
  formId: "form-rhf-products",
  hooks: {
    useTable: useProductsTable,
    useUpdate: useUpdateProduct,
    useCreate: useCreateProduct,
    useDelete: useDeleteProduct,
    useGetAll: useGetAllProducts,
  },
};