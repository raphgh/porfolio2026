"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "America/Toronto";

function formatOttawaTime(date: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/\s/g, "")
    .toUpperCase();

  return `${time}, Ottawa, ON`;
}

/** Live Ottawa local time". */
export function LocalTime({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState(() => formatOttawaTime(new Date()));

  useEffect(() => {
    const tick = () => setLabel(formatOttawaTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={className} suppressHydrationWarning>
      {label}
    </p>
  );
}
