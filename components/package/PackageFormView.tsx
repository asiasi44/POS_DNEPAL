import { PackageFormType } from "@/lib/clientSchema/package/schema";
import { UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const PackageFormView = ({
  form,
}: {
  form: UseFormReturn<PackageFormType>;
}) => {
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-package-name">
              Package Name
            </FieldLabel>
            <Input
              {...field}
              id="form-rhf-package-name"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Package Name (e.g., Starter, Professional)"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-package-price">Price (Rs)</FieldLabel>
            <Input
              {...field}
              id="form-rhf-package-price"
              type="number"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Price"
              autoComplete="off"
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="interval"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-package-interval">
              Billing Interval
            </FieldLabel>
            <select
              {...field}
              id="form-rhf-package-interval"
              aria-invalid={fieldState.invalid}
              className="border p-2 rounded"
            >
              <option value="">Select Interval</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex gap-4 items-center">
        <Controller
          name="maxProducts"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-package-maxproducts">
                Max Products
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-package-maxproducts"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Maximum number of products"
                autoComplete="off"
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="maxStaff"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-package-maxstaff">
                Max Staff
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-package-maxstaff"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Maximum number of staff"
                autoComplete="off"
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Controller
          name="maxWarehouses"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-package-maxwarehouses">
                Max Warehouses (Optional)
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-package-maxwarehouses"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Maximum number of warehouses"
                autoComplete="off"
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="maxStockAdjust"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-package-maxstockadjust">
                Max Stock Adjustments (Optional)
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-package-maxstockadjust"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Maximum number of stock adjustments"
                autoComplete="off"
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Controller
          name="enableReports"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-2">
                <FieldLabel htmlFor="form-rhf-package-enable-reports">
                  Enable Reports
                </FieldLabel>
                <Switch
                  id="form-rhf-package-enable-reports"
                  onCheckedChange={(checked) => field.onChange(checked)}
                  checked={field.value}
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="enableAdvanced"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-2">
                <FieldLabel htmlFor="form-rhf-package-enable-advanced">
                  Enable Advanced
                </FieldLabel>
                <Switch
                  id="form-rhf-package-enable-advanced"
                  onCheckedChange={(checked) => field.onChange(checked)}
                  checked={field.value}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
};

export default PackageFormView;
