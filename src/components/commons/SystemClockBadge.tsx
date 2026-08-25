/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { useSystem } from "../../context/SystemContext";

export const SystemClockBadge: React.FC = () => {
  const { theme } = useSystem();
  const isLight = theme === "light";

  const [timeString, setTimeString] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("UTC");

  useEffect(() => {
    // Mendapatkan zona waktu lokal perangkat user secara global
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    setTimeZone(detectedTimeZone);

    const updateClock = () => {
      const now = new Date();
      // Format jam sesuai zona waktu user (format 24 Jam dengan Detik)
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: detectedTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      setTimeString(formatted);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`px-3 py-1.5 rounded-2xl border flex items-center gap-2 transition-all backdrop-blur-md font-mono text-xs ${
        isLight
          ? "bg-slate-100/80 border-slate-200/80 text-slate-700 shadow-xs"
          : "bg-navy-base/60 border-dark-border/80 text-slate-300 shadow-lg shadow-black/20"
      }`}
      title={`Local Timezone: ${timeZone}`}
    >
      <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse shrink-0" />
      <span className="text-[10px] font-semibold text-accent-blue uppercase tracking-wider">
        TIME:
      </span>
      <span className="font-bold tracking-wider">
        {timeString || "00:00:00"}
      </span>
      <span className="text-[9px] opacity-60 hidden sm:inline">
        ({timeZone.split("/").pop()?.replace("_", " ")})
      </span>
    </div>
  );
};