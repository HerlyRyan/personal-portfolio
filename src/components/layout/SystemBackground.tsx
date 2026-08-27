import React from "react";
import { useSystem } from "../../context/SystemContext";
import { ClickRippleEffect } from "../ui/ClickRiplleEffect";

interface SystemBackgroundProps {
  children: React.ReactNode;
}

export const SystemBackground: React.FC<SystemBackgroundProps> = ({
  children,
}) => {
  const { theme } = useSystem();
  const isLight = theme === "light";

  return (
    <div
      className={`
        min-h-dvh
        w-full
        relative
        flex
        flex-col
        overflow-x-hidden

        ${isLight ? "bg-slate-100 text-slate-800" : "bg-dark-bg text-slate-100"}
      `}
    >
      <ClickRippleEffect>
        {/* Decorative grid background */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-[0.035]
            bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]
            bg-size-[32px_32px]
          "
        />

        {/* Decorative ambient glow */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              w-150
              h-150
              rounded-full
              bg-accent-blue/15
              blur-[150px]
              animate-orbitBlue
            "
          />

          <div
            className="
              absolute
              w-137.5
              h-137.5
              rounded-full
              bg-red-600/10
              blur-[160px]
              animate-orbitRed
            "
          />
        </div>

        {/* Main application content */}
        <div
          className="
            relative
            z-10
            min-h-dvh
            w-full
            flex
            flex-col
          "
        >
          {children}
        </div>
      </ClickRippleEffect>
    </div>
  );
};
