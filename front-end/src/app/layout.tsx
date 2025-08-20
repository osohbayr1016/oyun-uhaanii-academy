import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "./_components/ConditionalLayout";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Academy Officer",
  description: "Монголын оюун ухааны академи",
  icons: {
    icon: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
  },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "https://academyofficer.mn",
    siteName: "Academy Officer",
    title: "Academy Officer",
    description: "Монголын оюун ухааны академи",
    images: [
      {
        url: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
        width: 1200,
        height: 630,
        alt: "Academy Officer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy Officer",
    description: "Монголын оюун ухааны академи",
    images: [
      "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://db.onlinewebfonts.com; font-src 'self' https://fonts.gstatic.com https://db.onlinewebfonts.com; img-src 'self' data: https:; media-src 'self' https:; frame-src 'self' https://www.youtube.com https://youtube.com; connect-src 'self' https: http://localhost:5001;"
        />
        {/* Facebook Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="mn_MN" />
        <meta property="og:site_name" content="Academy Officer" />
        <meta property="fb:app_id" content="23917029414660229" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://academyofficer.mn" />
        <link
          rel="preload"
          href="https://db.onlinewebfonts.com/t/a28001a286f8e6a91583693769dbf876.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>

        {/* Facebook SDK */}
        <div id="fb-root"></div>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/mn_MN/sdk.js#xfbml=1&version=v18.0"
          nonce="random_nonce"
        />
      </body>
    </html>
  );
}
