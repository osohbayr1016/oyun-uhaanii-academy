import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testEmailConfiguration() {
  console.log("🧪 Testing Email Configuration...\n");

  // Check environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = process.env.SMTP_PORT || "587";

  console.log("📋 Environment Variables Check:");
  console.log(`   SMTP_HOST: ${smtpHost ? "✅ Set" : "❌ Missing"}`);
  console.log(`   SMTP_USER: ${smtpUser ? "✅ Set" : "❌ Missing"}`);
  console.log(`   SMTP_PASS: ${smtpPass ? "✅ Set" : "❌ Missing"}`);
  console.log(`   SMTP_PORT: ${smtpPort}\n`);

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("❌ SMTP configuration is incomplete!");
    console.log(
      "Please set the missing environment variables in your .env file."
    );
    console.log("See SMTP_SETUP.md for detailed instructions.\n");
    return;
  }

  // Create transporter
  console.log("🔧 Creating SMTP transporter...");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Test connection
  console.log("🔍 Testing SMTP connection...");
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");
  } catch (error) {
    console.log("❌ SMTP connection failed!");
    console.log("Error:", error instanceof Error ? error.message : error);
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Check your email and password");
    console.log(
      "2. For Gmail, use an app password (not your regular password)"
    );
    console.log("3. Enable 2-Factor Authentication on your Google account");
    console.log("4. Check if your email provider allows SMTP access");
    console.log("5. Verify the SMTP host and port settings\n");
    return;
  }

  // Test sending email
  console.log("📧 Testing email sending...");
  const testEmail = smtpUser; // Send to yourself for testing

  try {
    const info = await transporter.sendMail({
      from: smtpUser,
      to: testEmail,
      subject: "🧪 Email Test - Oyun Uhaanii Academy",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🧪 Email Configuration Test</h2>
          <p>This is a test email to verify your SMTP configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>SMTP Host:</strong> ${smtpHost}</p>
          <p><strong>SMTP Port:</strong> ${smtpPort}</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            If you received this email, your newsletter email functionality is ready to use!
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Sent to: ${testEmail}\n`);
    console.log("🎉 Email configuration is working perfectly!");
    console.log(
      "You can now use the newsletter email functionality in the admin panel.\n"
    );
  } catch (error) {
    console.log("❌ Test email sending failed!");
    console.log("Error:", error instanceof Error ? error.message : error);
    console.log("\n🔧 This might be due to:");
    console.log("1. Email provider restrictions");
    console.log("2. Incorrect authentication");
    console.log("3. Network/firewall issues");
    console.log("4. Email provider security settings\n");
  }
}

// Run the test
if (require.main === module) {
  testEmailConfiguration()
    .then(() => {
      console.log("🏁 Email configuration test completed.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Unexpected error:", error);
      process.exit(1);
    });
}

export { testEmailConfiguration };
