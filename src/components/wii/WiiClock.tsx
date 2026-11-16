"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** 7-segment clock above the dock dip; date sits in the grey bar. */
export function WiiClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [colonOn, setColonOn] = useState(true);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => {
      const d = new Date();
      setNow(d);
      setColonOn((v) => !v);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="wii-clock" aria-hidden>
        <div className="wii-clock__time">
          <span className="wii-clock__digits">
            --
            <span className="wii-clock__colon">:</span>
            --
          </span>
          <span className="wii-clock__ampm">--</span>
        </div>
        <div className="wii-clock__date">--- --/--</div>
      </div>
    );
  }

  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "PM" : "AM";

  return (
    <div className="wii-clock" aria-live="polite">
      <div className="wii-clock__time">
        <span className="wii-clock__digits">
          {hours12}
          <span className="wii-clock__colon" data-on={colonOn ? "true" : "false"} aria-hidden>
            :
          </span>
          {pad(now.getMinutes())}
        </span>
        <span className="wii-clock__ampm">{ampm}</span>
      </div>
      <div className="wii-clock__date">
        {DAYS[now.getDay()]} {now.getDate()}/{now.getMonth() + 1}
      </div>
    </div>
  );
}
