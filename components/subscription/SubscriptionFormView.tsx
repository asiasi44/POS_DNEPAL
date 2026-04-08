import { UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { SubscriptionFormType } from "@/lib/clientSchema/subscription/schema";
import { FieldConfig } from "@/lib/clientSchema/crud/schema";
import { useGetAllCompanies } from "@/lib/hooks/useCompany";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CompanyWithAdminTypeForm } from "@/lib/clientSchema/company/schema";
import { useGetAllPackages } from "@/lib/hooks/usePackage";
import { PackageFormType } from "@/lib/clientSchema/package/schema";

const fields: FieldConfig<SubscriptionFormType>[] = [
  { name: "companyId", label: "Select Company" },
  { name: "packageId", label: "Select Package" },
  { name: "startDate", label: "Start Date", type: "date" },
];

export const SubscriptionFormView = ({
  form,
}: {
  form: UseFormReturn<SubscriptionFormType>;
}) => {
  const { data: companiesData } = useGetAllCompanies();
  const { data: pacakgesData } = useGetAllPackages();
  return (
    <FieldGroup>
      <Field
        key={"companyId"}
        data-invalid={!!form.formState.errors["companyId"]}
      >
        <FieldLabel htmlFor={`subscription-companyId`}>
          Select Company
        </FieldLabel>
        <Select
          onValueChange={(value) => form.setValue("companyId", value)}
          value={form.watch("companyId") ?? ""}
        >
          <SelectTrigger aria-invalid={!!form.formState.errors.companyId}>
            <SelectValue placeholder="Select Company"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="subscription-companyId">
              {(companiesData?.companies || []).map(
                (eachCompany: CompanyWithAdminTypeForm, index: number) => {
                  return (
                    <SelectItem
                      value={eachCompany.id || ""}
                      key={`${eachCompany.id}-${index}`}
                    >
                      {eachCompany.name}
                    </SelectItem>
                  );
                },
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {form.formState.errors["companyId"] && (
          <FieldError errors={[form.formState.errors["companyId"]]} />
        )}
      </Field>
      <Field
        key={"packageId"}
        data-invalid={!!form.formState.errors["packageId"]}
      >
        <FieldLabel htmlFor={`subscription-packageId`}>
          Select Package
        </FieldLabel>
        <Select
          onValueChange={(value) => form.setValue("packageId", value)}
          value={form.watch("packageId") ?? ""}
        >
          <SelectTrigger aria-invalid={!!form.formState.errors.packageId}>
            <SelectValue placeholder="Subscription Package"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="subscription-packageId">
              {(pacakgesData?.packages || []).map(
                (eachPackage: PackageFormType, index: number) => {
                  return (
                    <SelectItem
                      value={eachPackage.id || ""}
                      key={`${eachPackage.id}-${index}`}
                    >
                      {eachPackage.name} - {eachPackage.interval}
                    </SelectItem>
                  );
                },
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {form.formState.errors["packageId"] && (
          <FieldError errors={[form.formState.errors["packageId"]]} />
        )}
      </Field>
      <Field
        key={"startDate"}
        data-invalid={!!form.formState.errors["startDate"]}
      >
        <FieldLabel htmlFor={`subscription-startDate`}>Start Date</FieldLabel>
        <Input {...form.register("startDate")} type="date" />
        {form.formState.errors["startDate"] && (
          <FieldError errors={[form.formState.errors["startDate"]]} />
        )}
      </Field>
    </FieldGroup>
  );
};
