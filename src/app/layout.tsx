import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif, Nunito } from "next/font/google";
import Script from "next/script";
import { InterfaceModeProvider } from "@/components/InterfaceModeProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { interfaceBootScript } from "@/lib/interfaceMode";
import { themeBootScript } from "@/lib/theme";
import { site } from "@/data/site";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Rounded humanist sans - close to Wii Rodin, used only in Wii Mode. */
const wiiSans = Nunito({
  variable: "--font-wii-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.title}`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: `${site.name} - ${site.title}`,
    description: site.description,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#d5dce4",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-interface="wii"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${wiiSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-dvh flex-col bg-white text-charcoal"
        suppressHydrationWarning
      >
        <Script id="interface-boot" strategy="beforeInteractive">
          {interfaceBootScript}
        </Script>
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="label sr-only z-[100] rounded-full bg-mustard px-4 py-3 text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <InterfaceModeProvider>
            <SiteChrome>{children}</SiteChrome>
          </InterfaceModeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
