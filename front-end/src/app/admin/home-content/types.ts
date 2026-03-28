export type OfficerSectorStatsValues = {
  courses: number;
  tournaments: number;
  enrollments: number;
  teachers: number;
  products: number;
  years: number;
};

export type OfficerStatKey = keyof OfficerSectorStatsValues;

export interface HomeContent {
  hero_title?: string;
  hero_subtitle?: string;
  hero_stats_courses?: string;
  hero_stats_students?: string;
  hero_stats_teachers?: string;
  hero_stats_years?: string;
  features_title?: string;
  features_subtitle?: string;
  feature_1_title?: string;
  feature_2_title?: string;
  feature_3_title?: string;
  feature_4_title?: string;
  feature_5_title?: string;
  feature_6_title?: string;
}
