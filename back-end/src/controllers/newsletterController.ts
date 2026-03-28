import { getPrisma } from "../utils/prisma";
import { sendEmailViaResend } from "../utils/mail";
import type { AppCtx } from "../types/context";
import type { PublicCtx } from "../types/context";

function frontendBase(c: { env: { FRONTEND_URL?: string } }) {
  return c.env.FRONTEND_URL ?? process.env.FRONTEND_URL ?? "http://localhost:3000";
}

export const subscribeToNewsletter = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<{ email?: string }>();
    const { email } = body;

    if (!email || !email.trim()) {
      return c.json({ message: "Имэйл хаяг шаардлагатай" }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ message: "Имэйл хаяг буруу байна" }, 400);
    }

    const existingSubscription = await getPrisma().newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return c.json(
          { message: "Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна" },
          400
        );
      }
      await getPrisma().newsletter.update({
        where: { email: email.toLowerCase() },
        data: { isActive: true },
      });
      return c.json({
        message: "Мэдээний жагсаалтад амжилттай бүртгэгдлээ",
      });
    }

    await getPrisma().newsletter.create({
      data: {
        email: email.toLowerCase(),
        isActive: true,
      },
    });

    return c.json(
      { message: "Мэдээний жагсаалтад амжилттай бүртгэгдлээ" },
      201
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return c.json({ message: "Серверийн алдаа" }, 500);
  }
};

export const unsubscribeFromNewsletter = async (c: PublicCtx) => {
  try {
    const token = c.req.param("token");

    const subscription = await getPrisma().newsletter.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscription) {
      return c.json({ message: "Бүртгэл олдсонгүй" }, 404);
    }

    await getPrisma().newsletter.update({
      where: { unsubscribeToken: token },
      data: { isActive: false },
    });

    return c.json({ message: "Мэдээний жагсаалтаас амжилттай хасагдлаа" });
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return c.json({ message: "Серверийн алдаа" }, 500);
  }
};

export const getNewsletterSubscribers = async (c: AppCtx) => {
  try {
    const subscribers = await getPrisma().newsletter.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: "desc" },
    });

    return c.json(subscribers);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return c.json([]);
  }
};

export const sendWeeklyNewsletter = async (c: AppCtx) => {
  try {
    const body = await c.req.json<{ subject?: string; content?: string }>();
    const { subject, content } = body;

    if (!subject || !content) {
      return c.json({ message: "Гарчиг болон агуулга шаардлагатай" }, 400);
    }

    const subscribers = await getPrisma().newsletter.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return c.json(
        { message: "Идэвхтэй бүртгэлтэй хэрэглэгч байхгүй байна" },
        400
      );
    }

    const apiKey = c.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
    const fromEmail =
      c.env.RESEND_FROM_EMAIL ??
      process.env.RESEND_FROM_EMAIL ??
      process.env.SMTP_USER;

    if (!apiKey || !fromEmail) {
      return c.json(
        {
          message:
            "Имэйл тохиргоо дутуу байна. RESEND_API_KEY болон RESEND_FROM_EMAIL (эсвэл SMTP_USER) тохируулна уу.",
          error: "EMAIL_CONFIG_MISSING",
        },
        500
      );
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${frontendBase(c)}/unsubscribe/${subscriber.unsubscribeToken}`;

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

        await sendEmailViaResend(apiKey, {
          from: fromEmail,
          to: subscriber.email,
          subject,
          html: emailContent,
        });

        await getPrisma().newsletter.update({
          where: { id: subscriber.id },
          data: { lastEmailSent: new Date() },
        });

        successCount++;
      } catch (err) {
        console.error(`Error sending email to ${subscriber.email}:`, err);
        errorCount++;
        errors.push(
          `${subscriber.email}: ${err instanceof Error ? err.message : "Unknown error"}`
        );
      }
    }

    return c.json({
      message: `Имэйл илгээлт дууссан. Амжилттай: ${successCount}, Алдаа: ${errorCount}`,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error sending weekly newsletter:", error);
    return c.json(
      {
        message: "Серверийн алдаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

export const getNewsletterStats = async (c: AppCtx) => {
  try {
    const prisma = getPrisma();
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

    return c.json({
      totalSubscribers,
      totalUnsubscribed,
      thisWeekSubscribers,
    });
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    return c.json({
      totalSubscribers: 0,
      totalUnsubscribed: 0,
      thisWeekSubscribers: 0,
    });
  }
};
