"use client";

import { m, useReducedMotion } from "motion/react";
import { ModeToggle } from "@/components/ModeToggle";
import { WiiClock } from "@/components/wii/WiiClock";
import { site } from "@/data/site";

type Props = {
  unread: number;
  onOpenSettings: () => void;
  onOpenMail: () => void;
};

export function BottomBar({ unread, onOpenSettings, onOpenMail }: Props) {
  const reduce = useReducedMotion();

  return (
    <m.footer
      className="wii-menu__dock"
      initial={reduce ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.25 }}
    >
      <div className="wii-menu__dock-curve" aria-hidden>
        {/* Exaggerated Wii swoosh: high sides, deep center dip */}
        <svg viewBox="0 0 1200 96" preserveAspectRatio="none">
          <path
            className="wii-menu__dock-curve-fill"
            d="M0 96V18C0 18 180 4 360 28C520 50 600 78 600 78C600 78 680 50 840 28C1020 4 1200 18 1200 18V96H0Z"
          />
          <path
            className="wii-menu__dock-curve-line"
            d="M0 18C0 18 180 4 360 28C520 50 600 78 600 78C600 78 680 50 840 28C1020 4 1200 18 1200 18"
          />
        </svg>
      </div>

      <m.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.35 }}
      >
        <WiiClock />
      </m.div>

      <div className="wii-menu__dock-inner">
        <div className="wii-menu__dock-left">
          <button
            type="button"
            className="wii-orb"
            aria-label="Open settings"
            onClick={onOpenSettings}
          >
            <span className="wii-orb__label">rg</span>
          </button>
          <p className="wii-menu__identity wii-menu__identity--dock">
            <span className="wii-menu__identity-name">{site.name}</span>
          </p>
        </div>

        <div aria-hidden />

        <div className="wii-menu__dock-right">
          <ModeToggle variant="wii" />
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
      </div>
    </m.footer>
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
