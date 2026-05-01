import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export const sendVerificationEmail = async (email: string, token: string) => {
	const link = `${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`;
	// `http://localhost:3000/set-password?token=${token}`;

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Set your account password",
		html: `
            <h2>Welcome!</h2>
            <p>Click below to set your password:</p>
            <a href="${link}">Set Password</a>
            <p>This link expires in 1 hour.</p>
    `,
	});
};
