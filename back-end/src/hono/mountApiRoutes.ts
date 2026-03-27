import type { Hono } from "hono";
import productRoutes from "../routes/productRoutes";
import authRoutes from "../routes/authRoutes";
import newsRoutes from "../routes/newsRoutes";
import courseRoutes from "../routes/courseRoutes";
import tournamentRoutes from "../routes/tournamentRoutes";
import adminRoutes from "../routes/adminRoutes";
import textContentRoutes from "../routes/textContentRoutes";
import homeContentRoutes from "../routes/homeContentRoutes";
import newsletterRoutes from "../routes/newsletterRoutes";
import aboutRoutes from "../routes/aboutRoutes";
import carouselRoutes from "../routes/carouselRoutes";
import clubRoutes from "../routes/clubRoutes";
import courseFiltersRoutes from "../routes/courseFiltersRoutes";
import type { AppEnv } from "./appEnv";

export function mountApiRoutes(app: Hono<AppEnv>) {
  app.route("/api/products", productRoutes);
  app.route("/api/auth", authRoutes);
  app.route("/api/news", newsRoutes);
  app.route("/api/courses", courseRoutes);
  app.route("/api/tournaments", tournamentRoutes);
  app.route("/api/admin", adminRoutes);
  app.route("/api/text-content", textContentRoutes);
  app.route("/api/home-content", homeContentRoutes);
  app.route("/api/newsletter", newsletterRoutes);
  app.route("/api/about", aboutRoutes);
  app.route("/api/carousel", carouselRoutes);
  app.route("/api/club", clubRoutes);
  app.route("/api/course-filters", courseFiltersRoutes);
}
