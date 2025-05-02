const generateEmailTemplate = (
  subject: string,
  taskName: string,
  taskLink: string,
  firstParagraph: string
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .email-footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777777;
      background-color: #f4f4f4;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #45a049;
    }
    @media (max-width: 600px) {
      .email-container {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
    .email-header {
      font-size: 20px;
    }
    .button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      ${subject}
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>${firstParagraph}<strong>${taskName}</strong>.</p>
      <p>Click the button below to view the task:</p>
      <a href="${taskLink}" class="button">View Task</a>
      <p>Thank you,<br>The Monum Team</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Monum. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
