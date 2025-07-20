const sendEmail = require("../utils/sendEmail");

const sendWelcomeEmail = async(email,name,verificationLink) => {
    await sendEmail(email, "Verify your email", `
        <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 40px 30px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">Welcome to Freelance</h1>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding: 30px; color: #333333; line-height: 1.6;">
        <h3 style="font-size: 20px; margin: 0 0 15px;">Hello ${name},</h3>
        <p style="font-size: 16px; margin: 0 0 20px;">
          We're excited to see that you're signing up for Freelance! To complete your registration, please verify your identity by clicking the link below:
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 20px auto;">
          <tr>
            <td style="background-color: #4f46e5; border-radius: 5px; text-align: center;">
              <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold;">Verify Your Email</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0 0;">
          If you did not initiate this sign-up, please ignore this email.
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f8f8f8; padding: 20px 30px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <p style="font-size: 14px; color: #666666; margin: 0 0 15px;">Follow us on:</p>
        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
          <tr>
            <td style="padding: 0 10px;">
              <a href="https://facebook.com" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" width="32" height="32" style="display: block;">
              </a>
            </td>
            <td style="padding: 0 10px;">
              <a href="https://twitter.com" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" width="32" height="32" style="display: block;">
              </a>
            </td>
            <td style="padding: 0 10px;">
              <a href="https://linkedin.com" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" width="32" height="32" style="display: block;">
              </a>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #999999; margin: 15px 0 0;">&copy; 2025 Freelance. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
      `
    );
}

module.exports = sendWelcomeEmail;