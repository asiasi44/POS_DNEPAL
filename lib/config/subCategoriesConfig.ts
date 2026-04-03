import { CrudConfig } from "../clientSchema/crud/schema";
import SubCategoriesFormView from "@/components/subCategories/SubCategoriesFormView";
import {
  subCategorySchema,
  SubCategoryType,
} from "../clientSchema/subCategory/schema";
import {
  useCreateSubCategory,
  useDeleteSubCategory,
  useGetAllSubCategories,
  useSubCategoriesTable,
  useUpdateSubCategory,
} from "../hooks/useSubCategory";
import { useDeleteCategory } from "../hooks/useCategory";

export const subCategoriesConfig: CrudConfig<SubCategoryType, SubCategoryType> =
  {
    entityName: "Sub Category",
    entityNamePlural: "Sub Categories",
    description: "Add new Categories to the system",
    schema: {
      create: subCategorySchema,
      update: subCategorySchema,
      row: subCategorySchema,
    },
    defaultValues: {
      name: "",
    },
    FormView: SubCategoriesFormView,
    formId: "form-rhf-sub-categories",
    hooks: {
      useTable: useSubCategoriesTable,
      useUpdate: useUpdateSubCategory,
      useDelete: useDeleteSubCategory,
      useCreate: useCreateSubCategory,
      useGetAll: useGetAllSubCategories,
    },
  };
