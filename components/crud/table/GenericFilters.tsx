"use client";

import { Input } from "@/components/ui/input";

export const GenericFilters = ({
	filters,
	filterValues,
	setFilterValues,
}: any) => {
	return (
		<div className="flex gap-4 items-center justify-between">
			{/* LEFT: SEARCH */}
			{filters.search && (
				<Input
					placeholder={filters.search.placeholder || "Search..."}
					value={filterValues.search || ""}
					onChange={(e) =>
						setFilterValues((prev: any) => ({
							...prev,
							search: e.target.value,
						}))
					}
					className="w-[300px]"
				/>
			)}

			{/* RIGHT: DROPDOWNS */}
			<div className="flex gap-3">
				{filters.selects?.map((filter: any) => (
					<select
						key={filter.key}
						value={filterValues[filter.key] || ""}
						onChange={(e) =>
							setFilterValues((prev: any) => ({
								...prev,
								[filter.key]: e.target.value,
							}))
						}
						className="border p-2 rounded-md"
					>
						<option value="">{filter.placeholder}</option>
						{filter.options.map((opt: any) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				))}
			</div>
		</div>
	);
};
