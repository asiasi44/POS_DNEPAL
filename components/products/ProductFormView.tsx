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
	// 🔥 Fetch data
	const { data: brandData } = useGetAllBrands();
	const { data: categoryData } = useGetAllCategories();

	// ✅ Only active brands (optional)
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
				render={({ field }) => (
					<Field>
						<FieldLabel>SKU</FieldLabel>
						<Input {...field} placeholder="SKU" />
					</Field>
				)}
			/>

			{/* CATEGORY DROPDOWN */}
			<Controller
				name="categoryId"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Category</FieldLabel>
						<select {...field} className="border p-2 rounded-md w-full">
							<option value="">Select Category</option>
							{categories.map((cat: any) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</Field>
				)}
			/>

			{/* BRAND DROPDOWN */}
			<Controller
				name="brandId"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Brand</FieldLabel>
						<select {...field} className="border p-2 rounded-md w-full">
							<option value="">Select Brand</option>
							{brands.map((brand: any) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>
					</Field>
				)}
			/>

			{/* PRICE */}
			<Controller
				name="sellingPrice"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Price</FieldLabel>
						<Input type="number" {...field} />
					</Field>
				)}
			/>

			{/* UNIT */}
			<Controller
				name="unit"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Unit</FieldLabel>
						<Input {...field} placeholder="pcs/kg" />
					</Field>
				)}
			/>

			{/* QUANTITY */}
			<Controller
				name="openingStock"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Qty</FieldLabel>
						<Input type="number" {...field} />
					</Field>
				)}
			/>
		</FieldGroup>
	);
};

export default ProductFormView;
