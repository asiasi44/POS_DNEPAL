import { CrudConfig } from "../clientSchema/crud/schema";
import ProductFormView from "@/components/products/ProductFormView";
import { useCreateProduct, useDeleteProduct, useGetAllProducts, useProductsTable, useUpdateProduct } from "../hooks/useProduct";
import {
	productFormSchema,
	ProductFormType,
} from "../clientSchema/product/schema";

export const productConfig: CrudConfig<ProductFormType, ProductFormType> =
  {
    entityName: "Product",
    entityNamePlural: "Products",
    description: "Add new Product to the system",
    schema: {
      create: productFormSchema,
      update: productFormSchema,
      row: productFormSchema,
    },
    defaultValues: {
      name: "",
    },
    FormView: ProductFormView,
    formId: "form-rhf-product",
    hooks: {
      useTable: useProductsTable,
      useUpdate: useUpdateProduct,
      useGetAll: useGetAllProducts,
      useCreate: useCreateProduct,
      useDelete: useDeleteProduct
    },
  };
