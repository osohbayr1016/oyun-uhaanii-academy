"use client";

import { useEffect, useState } from "react";

export default function DebugMetaPage() {
  const [metaTags, setMetaTags] = useState<
    Array<{ name?: string; property?: string; content: string }>
  >([]);

  useEffect(() => {
    // Get all meta tags
    const allMetaTags = document.querySelectorAll("meta");
    const metaArray: Array<{
      name?: string;
      property?: string;
      content: string;
    }> = [];

    allMetaTags.forEach((meta) => {
      const name = meta.getAttribute("name");
      const property = meta.getAttribute("property");
      const content = meta.getAttribute("content");

      if (content) {
        metaArray.push({
          name: name || undefined,
          property: property || undefined,
          content,
        });
      }
    });

    setMetaTags(metaArray);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meta Tags Debug Page</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Meta Tags:</h2>

          <div className="space-y-2">
            {metaTags.map((tag, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border">
                <div className="font-mono text-sm">
                  <span className="text-blue-600">
                    {tag.property
                      ? `property="${tag.property}"`
                      : `name="${tag.name}"`}
                  </span>
                  <span className="text-gray-500"> → </span>
                  <span className="text-green-600">"{tag.content}"</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Instructions:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-yellow-700">
              <li>
                Copy this page URL:{" "}
                <code className="bg-yellow-100 px-2 py-1 rounded">
                  {window.location.href}
                </code>
              </li>
              <li>
                Go to{" "}
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Facebook Debugger
                </a>
              </li>
              <li>Paste the URL and click "Debug"</li>
              <li>Check if the meta tags are being read correctly</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
