import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailTest() {
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "nicolasandreose@gmail.com",
        subject: "Hello from Resend",
        text: "Hello from Resend",
    })

    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log("Email sent successfully:", data);
    }
}

sendEmailTest();