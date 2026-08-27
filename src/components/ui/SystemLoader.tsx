import React, { useCallback, useEffect, useRef, useState } from "react";

import { useSystem } from "../../context/SystemContext";

interface SystemLoaderProps {
  onLoadComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING PORTFOLIO RUNTIME...",
  "LOADING UI CONFIGURATION...",
  "RESTORING SYSTEM PREFERENCES...",
  "MOUNTING PROJECT MODULE...",
  "MOUNTING EXPERIENCE MODULE...",
  "MOUNTING SKILLS MODULE...",
  "VERIFYING INTERFACE COMPONENTS...",
  "SYSTEM READY. LAUNCHING INTERFACE...",
];

const PROGRESS_INTERVAL = 90;
const LOG_INTERVAL = 180;
const COMPLETION_DELAY = 300;

export const SystemLoader: React.FC<SystemLoaderProps> = ({
  onLoadComplete,
}) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const { theme } = useSystem();

  const isLight = theme === "light";

  const logsEndRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  /**
   * Menjamin callback selesai hanya dijalankan satu kali.
   *
   * Ini penting karena loader dapat selesai melalui:
   * 1. Progress mencapai 100%
   * 2. Tombol Skip
   * 3. Tombol Escape
   */
  const completeLoading = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }

    onLoadComplete();
  }, [onLoadComplete]);

  /**
   * Menjaga log terbaru tetap terlihat.
   *
   * Tidak menggunakan smooth scrolling karena perubahan log
   * terjadi cukup cepat dan smooth scrolling dapat menghasilkan
   * motion yang tidak diperlukan.
   */
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
  }, [currentLogIndex]);

  /**
   * Boot sequence.
   */
  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((previousProgress) => {
        const nextProgress = Math.min(previousProgress + 5, 100);

        if (nextProgress === 100) {
          window.clearInterval(progressTimer);

          completionTimeoutRef.current = setTimeout(() => {
            completeLoading();
          }, COMPLETION_DELAY);
        }

        return nextProgress;
      });
    }, PROGRESS_INTERVAL);

    const logTimer = window.setInterval(() => {
      setCurrentLogIndex((previousIndex) => {
        if (previousIndex >= BOOT_LOGS.length - 1) {
          window.clearInterval(logTimer);

          return previousIndex;
        }

        return previousIndex + 1;
      });
    }, LOG_INTERVAL);

    /**
     * Keyboard shortcut untuk melewati loader.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        completeLoading();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(logTimer);

      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [completeLoading]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="system-loader-title"
      aria-describedby="system-loader-description"
      className={`
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        p-4
        font-mono
        transition-colors
        duration-300

        ${
          isLight
            ? "bg-slate-100/95 backdrop-blur-md"
            : "bg-dark-bg/95 backdrop-blur-md"
        }
      `}
    >
      <div
        className={`
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          border
          p-5
          shadow-2xl
          transition-colors

          sm:p-6

          ${
            isLight
              ? "border-slate-300 bg-white"
              : "border-dark-border bg-dark-card"
          }
        `}
      >
        {/* Decorative scanline */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-linear-to-b
            from-transparent
            via-accent-blue/5
            to-transparent
            motion-safe:animate-pulse
          "
        />

        {/* Header */}
        <div
          className={`
            relative
            flex
            items-center
            justify-between
            gap-4
            border-b
            pb-3
            transition-colors

            ${isLight ? "border-slate-200" : "border-dark-border"}
          `}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                bg-emerald-500
                motion-safe:animate-pulse
              "
            />

            <span
              id="system-loader-title"
              className="
                truncate
                text-xs
                font-semibold
                uppercase
                tracking-widest
                text-accent-blue

                sm:text-sm
              "
            >
              // SYS_KERNEL_BOOT
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={completeLoading}
              className={`
                min-h-9
                rounded-md
                px-2
                text-xs
                font-medium
                transition-colors

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-blue
                focus-visible:ring-offset-2

                ${
                  isLight
                    ? `
                      text-slate-600
                      hover:bg-slate-100
                      hover:text-slate-900
                      focus-visible:ring-offset-white
                    `
                    : `
                      text-slate-300
                      hover:bg-dark-border/50
                      hover:text-white
                      focus-visible:ring-offset-dark-card
                    `
                }
              `}
              aria-label="Skip system loading sequence"
            >
              Skip
              <span className="ml-1 hidden sm:inline">[ESC]</span>
            </button>

            <span
              className={`
                min-w-10
                text-right
                text-xs
                font-semibold

                ${isLight ? "text-slate-800" : "text-slate-100"}
              `}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Screen-reader description */}
        <p id="system-loader-description" className="sr-only">
          Portfolio interface is currently loading. You can skip the loading
          sequence using the Skip button or Escape key.
        </p>

        {/* Terminal logs */}
        <div
          className={`
            relative
            mt-5
            h-36
            overflow-y-auto
            rounded-xl
            border
            p-3
            text-left

            scrollbar-none
            [&::-webkit-scrollbar]:hidden

            ${
              isLight
                ? `
                  border-slate-200
                  bg-slate-50
                  text-slate-700
                `
                : `
                  border-dark-border
                  bg-navy-base/60
                  text-slate-300
                `
            }
          `}
          aria-live="polite"
          aria-atomic="false"
        >
          <p
            className={`
              mb-2
              text-xs

              ${isLight ? "text-slate-500" : "text-slate-400"}
            `}
          >
            $ initializing portfolio core system...
          </p>

          <div className="flex flex-col gap-1.5">
            {BOOT_LOGS.slice(0, currentLogIndex + 1).map((log, index) => {
              const isCurrentLog = index === currentLogIndex;

              return (
                <p
                  key={log}
                  className="
                      flex
                      items-start
                      gap-2
                      text-xs
                      leading-5
                    "
                >
                  <span
                    aria-hidden="true"
                    className="
                        shrink-0
                        text-accent-blue
                      "
                  >
                    ❯
                  </span>

                  <span
                    className={
                      isCurrentLog
                        ? `
                            font-medium
                            text-emerald-500
                          `
                        : isLight
                          ? "text-slate-600"
                          : "text-slate-300"
                    }
                  >
                    {log}
                  </span>
                </p>
              );
            })}
          </div>

          <div ref={logsEndRef} aria-hidden="true" />
        </div>

        {/* Progress */}
        <div className="relative mt-5">
          <div
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress} percent loaded`}
            className={`
              h-2.5
              w-full
              overflow-hidden
              rounded-full
              border
              p-0.5

              ${
                isLight
                  ? `
                    border-slate-300
                    bg-slate-100
                  `
                  : `
                    border-dark-border
                    bg-dark-border/40
                  `
              }
            `}
          >
            <div
              className="
                h-full
                rounded-full
                bg-accent-blue
                shadow-[0_0_12px_rgba(59,130,246,0.55)]
                transition-[width]
                duration-100
                ease-out
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`
            relative
            mt-4
            flex
            flex-col
            gap-2
            text-xs
            uppercase
            tracking-wide

            sm:flex-row
            sm:items-center
            sm:justify-between

            ${isLight ? "text-slate-500" : "text-slate-400"}
          `}
        >
          <span>Runtime: React + Vite</span>

          <span className="font-medium text-emerald-500">
            <span aria-hidden="true">●</span> INTERFACE_READY
          </span>
        </div>
      </div>
    </div>
  );
};
