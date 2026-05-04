import ProductFormView from "@/components/products/ProductFormView";
import {
  productFormSchema,
  ProductFormType,
} from "../clientSchema/product/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
  useProductsTable,
  useCreateProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
} from "../hooks/useProduct";

export const productsConfig: CrudConfig<ProductFormType, ProductFormType> = {
  entityName: "Product",
  entityNamePlural: "Products",
  description: "Add new Products",
  schema: {
    create: productFormSchema,
    update: productFormSchema,
    row: productFormSchema,
  },
  defaultValues: {
    name: "",
    sku: "",
    unit: "PIECE",
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
