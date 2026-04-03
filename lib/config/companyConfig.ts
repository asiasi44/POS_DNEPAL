import { CrudConfig } from "../clientSchema/crud/schema";
import {
  companyFormSchema,
  CompanyTypeForm,
} from "../clientSchema/company/schema";
import CompanyFormView from "@/components/company/CompanyFormView";
import {
  useCompanyTable,
  useCreateCompany,
  useDeleteCompany,
  useGetAllCompanies,
  useUpdateCompany,
} from "../hooks/useCompany";

export const companyConfig: CrudConfig<CompanyTypeForm, CompanyTypeForm> = {
  entityName: "Company",
  entityNamePlural: "Companies",
  description: "Add new Companies to the system",
  schema: {
    create: companyFormSchema,
    update: companyFormSchema,
    row: companyFormSchema,
  },
  defaultValues: {
    name: "",
  },
  FormView: CompanyFormView,
  formId: "form-rhf-categories",
  hooks: {
    useTable: useCompanyTable,
    useUpdate: useUpdateCompany,
    useGetAll: useGetAllCompanies,
    useCreate: useCreateCompany,
    useDelete: useDeleteCompany,
  },
};
