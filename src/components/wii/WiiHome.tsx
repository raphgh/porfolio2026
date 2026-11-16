"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ModeToggle } from "@/components/ModeToggle";
import { BottomBar } from "@/components/wii/BottomBar";
import { ChannelDialog } from "@/components/wii/ChannelDialog";
import { ChannelGrid } from "@/components/wii/ChannelGrid";
import { MessageBoard } from "@/components/wii/MessageBoard";
import { SettingsPanel } from "@/components/wii/SettingsPanel";
import { WiiCursor } from "@/components/wii/WiiCursor";
import { site } from "@/data/site";
import type { WiiChannel } from "@/data/wiiChannels";
import { loadWiiSoundPreference, unlockWiiSound, wiiSound } from "@/lib/wiiSound";

/**
 * Faithful Wii Menu channel-selection screen — portfolio content in the channels.
 * No Nintendo branding or copyrighted assets.
 */
export function WiiHome() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [, startTransition] = useTransition();
  const [page, setPage] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pending, setPending] = useState<WiiChannel | null>(null);
  const [zooming, setZooming] = useState<WiiChannel | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    loadWiiSoundPreference();
    const t = window.setTimeout(() => setBooted(true), reduce ? 0 : 120);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    const unlock = () => {
      void unlockWiiSound();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  const openChannel = useCallback(
    (channel: WiiChannel) => {
      setPending(null);
      setZooming(channel);
      window.setTimeout(() => {
        if (channel.external) {
          window.open(channel.href, "_blank", "noopener,noreferrer");
          setZooming(null);
          return;
        }
        startTransition(() => {
          router.push(channel.href);
        });
      }, reduce ? 120 : 420);
    },
    [reduce, router],
  );

  return (
    <div className="wii-menu">
      <WiiCursor interactive={!!hoverId || settingsOpen || mailOpen || !!pending} />

      <AnimatePresence>
        {!booted && !reduce ? (
          <m.div
            key="boot"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "#fff",
              pointerEvents: "none",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onAnimationComplete={() => wiiSound.ding()}
          />
        ) : null}
      </AnimatePresence>

      <div className="wii-menu__top">
        <p className="wii-menu__identity">
          <span className="wii-menu__identity-name">{site.name}</span>
          <span className="wii-menu__identity-sub">portfolio channels</span>
        </p>
        <ModeToggle variant="wii" />
      </div>

      <div className="wii-menu__board-wrap">
        <ChannelGrid
          page={page}
          onPageChange={setPage}
          onSelect={(ch) => {
            wiiSound.hover();
            setPending(ch);
          }}
          hoverId={hoverId}
          onHoverChange={setHoverId}
        />
      </div>

      <BottomBar
        unread={unread}
        onOpenSettings={() => {
          wiiSound.confirm();
          setSettingsOpen(true);
        }}
        onOpenMail={() => {
          wiiSound.confirm();
          setMailOpen(true);
        }}
      />

      <ChannelDialog
        channel={pending}
        onCancel={() => setPending(null)}
        onConfirm={openChannel}
      />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <MessageBoard
        open={mailOpen}
        onClose={() => setMailOpen(false)}
        onRead={() => setUnread(0)}
      />

      <AnimatePresence>
        {zooming ? (
          <m.div
            key={zooming.id}
            layoutId={`wii-channel-${zooming.id}`}
            style={{
              position: "fixed",
              inset: "8%",
              zIndex: 70,
              borderRadius: 16,
              background: zooming.accent ?? "#eef2f6",
              border: "3px solid #3fa9e0",
              boxShadow: "0 0 40px rgb(63 169 224 / 0.45)",
              overflow: "hidden",
            }}
            animate={{ inset: "0%", borderRadius: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            {zooming.preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={zooming.preview}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
