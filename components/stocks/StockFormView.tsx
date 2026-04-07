import { UseFormReturn, Controller } from "react-hook-form";
import { StockType } from "@/lib/clientSchema/stock/schema";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

const StockFormView = ({ form }: { form: UseFormReturn<StockType> }) => {
	return (
		<FieldGroup>
			<Controller
				name="productId"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Product ID</FieldLabel>
						<Input {...field} />
					</Field>
				)}
			/>

			<Controller
				name="quantity"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Quantity</FieldLabel>
						<Input type="number" {...field} />
					</Field>
				)}
			/>

			<Controller
				name="action"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Type</FieldLabel>
						<select {...field}>
							<option value="STOCK_IN">Stock In</option>
							<option value="STOCK_OUT">Stock Out</option>
							<option value="ADJUSTMENT">Adjustment</option>
						</select>
					</Field>
				)}
			/>

			<Controller
				name="warehouse"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Warehouse</FieldLabel>
						<Input {...field} />
					</Field>
				)}
			/>

			<Controller
				name="source"
				control={form.control}
				render={({ field }) => (
					<Field>
						<FieldLabel>Source</FieldLabel>
						<Input {...field} placeholder="Invoice / PO / Manual" />
					</Field>
				)}
			/>
		</FieldGroup>
	);
};

export default StockFormView;
