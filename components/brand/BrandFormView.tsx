import { BrandType } from "@/lib/clientSchema/brand/schema";
import { UseFormReturn, Controller } from "react-hook-form";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const BrandFormView = ({ form }: { form: UseFormReturn<BrandType> }) => {
	return (
		<FieldGroup>
			<Controller
				name="name"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Brand Name</FieldLabel>
						<Input {...field} placeholder="Enter brand name" />
					</Field>
				)}
			/>

			<Controller
				name="status"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Status</FieldLabel>

						<select
							value={field.value ? "true" : "false"}
							onChange={(e) => field.onChange(e.target.value === "true")}
						>
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</Field>
				)}
			/>
		</FieldGroup>
	);
};

export default BrandFormView;