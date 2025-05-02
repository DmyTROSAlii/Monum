export const generateEmailTemplate = (
  subject: string,
  taskName: string,
  taskLink: string,
  firstParagraph: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#eeeeee;">
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:#4caf50; color:#ffffff; text-align:center; padding:24px; font-size:26px; font-weight:bold;">
              📌 ${subject}
            </td>
          </tr>

          <tr>
            <td style="padding:24px; color:#333333; font-size:16px; line-height:1.6;">
              <p style="margin-top:0;">Hi there,</p>
              <p>${firstParagraph}<strong>${taskName}</strong>.</p>
              <p>To view the task, click the button below:</p>
              <p style="text-align:center; margin:30px 0;">
                <a href="${taskLink}" style="
                  background-color:#4caf50;
                  color:#ffffff;
                  padding:12px 24px;
                  text-decoration:none;
                  font-size:16px;
                  border-radius:6px;
                  display:inline-block;
                  font-weight:bold;
                ">🔍 View Task</a>
              </p>
              <p>Thank you,<br>The <strong>Monum</strong> Team</p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f4f4f4; text-align:center; padding:16px; font-size:12px; color:#888888;">
              &copy; 2025 Monum. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
