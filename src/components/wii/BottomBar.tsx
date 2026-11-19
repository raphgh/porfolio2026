"use client";

import { m, useReducedMotion } from "motion/react";
import { ModeToggle } from "@/components/ModeToggle";
import { WiiClock } from "@/components/wii/WiiClock";
import { site } from "@/data/site";

/** Top-edge of the Wii dock - high shoulders, flat low center. */
const DOCK_TOP =
  "M0,0 H330 C520,0 620,110 800,110 H1120 C1300,110 1400,0 1590,0 H1920";
const DOCK_SHAPE = `${DOCK_TOP} V295 H0 Z`;

/** Shallower dip for narrow screens so controls fit without colliding. */
const DOCK_TOP_MOBILE =
  "M0,0 H260 C420,0 520,48 720,48 H1200 C1400,48 1500,0 1660,0 H1920";
const DOCK_SHAPE_MOBILE = `${DOCK_TOP_MOBILE} V295 H0 Z`;

type Props = {
  unread: number;
  onOpenSettings: () => void;
  onOpenMail: () => void;
};

/** Home-menu dock only - channel pages use a standalone back orb. */
export function BottomBar({ unread, onOpenSettings, onOpenMail }: Props) {
  const reduce = useReducedMotion();

  return (
    <m.footer
      className="wii-menu__dock"
      initial={reduce ? false : { y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.25 }}
    >
      <div className="wii-menu__dock-svg-wrap" aria-hidden>
        <svg
          className="wii-menu__dock-svg wii-menu__dock-svg--desktop"
          viewBox="0 0 1920 295"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <DockSvgDefs idPrefix="desk" shape={DOCK_SHAPE} />
          <path d={DOCK_SHAPE} fill="url(#desk-wii-dock-fill)" />
          <path d={DOCK_SHAPE} fill="url(#desk-wii-dock-scan)" />
          <path
            d={DOCK_SHAPE}
            fill="url(#desk-wii-dock-bevel)"
            transform="translate(0 3)"
            clipPath="url(#desk-wii-dock-clip)"
          />
          <path
            d={DOCK_TOP}
            fill="none"
            stroke="#3fa9e0"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#desk-wii-dock-blue-glow)"
          />
        </svg>

        <svg
          className="wii-menu__dock-svg wii-menu__dock-svg--mobile"
          viewBox="0 0 1920 295"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <DockSvgDefs idPrefix="mob" shape={DOCK_SHAPE_MOBILE} />
          <path d={DOCK_SHAPE_MOBILE} fill="url(#mob-wii-dock-fill)" />
          <path d={DOCK_SHAPE_MOBILE} fill="url(#mob-wii-dock-scan)" />
          <path
            d={DOCK_SHAPE_MOBILE}
            fill="url(#mob-wii-dock-bevel)"
            transform="translate(0 3)"
            clipPath="url(#mob-wii-dock-clip)"
          />
          <path
            d={DOCK_TOP_MOBILE}
            fill="none"
            stroke="#3fa9e0"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#mob-wii-dock-blue-glow)"
          />
        </svg>
      </div>

      <div className="wii-menu__dock-inner">
        <div className="wii-menu__dock-left">
          <button
            type="button"
            className="wii-orb wii-orb--info"
            aria-label="Open settings"
            onClick={onOpenSettings}
          >
            <InfoIcon />
          </button>
          <div className="wii-mail-wrap">
            <button
              type="button"
              className={`wii-orb wii-orb--mail${unread > 0 ? " has-unread" : ""}`}
              aria-label={unread > 0 ? `Message board, ${unread} unread` : "Message board"}
              onClick={onOpenMail}
            >
              <MailIcon />
              {unread > 0 ? <span className="wii-mail-count">{unread}</span> : null}
            </button>
          </div>
        </div>

        <m.div
          className="wii-menu__dock-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.35 }}
        >
          <WiiClock />
        </m.div>

        <div className="wii-menu__dock-right">
          <p className="wii-menu__identity wii-menu__identity--dock">
            <span className="wii-menu__identity-name">{site.name}</span>
          </p>
          <ModeToggle variant="wii" />
        </div>
      </div>
    </m.footer>
  );
}

function DockSvgDefs({ idPrefix, shape }: { idPrefix: string; shape: string }) {
  return (
    <defs>
      <linearGradient id={`${idPrefix}-wii-dock-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e6e8ec" />
        <stop offset="100%" stopColor="#c3c8d0" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-wii-dock-bevel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="12%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <pattern
        id={`${idPrefix}-wii-dock-scan`}
        patternUnits="userSpaceOnUse"
        width="4"
        height="3"
      >
        <rect width="4" height="1" fill="rgb(0 0 0 / 0.035)" />
      </pattern>
      <clipPath id={`${idPrefix}-wii-dock-clip`}>
        <path d={shape} />
      </clipPath>
      <filter
        id={`${idPrefix}-wii-dock-blue-glow`}
        x="-20%"
        y="-40%"
        width="140%"
        height="180%"
      >
        <feDropShadow dx="0" dy="-1" stdDeviation="2" floodColor="#3fa9e0" floodOpacity="0.45" />
      </filter>
    </defs>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 48 48" className="wii-orb__info-svg" aria-hidden>
      <circle cx="24" cy="24" r="15.5" fill="none" stroke="#4a5560" strokeWidth="3.2" />
      <circle cx="24" cy="15.2" r="2.4" fill="#4a5560" />
      <path
        d="M21.2 21.5h5.2v12.8c0 1.1-.9 2-2 2h-1.2c-1.1 0-2-.9-2-2V21.5z"
        fill="#4a5560"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 48 36" aria-hidden>
      <rect
        x="2"
        y="4"
        width="44"
        height="28"
        rx="4"
        fill="#e8eef2"
        stroke="#5a6670"
        strokeWidth="2"
      />
      <path d="M4 8l20 14L44 8" fill="none" stroke="#2a9fd0" strokeWidth="2.2" />
    </svg>
  );
}
