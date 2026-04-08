import { UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { CompanyStaffType } from "@/lib/clientSchema/companystaff/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export const StaffFormView = ({
  form,
}: {
  form: UseFormReturn<CompanyStaffType>;
}) => {
  return (
    <FieldGroup>
      <Field key={"name"} data-invalid={!!form.formState.errors["name"]}>
        <FieldLabel htmlFor={`company-staff-name`}>Name</FieldLabel>
        <Input {...form.register("name")} value={form.watch("name")} />
        {form.formState.errors["name"] && (
          <FieldError errors={[form.formState.errors["name"]]} />
        )}
      </Field>
      <Field key={"email"} data-invalid={!!form.formState.errors["email"]}>
        <FieldLabel htmlFor={`company-staff-email`}>Email</FieldLabel>
        <Input {...form.register("email")} type="email" />
        {form.formState.errors["email"] && (
          <FieldError errors={[form.formState.errors["email"]]} />
        )}
      </Field>
      <Field
        key={"password"}
        data-invalid={!!form.formState.errors["password"]}
      >
        <FieldLabel htmlFor={`company-staff-password`}>Password</FieldLabel>
        <Input {...form.register("password")} type="password" />
        {form.formState.errors["password"] && (
          <FieldError errors={[form.formState.errors["password"]]} />
        )}
      </Field>
      <Field key={"role"} data-invalid={!!form.formState.errors["role"]}>
        <FieldLabel htmlFor={`company-staff-role`}>Role</FieldLabel>
        <Select
          key={form.watch("role")}
          onValueChange={(value) =>
            form.setValue("role", value as "COMPANY_ADMIN" | "STAFF")
          }
          value={form.watch("role")}
        >
          <SelectTrigger aria-invalid={!!form.formState.errors.role}>
            <SelectValue placeholder="Subscription Package"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="subscription-packageId">
              <SelectItem value={"COMPANY_ADMIN"}>Company Admin</SelectItem>
              <SelectItem value={"STAFF"}>STAFF</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {form.formState.errors["role"] && (
          <FieldError errors={[form.formState.errors["role"]]} />
        )}
      </Field>
      <Field
        key={"isActive"}
        data-invalid={!!form.formState.errors["isActive"]}
      >
        <FieldLabel htmlFor={`company-staff-isActive`}>Role</FieldLabel>
        <Switch
          id="company-staff-isActive"
          onCheckedChange={(checked: boolean) =>
            form.setValue("isActive", checked)
          }
          checked={form.watch("isActive")}
        ></Switch>
        {form.formState.errors["isActive"] && (
          <FieldError errors={[form.formState.errors["isActive"]]} />
        )}
      </Field>
    </FieldGroup>
  );
};
