//@ts-nocheck
"use client";
import { useAddCompany, useUpdateCompany } from "@/lib/hooks/useCompany";
import { useGetPackages } from "@/lib/hooks/usePackage";
import axios from "axios";
import { useEffect, useState } from "react";

const AddCompanyPopup = ({ setAddCompanyPopup, setIsEdit, isEdit }) => {
	const [companyData, setCompanyData] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
		pan: "",
		password: "",
		packageId: "",
		packageName: "",
		packageType: "",
	});
	const addCompanyMutation = useAddCompany();
	const updateCompanyMutation = useUpdateCompany();

	useEffect(() => {
		if (isEdit !== null) {
			console.log("hello not null", isEdit);
			setCompanyData({
				name: isEdit.name || "",
				address: isEdit.address || "",
				phone: isEdit.phone || "",
				pan: isEdit.pan || "",

				// admin user (first one)
				email: isEdit.users?.[0]?.email || "",
				password: "",

				// subscription info (for UI)
				packageName: isEdit.currentSubscription?.package?.name || "",
				packageType: isEdit.currentSubscription?.package?.type || "",
				packageId: isEdit.currentSubscription?.package?.id || "",
			});
		}
	}, [isEdit]);
	const {
		data: packageData,
		isLoading: isPackageDataLoading,
		isError: isPackageDataError,
	} = useGetPackages();

	const addDataToCompanyData = (e) => {
		const { name, value } = e.target;
		setCompanyData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCompanySubmit = async (event) => {
		event.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(companyData.email)) {
			alert("Enter a valid email address");
			return;
		}

		const { name, address, phone, email, password, pan, packageId } =
			companyData;

		if (
			!name ||
			!address ||
			!phone ||
			!email ||
			!pan ||
			(!isEdit && (!password || !packageId))
		) {
			alert("All fields are required");
			return;
		}

		const body = { ...companyData };

		if (!body.password) {
			delete body.password;
		}

		if (isEdit !== null) {
			updateCompanyMutation.mutate({ id: isEdit.id, body });
		} else {
			addCompanyMutation.mutate(body);
		}
	};

	if (packageData) {
		console.log(packageData);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black opacity-50"
				onClick={() => {
					setAddCompanyPopup(false);
					setIsEdit(null);
				}}
			></div>

			<div className="relative bg-gray-100 z-50 p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl text-center font-bold mb-4">Add New Company</h2>
				<form>
					<h2 className="text-lg font-semibold underline mb-4">Company info</h2>

					<div className="flex gap-4">
						<div>
							<div className="mb-2">Company Name</div>
							<input
								type="text"
								value={companyData.name}
								name="name"
								placeholder="Company Name"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData} required
							/>
						</div>
						<div>
							<div className="mb-2">Company Address</div>
							<input
								type="text"
								name="address"
								value={companyData.address}
								placeholder="Company Address"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData} required
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div>
							<div className="mb-2">Phone</div>
							<input
								type="tel"
								name="phone"
								value={companyData.phone}
								placeholder="Phone Number"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData} required
							/>
						</div>
						<div>
							<div className="mb-2">Pan</div>
							<input
								type="text"
								name="pan"
								value={companyData.pan}
								placeholder="Pan Number"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData} required
							/>
						</div>
					</div>
					<h2 className="text-lg font-semibold underline mb-4">Admin info</h2>

					<div className="flex gap-4">
						<div>
							<div className="mb-2">Email Address</div>
							<input
								type="email"
								value={companyData.email}
								name="email"
								placeholder="Email Address"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData}
								required
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
							/>
						</div>
						<div>
							<div className="mb-2">Password</div>
							<input
								type="password"
								name="password"
								value={companyData.password}
								placeholder="Enter Password"
								className="border p-2 rounded w-full mb-4"
								onChange={addDataToCompanyData} required
							/>
							<div className="text-xs text-gray-500 mb-2">
								Leave blank to keep existing password
							</div>
						</div>
					</div>
					{isEdit ? (
						""
					) : (
						<>
							<h2 className="text-lg font-semibold underline mb-4">
								Subscription
							</h2>
							<div className="flex gap-4">
								<div>
									<div className="mb-2">Package</div>
									<select
										name="packageId"
										className="border p-2 rounded w-full mb-4"
										onChange={addDataToCompanyData}
										value={companyData.packageId}
									>
										<option value={""} disabled>
											---SELECT PACKAGE---
										</option>
										{isPackageDataLoading
											? "loading..."
											: packageData.map((eachPackage) => {
													console.log(eachPackage);
													return (
														<option value={eachPackage.id} key={eachPackage.id}>
															{eachPackage.name} + {eachPackage.type}
														</option>
													);
												})}
									</select>
								</div>
							</div>
						</>
					)}

					<button
						className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
						onClick={handleCompanySubmit}
					>
						{isEdit !== null ? "Edit Company Details" : "Add Company Details"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddCompanyPopup;
