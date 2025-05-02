import { EMAIL_PASS, EMAIL_USER } from "@/config";
import { createAdminClient } from "@/lib/appwrite";
import { generateEmailTemplate } from "@/lib/generateEmailTemplate";

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
  taskId: string;
  workspaceId: string;
  subject: string;
  taskName: string;
  firstParagraph: string;
}

export const useNotificateEmail = async ({
  userId,
  taskId,
  workspaceId,
  subject,
  taskName,
  firstParagraph,
}: EmailProps) => {
  const { users } = await createAdminClient();
  const user = await users.get(userId);
  const email = user.email;

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject,
      text: `You have been assigned a new task: ${taskName}. View it here: https://monum.online/workspaces/${workspaceId}/tasks/${taskId}`,
      html: generateEmailTemplate(subject, taskName, `https://monum.online/workspaces/${workspaceId}/tasks/${taskId}`, firstParagraph),
    });
  } catch (error) {
    return { error };
  }
};
