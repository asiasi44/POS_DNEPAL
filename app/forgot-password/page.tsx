"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		const res = await fetch("/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await res.json();
		setMessage(data.message);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Forgot Password
				</h2>

				<input
					type="email"
					placeholder="Enter your email"
					className="w-full border rounded-lg p-3 mb-4"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					onClick={handleSubmit}
					className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
				>
					Send Reset Link
				</button>

				{message && (
					<p className="text-center text-sm mt-4 text-gray-600">{message}</p>
				)}
			</div>
		</div>
	);
}
