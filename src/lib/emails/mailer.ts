import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@quizarena.com";
  const fromName = process.env.SMTP_FROM_NAME || "QuizArena Security";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004";
  const logoUrl = `${appUrl}/logo-header.png`;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: "Password Reset Request - QuizArena",
    html: `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #F8FAFC;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <div style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #F1F5F9;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px;">
              <span style="color: #0a1c40;">Quiz</span><span style="color: #e6701e;">Arena</span>
            </h1>
          </div>
          
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #0F172A;">Reset your password</h2>
            <p style="margin: 0 0 24px; font-size: 15px; color: #475569; line-height: 1.6;">
              We received a request to securely reset your password. Click the button below to choose a new password. This link is valid for <strong>5 minutes</strong>.
            </p>
            
            <div style="text-align: center; margin: 36px 0;">
              <a href="${resetLink}" style="display: inline-block; background-color: #0B1B3D; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 2px 4px rgba(11, 27, 61, 0.2);">Reset Password</a>
            </div>
            
            <p style="margin: 0; font-size: 14px; color: #64748B; line-height: 1.5;">
              If you didn't request a password reset, you can safely ignore this email. Your account remains fully secure.
            </p>
          </div>
          
          <div style="padding: 24px 32px; background-color: #F8FAFC; text-align: center; border-top: 1px solid #F1F5F9;">
            <p style="margin: 0; font-size: 13px; color: #94A3B8;">&copy; ${new Date().getFullYear()} QuizArena. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("[MAILER_ERROR]", error);
    return { success: false, error };
  }
};

export const sendVerificationEmail = async (email: string, verifyLink: string) => {
  const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@quizarena.com";
  const fromName = process.env.SMTP_FROM_NAME || "QuizArena Security";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004";

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: "Verify your email address - QuizArena",
    html: `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #F8FAFC;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <div style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #F1F5F9;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px;">
              <span style="color: #0a1c40;">Quiz</span><span style="color: #e6701e;">Arena</span>
            </h1>
          </div>
          
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #0F172A;">Verify your email address</h2>
            <p style="margin: 0 0 24px; font-size: 15px; color: #475569; line-height: 1.6;">
              Welcome to QuizArena! Please confirm your email address to unlock full access to your account. This link is valid for <strong>24 hours</strong>.
            </p>
            
            <div style="text-align: center; margin: 36px 0;">
              <a href="${verifyLink}" style="display: inline-block; background-color: #0B1B3D; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 2px 4px rgba(11, 27, 61, 0.2);">Verify Email</a>
            </div>
            
            <p style="margin: 0; font-size: 14px; color: #64748B; line-height: 1.5;">
              If you didn't create an account with QuizArena, you can safely ignore this email.
            </p>
          </div>
          
          <div style="padding: 24px 32px; background-color: #F8FAFC; text-align: center; border-top: 1px solid #F1F5F9;">
            <p style="margin: 0; font-size: 13px; color: #94A3B8;">&copy; ${new Date().getFullYear()} QuizArena. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("[MAILER_ERROR]", error);
    return { success: false, error };
  }
};
