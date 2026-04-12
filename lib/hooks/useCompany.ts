import { getCompanyColumns } from "../clientSchema/company/columns";
import { CompanyWithAdminTypeForm } from "../clientSchema/company/schema";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const companyCrud = createCrudHooks<CompanyWithAdminTypeForm>({
  endpoint: "company",
  queryKey: "companies",
});

export const {
  useGetAll: useGetAllCompanies,
  useCreate: useCreateCompany,
  useUpdate: useUpdateCompany,
  useDelete: useDeleteCompany,
} = companyCrud;

export const useCompanyTable = createCrudTableHook<CompanyWithAdminTypeForm>({
  useGetAll: useGetAllCompanies,
  getColumns: getCompanyColumns,
  dataKey: "companies",
});
