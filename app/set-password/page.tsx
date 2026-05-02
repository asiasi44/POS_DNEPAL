"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async () => {
		if (!password || !confirmPassword) {
			alert("Please fill all fields");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const res = await fetch("/api/set-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token, password }),
		});

		const data = await res.json();

		//Show dialog
		alert(data.message);

		//After OK → redirect to login (removes page)
		if (res.ok) {
			router.push("/login");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Set Password
				</h2>

				<div className="flex flex-col space-y-2 mb-4">
					<label className="text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						placeholder="Enter password"
						className="border rounded-lg p-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="flex flex-col space-y-2 mb-6">
					<label className="text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<input
						type="password"
						placeholder="Confirm password"
						className="border rounded-lg p-2"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<button
					onClick={handleSubmit}
					className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
				>
					Set Password
				</button>
			</div>
		</div>
	);
}
