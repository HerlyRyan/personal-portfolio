import React, { useId, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { SITE_METADATA } from "../../constants/siteConfig";
import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface AboutModalProps {
  isOpen: boolean;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen }) => {
  const { theme, closeModal, systemLang } = useSystem();

  const isLight = theme === "light";
  const shouldReduceMotion = useReducedMotion();

  const t = systemLang.aboutModal;

  const titleId = useId();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [hasImageError, setHasImageError] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    closeModal("~/sys/home");
  };

  const entranceAnimation = shouldReduceMotion
    ? {
        initial: false as const,
        animate: {
          opacity: 1,
          y: 0,
        },
        transition: {
          duration: 0,
        },
      }
    : {
        initial: {
          opacity: 0,
          y: 12,
        },
        animate: {
          opacity: 1,
          y: 0,
        },
        transition: {
          duration: 0.25,
          ease: "easeOut" as const,
        },
      };

  return (
    <ModalContainer onClose={handleClose} titleId={titleId}>
      {/* =================================================
          MODAL HEADER
      ================================================== */}

      <ModalHeader title={t.title} titleId={titleId} onClose={handleClose} />

      {/* =================================================
          MODAL BODY
      ================================================== */}

      <div
        className="
          custom-scrollbar
          min-h-0
          flex-1
          space-y-5
          overflow-y-auto
          p-4

          sm:p-6
        "
      >
        {/* =================================================
            HERO / IDENTITY
        ================================================== */}

        <motion.section
          {...entranceAnimation}
          aria-labelledby="about-profile-name"
          className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            transition-colors

            ${
              isLight
                ? `
                  border-slate-200
                  bg-slate-50
                  shadow-sm
                `
                : `
                  border-dark-border
                  bg-linear-to-br
                  from-[#1c2230]
                  to-[#121824]
                `
            }
          `}
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-7
              p-5

              sm:p-7

              lg:flex-row
              lg:items-center
              lg:p-8
            "
          >
            {/* =============================================
                IDENTITY CONTENT
            ============================================== */}

            <div
              className="
                z-10
                w-full
                flex-1
                space-y-4
                text-center

                lg:text-left
              "
            >
              {/* Availability */}
              <div
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-3
                  py-1.5
                  font-mono
                  text-xs
                  font-medium

                  ${
                    isLight
                      ? `
                        border-emerald-600/30
                        bg-emerald-50
                        text-emerald-700
                      `
                      : `
                        border-emerald-500/30
                        bg-emerald-500/10
                        text-emerald-400
                      `
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-500
                    motion-safe:animate-pulse
                  "
                />

                {t.availability}
              </div>

              {/* Name */}
              <div className="space-y-2">
                <h2
                  id="about-profile-name"
                  className={`
                    text-3xl
                    font-extrabold
                    leading-tight
                    tracking-tight

                    sm:text-4xl

                    lg:text-5xl

                    ${isLight ? "text-slate-950" : "text-slate-100"}
                  `}
                >
                  {SITE_METADATA.name}
                </h2>

                <span
                  aria-hidden="true"
                  className="
                    mx-auto
                    block
                    h-1
                    w-10
                    rounded-full
                    bg-accent-blue

                    lg:mx-0
                  "
                />

                <p
                  className="
                    font-mono
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-accent-blue
                  "
                >
                  {t.role}
                  <span aria-hidden="true" className="mx-1.5">
                    —
                  </span>
                  {t.location}
                </p>
              </div>

              {/* Introduction */}
              <p
                className={`
                  mx-auto
                  max-w-xl
                  text-sm
                  leading-7

                  sm:text-base

                  lg:mx-0

                  ${isLight ? "text-slate-700" : "text-slate-300"}
                `}
              >
                {t.introduction}
              </p>
            </div>

            {/* =============================================
                PROFILE IMAGE
            ============================================== */}

            <div
              className={`
                relative
                mx-auto
                flex
                h-72
                w-52
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                shadow-xl

                sm:h-80
                sm:w-60

                lg:mx-0

                ${
                  isLight
                    ? `
                      border-slate-300
                      bg-slate-200
                    `
                    : `
                      border-slate-700/50
                      bg-[#252c3c]
                    `
                }
              `}
            >
              {/* =========================================
                  SKELETON
              ========================================== */}

              {SITE_METADATA.avatarUrl && !isImageLoaded && !hasImageError && (
                <div
                  aria-hidden="true"
                  className={`
                      absolute
                      inset-0
                      z-10
                      overflow-hidden

                      ${isLight ? "bg-slate-200" : "bg-dark-border"}
                    `}
                >
                  {/* Skeleton head */}
                  <div
                    className={`
                        absolute
                        left-1/2
                        top-[16%]
                        h-24
                        w-24
                        -translate-x-1/2
                        rounded-full

                        motion-safe:animate-pulse

                        ${isLight ? "bg-slate-300" : "bg-slate-700/70"}
                      `}
                  />

                  {/* Skeleton body */}
                  <div
                    className={`
                        absolute
                        bottom-0
                        left-1/2
                        h-[55%]
                        w-[85%]
                        -translate-x-1/2
                        rounded-t-[45%]

                        motion-safe:animate-pulse

                        ${isLight ? "bg-slate-300" : "bg-slate-700/70"}
                      `}
                  />

                  {/* Loading label */}
                  <span
                    className={`
                        absolute
                        bottom-4
                        left-1/2
                        z-20
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-md
                        px-2
                        py-1
                        font-mono
                        text-xs
                        font-medium

                        ${
                          isLight
                            ? `
                              bg-white/80
                              text-slate-600
                            `
                            : `
                              bg-black/30
                              text-slate-300
                            `
                        }
                      `}
                  >
                    [LOADING PROFILE]
                  </span>
                </div>
              )}

              {/* =========================================
                  PROFILE IMAGE
              ========================================== */}

              {SITE_METADATA.avatarUrl && !hasImageError ? (
                <>
                  <img
                    src={SITE_METADATA.avatarUrl}
                    alt={`Portrait of ${SITE_METADATA.name}`}
                    width={240}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsImageLoaded(true)}
                    onError={() => {
                      setHasImageError(true);
                      setIsImageLoaded(false);
                    }}
                    className={`
                      h-full
                      w-full
                      object-cover
                      transition-opacity

                      ${isImageLoaded ? "opacity-100" : "opacity-0"}
                    `}
                    style={{
                      objectPosition: "center top",

                      transitionDuration: shouldReduceMotion ? "0ms" : "300ms",
                    }}
                  />

                  {/* Subtle gradient for readability */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/20
                      via-transparent
                      to-transparent
                    "
                  />
                </>
              ) : (
                /* =======================================
                   IMAGE FALLBACK
                ======================================== */
                <div
                  className="
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    p-6
                    text-center
                  "
                >
                  <span aria-hidden="true" className="text-5xl">
                    👨‍💻
                  </span>

                  <p
                    className={`
                      font-mono
                      text-xs
                      font-medium
                      tracking-wider

                      ${isLight ? "text-slate-600" : "text-slate-400"}
                    `}
                  >
                    [PROFILE IMAGE UNAVAILABLE]
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* =================================================
            INFORMATION GRID
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-2
          "
        >
          {/* =================================================
              BIOGRAPHY
          ================================================== */}

          <motion.section
            {...entranceAnimation}
            aria-labelledby="about-background-title"
            className={`
              flex
              flex-col
              justify-center
              rounded-3xl
              border
              p-5
              transition-colors

              sm:p-6

              ${
                isLight
                  ? `
                    border-slate-200
                    bg-slate-50
                    shadow-sm
                  `
                  : `
                    border-dark-border
                    bg-navy-base/40
                  `
              }
            `}
          >
            <h3
              id="about-background-title"
              className="
                mb-4
                flex
                items-center
                gap-2.5
                font-mono
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-accent-blue
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  bg-accent-blue
                "
              />

              {t.backgroundTitle}
            </h3>

            <div
              className={`
                space-y-3
                text-sm
                leading-7

                ${isLight ? "text-slate-800" : "text-slate-300"}
              `}
            >
              {t.biography.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.section>

          {/* =================================================
              PRINCIPLES
          ================================================== */}

          <motion.section
            {...entranceAnimation}
            aria-label="Professional principles"
            className="
              flex
              flex-col
              gap-3.5
            "
          >
            {t.principles.map((principle) => (
              <article
                key={principle.title}
                className={`
                    flex
                    flex-1
                    flex-col
                    justify-center
                    rounded-2xl
                    border
                    p-4
                    transition-colors

                    sm:p-5

                    ${
                      isLight
                        ? `
                          border-slate-200
                          bg-slate-50
                          shadow-sm

                          hover:bg-white
                          hover:border-accent-blue/40
                        `
                        : `
                          border-dark-border
                          bg-navy-base/50

                          hover:border-accent-blue/40
                          hover:bg-accent-blue/10
                        `
                    }
                  `}
              >
                <h3
                  className={`
                      mb-1.5
                      text-sm
                      font-semibold

                      sm:text-base

                      ${isLight ? "text-slate-950" : "text-slate-100"}
                    `}
                >
                  {principle.title}
                </h3>

                <p
                  className={`
                      text-sm
                      leading-6

                      ${isLight ? "text-slate-700" : "text-slate-400"}
                    `}
                >
                  {principle.description}
                </p>
              </article>
            ))}
          </motion.section>
        </div>
      </div>
    </ModalContainer>
  );
};
