"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const res = await fetch("/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await res.json();

		alert(data.message);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Forgot Password
				</h2>

				<form className="space-y-5" onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-2">
						<label className="text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							placeholder="Enter your email"
							required
							className="border rounded-lg p-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
					>
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
}
