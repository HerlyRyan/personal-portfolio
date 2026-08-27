import React from "react";
import { SITE_CONFIG } from "../../constants/siteConfig";
import { VisitorIpBadge } from "../commons/VisitorIpBadge";
import { useSystem } from "../../context/SystemContext";

export const Footer: React.FC = () => {
  const { theme } = useSystem();

  const isLight = theme === "light";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`
        mx-auto
        mt-4
        flex
        w-full
        max-w-6xl
        flex-col
        items-center
        justify-between
        gap-3
        border-t
        px-4
        py-4
        font-mono
        text-xs
        transition-colors

        md:flex-row
        md:gap-4

        ${isLight ? "border-slate-300" : "border-dark-border"}
      `}
    >
      {/* Visitor / Network Status */}
      <div
        className="
          flex
          w-full
          justify-center

          md:w-auto
          md:justify-start
        "
      >
        <VisitorIpBadge />
      </div>

      {/* Copyright */}
      <p
        className={`
          text-center
          font-medium
          leading-5
          transition-colors

          ${isLight ? "text-slate-700" : "text-slate-400"}
        `}
      >
        © {currentYear}{" "}
        <span className={isLight ? "text-slate-900" : "text-slate-300"}>
          {SITE_CONFIG.name}
        </span>
        <span className="hidden sm:inline">. All rights reserved.</span>
      </p>

      {/* Tech Credit */}
      <p
        className={`
          text-center
          font-medium
          leading-5
          transition-colors

          md:text-right

          ${isLight ? "text-slate-700" : "text-slate-400"}
        `}
      >
        Built with{" "}
        <span className={isLight ? "text-slate-900" : "text-slate-300"}>
          React, Vite & Tailwind CSS
        </span>
      </p>
    </footer>
  );
};
