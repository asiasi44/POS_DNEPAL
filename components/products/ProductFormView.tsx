import { UseFormReturn, Controller } from "react-hook-form";
import { ProductFormType } from "@/lib/clientSchema/product/schema";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldLabel,
	FieldError,
	FieldGroup,
} from "@/components/ui/field";

const ProductFormView = ({ form }: { form: UseFormReturn<ProductFormType> }) => {
	return (
		<FieldGroup>
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
