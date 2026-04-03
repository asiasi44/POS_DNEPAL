import { CategoryType } from "@/lib/clientSchema/category/schema";
import { UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const CategoriesFormView = ({
  form, 
}: {
  form: UseFormReturn<CategoryType>;
}) => {
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-categories-name">
              Category Name
            </FieldLabel>
            <Input
              {...field}
              id="form-rhf-categories-name"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Category Name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default CategoriesFormView;
