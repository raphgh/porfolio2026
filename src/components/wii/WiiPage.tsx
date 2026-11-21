"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { ModeToggle } from "@/components/ModeToggle";
import { PageHeader } from "@/components/PageHeader";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiCursor } from "@/components/wii/WiiCursor";
import { WiiPanelProvider } from "@/components/wii/WiiPanel";
import { site } from "@/data/site";
import { unlockWiiSound, wiiSound } from "@/lib/wiiSound";

type Props = {
  title: string;
  subtitle?: string;
  /** Show the case-studies loading-bar treatment under the title. */
  loadingNote?: boolean;
  thumb?: string;
  accent?: string;
  channelId: string;
  /** Where the back orb goes. Defaults to the channel home. */
  backHref?: string;
  children: ReactNode;
};

/**
 * Shared Wii channel-page shell for portfolio routes.
 * Modern mode keeps the existing PageHeader + shell layout.
 * No Motion transforms around page body - Safari blanks cover <img> under them.
 */
export function WiiPage({
  title,
  subtitle,
  loadingNote = false,
  thumb,
  accent = "#eef2f6",
  channelId: _channelId,
  backHref = "/",
  children,
}: Props) {
  const { mode, ready } = useInterfaceMode();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  const goBack = useCallback(() => {
    if (exiting) return;
    wiiSound.back();
    setExiting(true);
    window.setTimeout(() => router.push(backHref), reduce ? 120 : 420);
  }, [backHref, exiting, reduce, router]);

  if (!ready || mode === "modern") {
    return (
      <div className="shell pb-24 md:pb-32">
        <PageHeader title={title} intro={subtitle} />
        {children}
      </div>
    );
  }

  return (
    <div
      className={`wii-channel-page wii-page${exiting ? " is-exiting" : ""}`}
      onPointerDownCapture={() => {
        void unlockWiiSound();
      }}
    >
      <WiiCursor />

      <header className="wii-page__top">
        <div className="wii-page__top-start">
          <button
            type="button"
            className="wii-orb wii-page__back"
            aria-label={backHref === "/" ? "Back to channels" : "Back"}
            onClick={goBack}
          >
            <BackIcon />
          </button>
        </div>
        <p className="wii-page__mark">{site.shortName}</p>
        <div className="wii-page__top-end">
          <ModeToggle variant="wii" />
        </div>
      </header>

      <div className={`wii-page__scroll${exiting ? " is-exiting" : ""}`}>
        <div className="wii-page__column">
          <header className="wii-page__title-block">
            <div className="wii-page__thumb" style={{ background: accent }}>
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumb} alt="" decoding="async" />
              ) : null}
            </div>
            <div className="wii-page__title-text">
              <h1 className="wii-page__heading">
                {title.toLowerCase()}
                <span aria-hidden className="text-mustard">
                  .
                </span>
              </h1>
              <span className="wii-page__rule is-on" aria-hidden />
              {loadingNote && subtitle ? (
                <div className="wii-loading-note">
                  <div className="wii-loading-bar" aria-hidden>
                    <span className="wii-loading-bar__fill" />
                  </div>
                  <p className="wii-page__subtitle">{subtitle}</p>
                </div>
              ) : subtitle ? (
                <p className="wii-page__subtitle">{subtitle}</p>
              ) : null}
            </div>
          </header>

          <div className="wii-page__body">
            <WiiPanelProvider>{children}</WiiPanelProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 48 48" className="wii-orb__info-svg" aria-hidden>
      <path
        d="M28.5 12.5 17 24l11.5 11.5"
        fill="none"
        stroke="#4a5560"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 24h14.5" fill="none" stroke="#4a5560" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
