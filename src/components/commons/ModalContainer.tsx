import React, { useEffect, useRef } from "react";

import { useSystem } from "../../context/SystemContext";

interface ModalContainerProps {
  children: React.ReactNode;

  onClose: () => void;

  titleId: string;

  descriptionId?: string;
}

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  onClose,
  titleId,
  descriptionId,
}) => {
  const { theme } = useSystem();

  const isLight = theme === "light";

  const dialogRef = useRef<HTMLDivElement>(null);

  /**
   * =====================================================
   * MODAL ACCESSIBILITY
   * =====================================================
   *
   * Responsibilities:
   * - lock body scroll
   * - move focus into modal
   * - trap keyboard focus
   * - close using Escape
   */
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));

    /*
     * Tunggu DOM benar-benar selesai render,
     * lalu pindahkan focus ke interactive
     * element pertama.
     *
     * Pada struktur modal kita biasanya
     * elemen pertama adalah tombol Close.
     */
    const focusFrame = requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        dialog.focus();
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      /*
       * Escape
       */
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      /*
       * Focus Trap
       */
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();

        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);

      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    /*
     * Hanya close jika user benar-benar
     * mengklik backdrop.
     *
     * Click dari child modal tidak dianggap
     * sebagai backdrop click.
     */
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        p-3
        backdrop-blur-sm

        sm:p-4
      "
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={`
          relative
          flex
          max-h-[92dvh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          shadow-2xl
          transition-colors

          sm:rounded-3xl

          ${
            isLight
              ? `
                border-slate-300
                bg-white
                shadow-slate-300/50
              `
              : `
                border-dark-border
                bg-dark-card
                shadow-black/60
              `
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};
