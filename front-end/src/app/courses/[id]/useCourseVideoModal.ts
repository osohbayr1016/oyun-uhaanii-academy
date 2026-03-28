import { useCallback, useEffect, useRef, useState } from "react";
import { getYouTubeEmbedUrl, isValidYouTubeUrl } from "./courseYouTubeHelpers";

export function useCourseVideoModal(course: {
  youtubeUrl?: string | null;
} | null) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearVideoTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearVideoTimeout();
  }, [clearVideoTimeout]);

  const handleVideoError = useCallback(() => {
    setVideoLoading(false);
    setVideoError(true);
    setShowVideo(false);
    clearVideoTimeout();
  }, [clearVideoTimeout]);

  const handleVideoClick = useCallback(() => {
    if (!course?.youtubeUrl) {
      setVideoError(true);
      return;
    }
    if (!isValidYouTubeUrl(course.youtubeUrl)) {
      setVideoError(true);
      return;
    }
    const embedUrl = getYouTubeEmbedUrl(course.youtubeUrl);
    if (!embedUrl) {
      setVideoError(true);
      return;
    }
    setVideoError(false);
    setVideoLoading(true);
    setShowVideo(true);
    clearVideoTimeout();
    timeoutRef.current = setTimeout(() => {
      handleVideoError();
    }, 10000);
  }, [course?.youtubeUrl, clearVideoTimeout, handleVideoError]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoading(false);
    clearVideoTimeout();
  }, [clearVideoTimeout]);

  return {
    showVideo,
    setShowVideo,
    videoError,
    setVideoError,
    videoLoading,
    handleVideoClick,
    handleVideoLoad,
    handleVideoError,
    getYouTubeEmbedUrl,
  };
}
