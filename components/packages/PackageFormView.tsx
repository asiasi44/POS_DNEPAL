import { PackageType } from "@/lib/clientSchema/package/schema";
import { UseFormReturn } from "react-hook-form";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const PackagesFormView = ({ form }: { form: UseFormReturn<PackageType> }) => {
	return (
		<FieldGroup>
			<Controller
				name="name"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor="form-rhf-packages-name">
							Package Name
						</FieldLabel>
						<Input
							{...field}
							id="form-rhf-packages-name"
							aria-invalid={fieldState.invalid}
							placeholder="Enter Package Name"
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
						<FieldLabel htmlFor="form-rhf-packages-price">Price</FieldLabel>
						<Input
							{...field}
							id="form-rhf-packages-price"
							type="number"
							step="0.01"
							aria-invalid={fieldState.invalid}
							placeholder="0.00"
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
						<FieldLabel htmlFor="form-rhf-packages-interval">
							Interval
						</FieldLabel>
						<Input
							{...field}
							id="form-rhf-packages-interval"
							aria-invalid={fieldState.invalid}
							placeholder="MONTHLY or YEARLY"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="maxProducts"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor="form-rhf-packages-maxProducts">
							Max Products
						</FieldLabel>
						<Input
							{...field}
							id="form-rhf-packages-maxProducts"
							type="number"
							aria-invalid={fieldState.invalid}
							placeholder="0"
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
						<FieldLabel htmlFor="form-rhf-packages-maxStaff">
							Max Staff
						</FieldLabel>
						<Input
							{...field}
							id="form-rhf-packages-maxStaff"
							type="number"
							aria-invalid={fieldState.invalid}
							placeholder="0"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</FieldGroup>
	);
};

export default PackagesFormView;
