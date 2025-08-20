"use client";

export default function TestSharingButtons() {
  const handleCopyTestUrl = () => {
    navigator.clipboard.writeText("https://academyofficer.mn/test-sharing");
    alert("Test URL copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Facebook Debugger Link */}
      <a
        href="https://developers.facebook.com/tools/debug/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        Facebook Debugger
      </a>

      {/* Facebook Share Button */}
      <div
        className="fb-share-button"
        data-href="https://academyofficer.mn/test-sharing"
        data-layout="button"
        data-size="large"
      />

      {/* Twitter Share Button */}
      <a
        href="https://twitter.com/intent/tweet?text=Test%20Facebook%20Sharing%20-%20Academy%20Officer&url=https://academyofficer.mn/test-sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
        Share on Twitter
      </a>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyTestUrl}
        className="inline-flex items-center px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Copy Test URL
      </button>
    </div>
  );
}
