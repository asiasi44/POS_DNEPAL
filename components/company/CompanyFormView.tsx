import { CompanyWithAdminTypeForm } from "@/lib/clientSchema/company/schema";
import { UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FieldConfig = {
  name: keyof CompanyWithAdminTypeForm;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
};

const fields: FieldConfig[] = [
  { name: "name", label: "Company Name" },
  { name: "address", label: "Company Address" },
  { name: "logoUrl", label: "Company Logo Url" },
  { name: "phone", label: "Phone No." },
  { name: "pan", label: "PAN" },
  { name: "currency", label: "Currency", placeholder: "NPR" },
  { name: "rounding", label: "Rounding", type: "number" },
];

const adminFields: FieldConfig[] = [
  { name: "adminName", label: "Admin Name" },
  { name: "adminEmail", label: "Admin Email", type: "email" },
  { name: "adminPassword", label: "Admin Password", type: "password" },
];

const CompanyFormView = ({
  form,
}: {
  form: UseFormReturn<CompanyWithAdminTypeForm>;
}) => {
  return (
    <div className="flex gap-4 h-full">
      <FieldGroup>
        <div className="text-blue-800 font-bold text-xl">Company</div>

        {fields.map((item) => {
          const error = form.formState.errors[item.name];

          return (
            <Field key={item.name} data-invalid={!!error}>
              <FieldLabel htmlFor={`company-${item.name}`}>
                {item.label}
              </FieldLabel>

              <Input
                id={`company-${item.name}`}
                type={item.type ?? "text"}
                placeholder={item.placeholder}
                autoComplete="off"
                aria-invalid={!!error}
                {...form.register(item.name, {
                  valueAsNumber: item.type === "number",
                })}
              />

              {error && <FieldError errors={[error]} />}
            </Field>
          );
        })}
      </FieldGroup>

      <div className="w-1 h-full bg-black" />

      <FieldGroup>
        <div className="text-blue-800 font-bold text-xl">Admin</div>

        {adminFields.map((item) => {
          const error = form.formState.errors[item.name];

          return (
            <Field key={item.name} data-invalid={!!error}>
              <FieldLabel htmlFor={`admin-${item.name}`}>
                {item.label}
              </FieldLabel>

              <Input
                id={`admin-${item.name}`}
                type={item.type ?? "text"}
                placeholder={item.placeholder}
                autoComplete="off"
                aria-invalid={!!error}
                {...form.register(item.name, {
                  valueAsNumber: item.type === "number",
                })}
              />

              {error && <FieldError errors={[error]} />}
            </Field>
          );
        })}
      </FieldGroup>
    </div>
  );
};

export default CompanyFormView;
