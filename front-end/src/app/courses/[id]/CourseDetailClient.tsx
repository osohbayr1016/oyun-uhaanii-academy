"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import PublicLoadErrorBanner from "@/components/PublicLoadErrorBanner";
import CourseDetailHero from "./CourseDetailHero";
import CourseDetailAbout from "./CourseDetailAbout";
import CourseDetailExtras from "./CourseDetailExtras";
import CourseDetailVideoModals from "./CourseDetailVideoModals";
import { useCourseVideoModal } from "./useCourseVideoModal";

export type CourseDetailData = {
  title: string;
  description: string;
  heroImage?: string | null;
  youtubeUrl?: string | null;
  goal?: string | null;
  courseMaterials?: string | null;
  target?: string | null;
  structure?: string | null;
  sectionImage?: string | null;
  sectionText?: string | null;
  lessons?: Array<{ id: string; title: string }>;
  enrollLink?: string | null;
};

export default function CourseDetailClient() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const video = useCourseVideoModal(course);

  const loadCourse = useCallback(async () => {
    if (!id || typeof id !== "string") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchBffJson<CourseDetailData>(`/api/courses/${id}`);
      setCourse(data);
    } catch (e) {
      setCourse(null);
      setLoadError(
        e instanceof Error ? e.message : "Сургалтын мэдээлэл ачаалагдсангүй."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  if (loading) {
    return (
      <div className="p-8 text-center">Уншиж байна...</div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
        <PublicLoadErrorBanner message={loadError} onRetry={loadCourse} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 text-center">Сургалт олдсонгүй</div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CourseDetailHero course={course} onVideoClick={video.handleVideoClick} />
      <CourseDetailAbout
        goal={course.goal}
        courseMaterials={course.courseMaterials}
        target={course.target}
        structure={course.structure}
      />
      <CourseDetailVideoModals
        course={course}
        showVideo={video.showVideo}
        setShowVideo={video.setShowVideo}
        videoError={video.videoError}
        setVideoError={video.setVideoError}
        videoLoading={video.videoLoading}
        onVideoLoad={video.handleVideoLoad}
        onVideoError={video.handleVideoError}
      />
      <CourseDetailExtras
        sectionImage={course.sectionImage}
        sectionText={course.sectionText}
        lessons={course.lessons}
        enrollLink={course.enrollLink}
      />
    </div>
  );
}
