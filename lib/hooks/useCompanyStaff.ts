import { getCompanyStaffColumns } from "../clientSchema/companystaff/columns";
import { CompanyStaffType } from "../clientSchema/companystaff/schema";
import { createCrudHooks, createCrudTableHook } from "./useCrudHooks";

const companyStaffCrud = createCrudHooks<CompanyStaffType>({
  endpoint: "/staff",
  queryKey: "staffs",
});

export const {
  useGetAll: useGetAllCompanyStaffs,
  useCreate: useCreateCompanyStaff,
  useUpdate: useUpdateCompanyStaff,
  useDelete: useDeleteCompanyStaff,
} = companyStaffCrud;

export const useCompanyStaffsTable = createCrudTableHook<CompanyStaffType>({
  useGetAll: useGetAllCompanyStaffs,
  getColumns: getCompanyStaffColumns,
  dataKey: "staffs",
});
