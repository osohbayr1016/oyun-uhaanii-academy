import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getPrismaForNode } from "../src/utils/nodePrisma";

dotenv.config();

const prisma = getPrismaForNode();

async function sendWeeklyNewsletter() {
  try {
    console.log("Starting weekly newsletter send...");

    // Get all active subscribers
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      console.log("No active subscribers found.");
      return;
    }

    console.log(`Found ${subscribers.length} active subscribers.`);

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Weekly newsletter content
    const subject = "Монголын Оюун Ухааны Академ - Долоо хоногийн мэдээ";
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Монголын Оюун Ухааны Академ</h2>
        <h3>Долоо хоногийн мэдээ</h3>
        
        <div style="line-height: 1.6;">
          <p>Сайн байна уу!</p>
          
          <h4>Энэ долоо хоногт болсон үйл явдлууд:</h4>
          <ul>
            <li>Шинэ сургалтууд нэмэгдлээ</li>
            <li>Тэмцээний мэдээлэл</li>
            <li>Академийн шинэчлэлтүүд</li>
          </ul>
          
          <h4>Дараагийн долоо хоногт болох үйл явдлууд:</h4>
          <ul>
            <li>Шинэ курсууд эхлэх</li>
            <li>Тэмцээнүүд</li>
            <li>Семинар, сургалтууд</li>
          </ul>
          
          <p>Дэлгэрэнгүй мэдээллийг манай вэбсайтаас үзнэ үү: <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a></p>
          
          <p>Баяртай!</p>
          <p>Монголын Оюун Ухааны Академ баг</p>
        </div>
      </div>
    `;

    let successCount = 0;
    let errorCount = 0;

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe/${subscriber.unsubscribeToken}`;

        const emailContent = `
          ${content}
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            Энэ имэйлийг хүлээн авахаас татгалзах бол 
            <a href="${unsubscribeUrl}">энд дарна уу</a>
          </p>
        `;

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: subscriber.email,
          subject: subject,
          html: emailContent,
        });

        // Update last email sent timestamp
        await prisma.newsletter.update({
          where: { id: subscriber.id },
          data: { lastEmailSent: new Date() },
        });

        console.log(`✅ Email sent successfully to ${subscriber.email}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error sending email to ${subscriber.email}:`, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Newsletter send completed:`);
    console.log(`✅ Successfully sent: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📧 Total subscribers: ${subscribers.length}`);
  } catch (error) {
    console.error("Error in sendWeeklyNewsletter:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  sendWeeklyNewsletter()
    .then(() => {
      console.log("Weekly newsletter script completed.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Weekly newsletter script failed:", error);
      process.exit(1);
    });
}

export default sendWeeklyNewsletter;
