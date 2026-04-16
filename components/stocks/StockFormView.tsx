import { UseFormReturn, Controller } from "react-hook-form";
import { StockType } from "@/lib/clientSchema/stock/schema";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { useGetAllProducts } from "@/lib/hooks/useProduct";
import { ProductFormType } from "@/lib/clientSchema/product/schema";

const StockFormView = ({ form }: { form: UseFormReturn<StockType> }) => {
  const { data: productData } = useGetAllProducts();
  const products = productData?.products || [];
  return (
    <FieldGroup>
      <Controller
        name="productId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Product</FieldLabel>
            <select
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Product</option>
              {products.map((product: ProductFormType) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </select>
          </Field>
        )}
      />

      <Controller
        name="quantity"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Quantity</FieldLabel>
            <Input
              type="number"
              {...field}
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="action"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Type</FieldLabel>
            <select {...field}>
              <option value="STOCK_IN">Stock In</option>
              <option value="STOCK_OUT">Stock Out</option>
              <option value="ADJUSTMENT">Adjustment</option>
              <option value="RETURN">Return</option>
              <option value="DAMAGE">DAMAGE</option>
              <option value="INITIAL">INITIAL</option>
            </select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="reason"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Reason (optional)</FieldLabel>
            <Input type="text" {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default StockFormView;
