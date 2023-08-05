import nodemailer, { SentMessageInfo } from "nodemailer";
import { IEmailOptions } from "../interfaces/email.interface";

// Generate a random 4-digit OTP
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const sendEmail = async (
  emailOptions: IEmailOptions
): Promise<SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

// Send OTP to user's email
export const sendOTPToEmail = async (email: string, otp: string) => {
  const emailOptions: IEmailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "OTP Verification",
    // text: `Your OTP for verification is: ${otp}`,
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:2em;color: #333;text-decoration:none;font-weight:600"><span style="color: #fb923c;">SUT</span> Schedule</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for SUT Schedule. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 3 minutes</p>
        <h2 style="background: #fb923c;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />SUT Schedule</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>
    </body>
    </html>`,
  };

  const res = await sendEmail(emailOptions);
  return res;
};
