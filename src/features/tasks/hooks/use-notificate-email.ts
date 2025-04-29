import { EMAIL_PASS, EMAIL_USER } from "@/config";
import { createAdminClient } from "@/lib/appwrite";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Замість 465
  secure: false, // важливо! 465 = secure: true, 587 = secure: false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailProps {
  userId: string;
  subject: string;
  text: string;
}

export const useNotificateEmail = async ({ userId, subject, text}: EmailProps) => {
  // const { users } = await createAdminClient();
  // const user = await users.get(userId);
  // const email = user.email;

  try {
    console.log("Sending email to user...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    return { error };
  }
};