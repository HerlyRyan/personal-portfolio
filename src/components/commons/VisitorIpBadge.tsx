/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";

import { useSystem } from "../../context/SystemContext";

const DEFAULT_VISITOR_NAME = "Guest";
const MAX_VISITOR_NAME_LENGTH = 24;

export const VisitorIpBadge: React.FC = () => {
  const { theme } = useSystem();

  const isLight = theme === "light";

  const [visitorName, setVisitorName] = useState<string>(DEFAULT_VISITOR_NAME);

  const [tempName, setTempName] = useState<string>("");

  const [latency, setLatency] = useState<number | null>(null);

  const [isEditingName, setIsEditingName] = useState(false);

  const [networkStatus, setNetworkStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Restore visitor alias from localStorage.
   */
  useEffect(() => {
    const savedName = localStorage.getItem("sys_visitor_name");

    if (savedName?.trim()) {
      setVisitorName(savedName.trim());
    }
  }, []);

  /**
   * Measure HTTP request latency.
   *
   * Important:
   * this is NOT ICMP ping.
   * It measures approximately how long a small HTTP
   * request takes from the browser.
   */
  useEffect(() => {
    const controller = new AbortController();

    const checkNetwork = async () => {
      const startTime = performance.now();

      try {
        await fetch("https://api.ipify.org?format=json", {
          signal: controller.signal,
          cache: "no-store",
        });

        const duration = performance.now() - startTime;

        setLatency(Math.round(duration));

        setNetworkStatus("online");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLatency(null);
        setNetworkStatus("offline");
      }
    };

    void checkNetwork();

    return () => {
      controller.abort();
    };
  }, []);

  /**
   * Focus input immediately when edit mode opens.
   */
  useEffect(() => {
    if (!isEditingName) {
      return;
    }

    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditingName]);

  const handleStartEditing = () => {
    setTempName(visitorName);
    setIsEditingName(true);
  };

  const handleCancelEditing = () => {
    setTempName("");
    setIsEditingName(false);
  };

  const handleSaveName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = tempName.trim();

    if (normalizedName) {
      setVisitorName(normalizedName);

      localStorage.setItem("sys_visitor_name", normalizedName);
    }

    setIsEditingName(false);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleCancelEditing();
    }
  };

  const networkLabel =
    networkStatus === "checking"
      ? "Checking"
      : networkStatus === "online"
        ? "Online"
        : "Offline";

  return (
    <div
      className={`
        inline-flex
        max-w-full
        items-center
        gap-2
        rounded-2xl
        border
        px-3
        py-1.5
        font-mono
        text-xs
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
      aria-label={`System network ${networkLabel}. Visitor ${visitorName}${
        latency !== null ? `. Request latency ${latency} milliseconds` : ""
      }`}
    >
      {/* =================================================
          NETWORK STATUS
      ================================================== */}
      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-2
            w-2
            rounded-full

            ${
              networkStatus === "offline"
                ? "bg-red-500"
                : networkStatus === "checking"
                  ? "bg-amber-500 motion-safe:animate-pulse"
                  : "bg-emerald-500"
            }
          `}
        />

        <span
          aria-hidden="true"
          className="
            hidden
            font-semibold
            uppercase
            tracking-wider
            text-accent-blue

            sm:inline
          "
        >
          SYS_NET
        </span>
      </div>

      {/* Divider */}
      <span
        aria-hidden="true"
        className={`
          hidden
          h-4
          w-px

          sm:block

          ${isLight ? "bg-slate-300" : "bg-dark-border"}
        `}
      />

      {/* =================================================
          VISITOR ALIAS
      ================================================== */}
      <div
        className="
          flex
          min-w-0
          items-center
          gap-1.5
        "
      >
        <span
          className={`
            hidden

            sm:inline

            ${isLight ? "text-slate-500" : "text-slate-400"}
          `}
        >
          user:
        </span>

        {isEditingName ? (
          <form
            onSubmit={handleSaveName}
            className="
              flex
              items-center
              gap-1
            "
          >
            <label htmlFor="visitor-name" className="sr-only">
              Visitor name
            </label>

            <input
              ref={inputRef}
              id="visitor-name"
              type="text"
              value={tempName}
              maxLength={MAX_VISITOR_NAME_LENGTH}
              onChange={(event) => setTempName(event.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={() => setIsEditingName(false)}
              className={`
                h-8
                w-24
                rounded-md
                border
                px-2
                font-mono
                text-xs

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-blue

                ${
                  isLight
                    ? `
                      border-slate-300
                      bg-white
                      text-slate-950
                    `
                    : `
                      border-dark-border
                      bg-dark-card
                      text-slate-100
                    `
                }
              `}
            />
          </form>
        ) : (
          <button
            type="button"
            onClick={handleStartEditing}
            className="
              inline-flex
              min-h-8
              max-w-28
              items-center
              truncate
              rounded-md
              px-1
              font-semibold
              text-accent-blue
              transition-colors

              hover:underline

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-blue
              focus-visible:ring-offset-2
            "
            aria-label={`Edit visitor name. Current name: ${visitorName}`}
            title="Edit visitor name"
          >
            @{visitorName}
          </button>
        )}
      </div>

      {/* =================================================
          NETWORK INFORMATION
      ================================================== */}
      <span
        aria-hidden="true"
        className={`
          hidden
          h-4
          w-px

          md:block

          ${isLight ? "bg-slate-300" : "bg-dark-border"}
        `}
      />

      <div
        className="
          hidden
          items-center
          gap-1.5

          md:flex
        "
      >
        <span className={isLight ? "text-slate-500" : "text-slate-400"}>
          net:
        </span>

        <span
          className={`
            font-semibold

            ${
              networkStatus === "offline"
                ? "text-red-500"
                : networkStatus === "checking"
                  ? "text-amber-500"
                  : "text-emerald-500"
            }
          `}
        >
          {networkLabel}
        </span>
      </div>

      {latency !== null && (
        <>
          <span
            aria-hidden="true"
            className={`
              hidden
              h-4
              w-px

              lg:block

              ${isLight ? "bg-slate-300" : "bg-dark-border"}
            `}
          />

          <div
            className="
              hidden
              items-center
              gap-1

              lg:flex
            "
          >
            <span className={isLight ? "text-slate-500" : "text-slate-400"}>
              latency:
            </span>

            <span className="font-semibold text-emerald-500">{latency}ms</span>
          </div>
        </>
      )}
    </div>
  );
};
