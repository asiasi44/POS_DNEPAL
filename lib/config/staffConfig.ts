import { StaffFormView } from "@/components/staff/StaffFormView";
import {
  companyStaffSchema,
  CompanyStaffType,
} from "../clientSchema/companystaff/schema";
import { CrudConfig } from "../clientSchema/crud/schema";
import {
  useCompanyStaffsTable,
  useCreateCompanyStaff,
  useDeleteCompanyStaff,
  useGetAllCompanyStaffs,
  useUpdateCompanyStaff,
} from "../hooks/useCompanyStaff";

export const staffConfig: CrudConfig<CompanyStaffType, CompanyStaffType> = {
  entityName: "Staff",
  entityNamePlural: "Staffs",
  description: "Add New Staff to Company",
  schema: {
    create: companyStaffSchema,
    update: companyStaffSchema,
    row: companyStaffSchema,
  },
  defaultValues: {
    name: "",
    isActive: true,
  },
  FormView: StaffFormView,
  formId: "form-rhf-staffs",
  hooks: {
    useTable: useCompanyStaffsTable,
    useCreate: useCreateCompanyStaff,
    useDelete: useDeleteCompanyStaff,
    useGetAll: useGetAllCompanyStaffs,
    useUpdate: useUpdateCompanyStaff,
  },
};
