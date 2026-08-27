import React from "react";
import { SITE_CONFIG } from "../../constants/siteConfig";
import { GithubIcon, LinkedinIcon, MailIcon } from "../ui/Icons";
import { useSystem } from "../../context/SystemContext";

export const ProfileSidebar: React.FC = () => {
  const { theme, systemLang, requestExternalUrl } = useSystem();

  const isLight = theme === "light";

  return (
    <aside
      aria-labelledby="profile-name"
      className={`
        flex
        flex-col
        justify-between
        rounded-2xl
        border
        p-6
        transition-colors
        duration-300

        sm:p-8

        lg:col-span-4

        ${
          isLight
            ? `
              border-slate-200
              bg-slate-50
            `
            : `
              border-dark-border
              bg-navy-base/60
            `
        }
      `}
    >
      <div>
        {/* =================================================
            PROFILE HEADER
        ================================================== */}
        <div
          className="
            mb-7
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <span
            aria-hidden="true"
            className="
              font-mono
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-accent-blue
            "
          >
            01 // ID CARD
          </span>

          {/* Availability status */}
          <span
            className={`
              inline-flex
              shrink-0
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

            {systemLang.profileSidebar.status}
          </span>
        </div>

        {/* =================================================
            PROFILE IMAGE
        ================================================== */}
        <div
          className={`
            mx-auto
            my-6
            flex
            h-28
            w-28
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            p-2
            shadow-inner
            transition-colors

            ${
              isLight
                ? `
                  border-slate-200
                  bg-white
                `
                : `
                  border-dark-border
                  bg-dark-border/40
                `
            }
          `}
        >
          <img
            src="https://avatars.githubusercontent.com/u/121325523?v=4"
            alt={`Portrait of ${SITE_CONFIG.name}`}
            width={112}
            height={112}
            loading="eager"
            decoding="async"
            className="
              h-full
              w-full
              rounded-xl
              object-cover
            "
          />
        </div>

        {/* =================================================
            PROFILE INFORMATION
        ================================================== */}
        <div className="mt-6 text-center">
          <h2
            id="profile-name"
            className={`
              text-lg
              font-semibold
              leading-7
              transition-colors

              ${isLight ? "text-slate-950" : "text-slate-100"}
            `}
          >
            {SITE_CONFIG.name}
          </h2>

          <p
            className={`
              mt-2
              text-sm
              leading-6

              ${isLight ? "text-slate-600" : "text-slate-300"}
            `}
          >
            {SITE_CONFIG.role}

            <span
              className="
                ml-1
                font-mono
                text-xs
                font-medium
                text-accent-blue
              "
            >
              @{SITE_CONFIG.current_company}
            </span>
          </p>

          <p
            className={`
              mt-1
              text-sm
              leading-6

              ${isLight ? "text-slate-600" : "text-slate-400"}
            `}
          >
            {SITE_CONFIG.location}
          </p>
        </div>
      </div>

      {/* =================================================
          SOCIAL LINKS
      ================================================== */}
      <nav
        aria-label="Social profiles"
        className={`
          mt-7
          flex
          items-center
          justify-center
          gap-2
          border-t
          pt-6
          transition-colors

          ${isLight ? "border-slate-200" : "border-dark-border/60"}
        `}
      >
        {/* GitHub */}
        <button
          type="button"
          onClick={() => requestExternalUrl(SITE_CONFIG.social.github)}
          aria-label={`Open ${SITE_CONFIG.name}'s GitHub profile`}
          title="GitHub"
          className={`
            inline-flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-xl
            transition-colors

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-blue
            focus-visible:ring-offset-2

            ${
              isLight
                ? `
                  text-slate-600
                  hover:bg-slate-200
                  hover:text-slate-950
                  focus-visible:ring-offset-slate-50
                `
                : `
                  text-slate-400
                  hover:bg-dark-border/60
                  hover:text-slate-100
                  focus-visible:ring-offset-navy-base
                `
            }
          `}
        >
          <GithubIcon aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => requestExternalUrl(SITE_CONFIG.social.linkedin)}
          aria-label={`Open ${SITE_CONFIG.name}'s LinkedIn profile`}
          title="LinkedIn"
          className={`
            inline-flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-xl
            transition-colors

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-blue
            focus-visible:ring-offset-2

            ${
              isLight
                ? `
                  text-slate-600
                  hover:bg-slate-200
                  hover:text-accent-blue
                  focus-visible:ring-offset-slate-50
                `
                : `
                  text-slate-400
                  hover:bg-dark-border/60
                  hover:text-accent-blue
                  focus-visible:ring-offset-navy-base
                `
            }
          `}
        >
          <LinkedinIcon aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Email */}
        <button
          type="button"
          onClick={() =>
            requestExternalUrl(`mailto:${SITE_CONFIG.social.email}`)
          }
          aria-label={`Send email to ${SITE_CONFIG.name}`}
          title="Email"
          className={`
            inline-flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-xl
            transition-colors

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-blue
            focus-visible:ring-offset-2

            ${
              isLight
                ? `
                  text-slate-600
                  hover:bg-slate-200
                  hover:text-slate-950
                  focus-visible:ring-offset-slate-50
                `
                : `
                  text-slate-400
                  hover:bg-dark-border/60
                  hover:text-slate-100
                  focus-visible:ring-offset-navy-base
                `
            }
          `}
        >
          <MailIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </nav>
    </aside>
  );
};
