import { CrudConfig } from "../clientSchema/crud/schema";
import {
  companyWithAdminFormSchema,
  CompanyWithAdminTypeForm,
} from "../clientSchema/company/schema";
import CompanyFormView from "@/components/company/CompanyFormView";
import {
  useCompanyTable,
  useCreateCompany,
  useDeleteCompany,
  useGetAllCompanies,
  useUpdateCompany,
} from "../hooks/useCompany";

export const companyConfig: CrudConfig<CompanyWithAdminTypeForm, CompanyWithAdminTypeForm> = {
  entityName: "Company",
  entityNamePlural: "Companies",
  description: "Add new Companies to the system",
  schema: {
    create: companyWithAdminFormSchema,
    update: companyWithAdminFormSchema,
    row: companyWithAdminFormSchema,
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
