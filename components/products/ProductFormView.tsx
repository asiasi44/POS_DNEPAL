"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { ProductFormType } from "@/lib/clientSchema/product/schema";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { useGetAllBrands } from "@/lib/hooks/useBrand";
import { useGetAllCategories } from "@/lib/hooks/useCategory";

const ProductFormView = ({
  form,
}: {
  form: UseFormReturn<ProductFormType>;
}) => {
  const { data: brandData } = useGetAllBrands();
  const { data: categoryData } = useGetAllCategories();

  const brands = brandData?.brands?.filter((b: any) => b.status) || [];
  const categories = categoryData?.categories || [];

  return (
    <FieldGroup>
      {/* PRODUCT NAME */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Product Name</FieldLabel>
            <Input {...field} placeholder="Enter name" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* SKU */}
      <Controller
        name="sku"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>SKU</FieldLabel>
            <Input {...field} placeholder="SKU" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Image URL</FieldLabel>
            <Input {...field} placeholder="Image Url" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* CATEGORY DROPDOWN */}
      <Controller
        name="categoryId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <select
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* BRAND DROPDOWN */}
      <Controller
        name="brandId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Brand</FieldLabel>
            <select
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Brand</option>
              {brands.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* PRICE */}
      <Controller
        name="costPrice"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Cost Price</FieldLabel>
            <Input
              type="number"
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

      {/* PRICE */}
      <Controller
        name="sellingPrice"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Selling Price</FieldLabel>
            <Input
              type="number"
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

      {/* UNIT */}
      <Controller
        name="unit"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Unit</FieldLabel>
            <select
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Unit</option>
              <option value={"KG"}>KG</option>
              <option value={"LITER"}>LITER</option>
              <option value={"METER"}>METER</option>
              <option value={"PIECE"}>PIECE</option>
            </select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* QUANTITY */}
      <Controller
        name="currentStock"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Current Stock</FieldLabel>
            <Input
              type="number"
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
        name="minStock"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Minimum Stock (for Alert)</FieldLabel>
            <Input
              type="number"
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
        name="expiryDate"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Expiry Date</FieldLabel>
            <Input
              type="date"
              value={field.value ? field.value : ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default ProductFormView;
