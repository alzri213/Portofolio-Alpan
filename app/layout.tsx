import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.css";

import Layouts from "@/common/components/layouts";
import ThemeProviderContext from "@/common/stores/theme";
import NextAuthProvider from "@/SessionProvider";
import { METADATA } from "@/common/constants/metadata";
import { onestSans } from "@/common/styles/fonts";
import { authOptions } from "@/common/libs/auth";
import { getUserLocale } from "@/services/locale";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.DOMAIN
      ? (process.env.DOMAIN.startsWith('http') ? process.env.DOMAIN : `https://${process.env.DOMAIN}`)
      : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getUserLocale();
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    messages = {};
  }
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="91c868c5-2a89-4a1d-b292-56c40ea30137"

      // data-domains="satriabahari.site"
      // data-website-id="8e2c9f27-a12b-48ca-8130-808ebe377aca"
      ></Script>
      <body className={onestSans.className}>
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="cubic-bezier(0.22, 1, 0.36, 1)"
          speed={200}
          shadow="0 0 12px #3b82f6, 0 0 6px rgba(59, 130, 246, 0.4)"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextAuthProvider session={session}>
            <ThemeProviderContext>
              <Layouts>{children}</Layouts>
            </ThemeProviderContext>
          </NextAuthProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
