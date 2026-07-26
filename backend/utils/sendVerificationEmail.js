const transporter = require("./sendEmail");

const sendVerificationEmail = async (email, token) => {

    const verificationLink =
        `http://localhost:5173/verify-email/${token}`;

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Verify Your Email",

        html: `
            <h2>Welcome to Notes Free</h2>

            <p>Please verify your email by clicking the button below.</p>

            <a
                href="${verificationLink}"
                style="
                    background:#2563eb;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;
                    display:inline-block;
                "
            >
                Verify Email
            </a>

            <p>If you did not create this account, ignore this email.</p>
        `
    });

};

module.exports = sendVerificationEmail;