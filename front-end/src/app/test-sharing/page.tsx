import { Metadata } from "next";
import TestSharingButtons from "./_components/TestSharingButtons";

export const metadata: Metadata = {
  title: "Test Facebook Sharing - Academy Officer",
  description:
    "This is a test page to verify Facebook Open Graph sharing functionality",
  openGraph: {
    title: "Test Facebook Sharing",
    description:
      "This is a test page to verify Facebook Open Graph sharing functionality",
    type: "article",
    url: "https://academyofficer.mn/test-sharing",
    siteName: "Academy Officer",
    images: [
      {
        url: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
        width: 1200,
        height: 630,
        alt: "Academy Officer Test",
      },
    ],
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test Facebook Sharing",
    description:
      "This is a test page to verify Facebook Open Graph sharing functionality",
    images: [
      "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
    ],
  },
};

export default function TestSharingPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Facebook Sharing Test Page
          </h1>

          <div className="prose prose-lg text-gray-700 mb-8">
            <p>
              This is a test page to verify that Facebook Open Graph sharing is
              working properly. When you share this page on Facebook, it should
              display with:
            </p>
            <ul>
              <li>✅ Custom title: "Test Facebook Sharing"</li>
              <li>✅ Custom description</li>
              <li>✅ Academy Officer logo as the preview image</li>
              <li>✅ Proper site name and URL</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              How to Test:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>
                Copy this page URL:{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">
                  https://academyofficer.mn/test-sharing
                </code>
              </li>
              <li>Go to Facebook and paste the URL in a new post</li>
              <li>Wait for Facebook to fetch the preview</li>
              <li>
                Verify that the preview shows the correct title, description,
                and image
              </li>
            </ol>
          </div>

          <TestSharingButtons />

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Expected Meta Tags:
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">
                {`<meta property="og:title" content="Test Facebook Sharing" />
                <meta property="og:description" content="This is a test page to verify Facebook Open Graph sharing functionality" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://academyofficer.mn/test-sharing" />
                <meta property="og:image" content="[Academy Officer Logo URL]" />
                <meta property="og:site_name" content="Academy Officer" />
                <meta property="og:locale" content="mn_MN" />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
