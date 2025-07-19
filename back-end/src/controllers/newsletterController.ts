import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import nodemailer from "nodemailer";

// Subscribe to newsletter
export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Имэйл хаяг шаардлагатай" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Имэйл хаяг буруу байна" });
    }

    // Check if already subscribed
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res
          .status(400)
          .json({ message: "Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна" });
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email: email.toLowerCase() },
          data: { isActive: true },
        });
        return res.json({
          message: "Мэдээний жагсаалтад амжилттай бүртгэгдлээ",
        });
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: {
        email: email.toLowerCase(),
        isActive: true,
      },
    });

    res
      .status(201)
      .json({ message: "Мэдээний жагсаалтад амжилттай бүртгэгдлээ" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;

    const subscription = await prisma.newsletter.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Бүртгэл олдсонгүй" });
    }

    await prisma.newsletter.update({
      where: { unsubscribeToken: token },
      data: { isActive: false },
    });

    res.json({ message: "Мэдээний жагсаалтаас амжилттай хасагдлаа" });
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

// Get all active subscribers (admin only)
export const getNewsletterSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: "desc" },
    });

    res.json(subscribers);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

// Send weekly newsletter (admin only)
export const sendWeeklyNewsletter = async (req: Request, res: Response) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res
        .status(400)
        .json({ message: "Гарчиг болон агуулга шаардлагатай" });
    }

    // Get all active subscribers
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return res
        .status(400)
        .json({ message: "Идэвхтэй бүртгэлтэй хэрэглэгч байхгүй байна" });
    }

    // Check SMTP configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP configuration missing:", {
        host: smtpHost ? "set" : "missing",
        user: smtpUser ? "set" : "missing",
        pass: smtpPass ? "set" : "missing",
      });
      return res.status(500).json({
        message:
          "Имэйл тохиргоо дутуу байна. SMTP_HOST, SMTP_USER, SMTP_PASS тохируулна уу.",
        error: "SMTP_CONFIG_MISSING",
      });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return res.status(500).json({
        message:
          "Имэйл серверийн холболт амжилтгүй. SMTP тохиргоог шалгана уу.",
        error: "SMTP_VERIFICATION_FAILED",
        details:
          verifyError instanceof Error ? verifyError.message : "Unknown error",
      });
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/unsubscribe/${subscriber.unsubscribeToken}`;

        const emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Монголын Оюун Ухааны Академ</h2>
            <h3>${subject}</h3>
            <div style="line-height: 1.6;">
              ${content}
            </div>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              Энэ имэйлийг хүлээн авахаас татгалзах бол 
              <a href="${unsubscribeUrl}">энд дарна уу</a>
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: smtpUser,
          to: subscriber.email,
          subject: subject,
          html: emailContent,
        });

        // Update last email sent timestamp
        await prisma.newsletter.update({
          where: { id: subscriber.id },
          data: { lastEmailSent: new Date() },
        });

        successCount++;
        console.log(`✅ Email sent successfully to: ${subscriber.email}`);
      } catch (error) {
        console.error(`❌ Error sending email to ${subscriber.email}:`, error);
        errorCount++;
        errors.push(
          `${subscriber.email}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    res.json({
      message: `Имэйл илгээлт дууссан. Амжилттай: ${successCount}, Алдаа: ${errorCount}`,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error sending weekly newsletter:", error);
    res.status(500).json({
      message: "Серверийн алдаа",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get newsletter statistics (admin only)
export const getNewsletterStats = async (req: Request, res: Response) => {
  try {
    const totalSubscribers = await prisma.newsletter.count({
      where: { isActive: true },
    });

    const totalUnsubscribed = await prisma.newsletter.count({
      where: { isActive: false },
    });

    const thisWeekSubscribers = await prisma.newsletter.count({
      where: {
        isActive: true,
        subscribedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    res.json({
      totalSubscribers,
      totalUnsubscribed,
      thisWeekSubscribers,
    });
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
