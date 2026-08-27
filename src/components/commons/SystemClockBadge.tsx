import React, { useEffect, useMemo, useState } from "react";

import { useSystem } from "../../context/SystemContext";

export const SystemClockBadge: React.FC = () => {
  const { theme } = useSystem();

  const isLight = theme === "light";

  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  const timeZone = useMemo(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  }, []);

  const timeFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, [timeZone]);

  const mobileTimeFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [timeZone]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const fullTime = timeFormatter.format(currentTime);

  const compactTime = mobileTimeFormatter.format(currentTime);

  const city = timeZone.split("/").pop()?.replaceAll("_", " ") ?? "UTC";

  return (
    <div
      className={`
        inline-flex
        h-11
        shrink-0
        items-center
        gap-2
        whitespace-nowrap
        rounded-2xl
        border
        px-3
        font-mono
        transition-colors
        backdrop-blur-md

        ${
          isLight
            ? `
              border-slate-300
              bg-white/80
              text-slate-700
              shadow-sm
            `
            : `
              border-dark-border
              bg-navy-base/70
              text-slate-300
              shadow-lg
              shadow-black/20
            `
        }
      `}
      title={`Local timezone: ${timeZone}`}
      aria-label={`Local time ${fullTime}, timezone ${city}`}
    >
      {/* Status indicator */}
      <span
        aria-hidden="true"
        className="
          h-2
          w-2
          shrink-0
          rounded-full
          bg-accent-blue
          motion-safe:animate-pulse
        "
      />

      {/* Desktop/tablet label */}
      <span
        aria-hidden="true"
        className="
          hidden
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-accent-blue

          sm:inline
        "
      >
        TIME:
      </span>

      {/* Mobile clock */}
      <span
        aria-hidden="true"
        className="
          text-xs
          font-semibold
          tracking-wide

          sm:hidden
        "
      >
        {compactTime}
      </span>

      {/* Desktop clock */}
      <span
        aria-hidden="true"
        className="
          hidden
          text-xs
          font-semibold
          tracking-wider

          sm:inline
        "
      >
        {fullTime}
      </span>

      {/* Timezone - desktop only */}
      <span
        aria-hidden="true"
        className={`
          hidden
          text-xs

          md:inline

          ${isLight ? "text-slate-500" : "text-slate-400"}
        `}
      >
        ({city})
      </span>
    </div>
  );
};
