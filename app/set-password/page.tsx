"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		if (!password || !confirmPassword) {
			setMessage("Please fill all fields");
			return;
		}

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
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
		setMessage(data.message);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Set Password
				</h2>

				{/* Password */}
				<input
					type="password"
					placeholder="Enter password"
					className="w-full border rounded-lg p-3 mb-4"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{/* Confirm Password */}
				<input
					type="password"
					placeholder="Confirm password"
					className="w-full border rounded-lg p-3 mb-6"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				{/* Button */}
				<button
					onClick={handleSubmit}
					className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
				>
					Set Password
				</button>

				{/* Message */}
				{message && (
					<p className="text-center text-sm mt-4 text-gray-600">{message}</p>
				)}
			</div>
		</div>
	);
}
