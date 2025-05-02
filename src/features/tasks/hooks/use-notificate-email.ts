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
  const user = await users.get(userId);
  const email = user.email;

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    return { error };
  }
};
