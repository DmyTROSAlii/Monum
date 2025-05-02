import { EMAIL_PASS, EMAIL_USER } from "@/config";
import { createAdminClient } from "@/lib/appwrite";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

interface EmailProps {
  userId: string;
  subject: string;
  text: string;
}

export const useNotificateEmail = async ({
  userId,
  subject,
  text,
}: EmailProps) => {
  const { users } = await createAdminClient();

  let user;
  try {
    user = await users.get(userId);
  } catch (error) {
    console.error(`User with ID ${userId} not found.`);
    return { error: "User not found" };
  }

  const email = user.email;
  if (!email) {
    console.error(`User with ID ${userId} does not have an email.`);
    return { error: "User does not have an email" };
  }

  try {
    console.log("Sending email to user...");
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    return { error };
  }

  return userId;
};
