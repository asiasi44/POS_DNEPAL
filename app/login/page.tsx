//@ts-nocheck
"use client";
import { useLogin } from "@/lib/hooks/useLogin";
import axios from "axios";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginMutation = useLogin();

	const handleLogin = async (event) => {
		event.preventDefault();
		loginMutation.mutate({ email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center">Login </h2>

				<form className="space-y-5" onSubmit={handleLogin}>
					<div className="flex flex-col space-y-2">
						<label className="text-sm font-medium text-gray-700"> Email</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							required
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<div className="flex flex-col space-y-2">
						<label className="text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							required
							onChange={(event) => setPassword(event.target.value)}
						/>
						<div className="text-right">
							<a
								href="/forgot-password"
								className="text-sm text-blue-600 hover:underline"
							>
								Forgot Password?
							</a>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
						disabled={loginMutation.isPending}
					>
						{loginMutation.isPending ? "Logging in... " : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}
