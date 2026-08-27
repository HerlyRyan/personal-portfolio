/* eslint-disable react-refresh/only-export-components */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { id } from "../locales/id";
import { en } from "../locales/en";

export type Language = "EN" | "ID";
export type Theme = "dark" | "light";

export type ModalType = "projects" | "experience" | "skills" | "about" | null;

type OpenableModal = Exclude<ModalType, null>;

interface SystemContextType {
  lang: Language;
  toggleLang: () => void;

  theme: Theme;
  toggleTheme: () => void;

  systemLang: typeof id;

  activeModal: ModalType;
  loadingPath: string | null;

  openModal: (id: OpenableModal, path: string) => void;

  closeModal: (exitPath?: string) => void;

  confirmUrl: string | null;

  requestExternalUrl: (url: string) => void;

  clearExternalUrl: () => void;
}

interface SystemProviderProps {
  children: React.ReactNode;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const DEFAULT_LANGUAGE: Language = "EN";
const DEFAULT_THEME: Theme = "dark";

const MODAL_OPEN_DELAY = 500;
const MODAL_CLOSE_DELAY = 400;

const isValidLanguage = (value: string | null): value is Language => {
  return value === "EN" || value === "ID";
};

const isValidTheme = (value: string | null): value is Theme => {
  return value === "dark" || value === "light";
};

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem("sys_lang");

  if (isValidLanguage(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage =
    navigator.languages?.[0] ?? navigator.language ?? "en";

  return browserLanguage.toLowerCase().startsWith("id")
    ? "ID"
    : DEFAULT_LANGUAGE;
};

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("sys_theme");

  if (isValidTheme(savedTheme)) {
    return savedTheme;
  }

  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  return prefersLight ? "light" : DEFAULT_THEME;
};

export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const [confirmUrl, setConfirmUrl] = useState<string | null>(null);

  /*
   * Menandai bahwa modal sedang ditutup karena browser
   * Back / gesture navigation.
   */
  const closingViaPopState = useRef(false);

  /*
   * Menyimpan timer supaya bisa dibersihkan jika
   * component unmount atau user melakukan aksi lain.
   */
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Menyimpan element yang mempunyai focus sebelum
   * modal dibuka.
   *
   * Nantinya focus bisa dikembalikan ketika modal
   * selesai ditutup.
   */
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const clearNavigationTimer = useCallback(() => {
    if (!navigationTimerRef.current) {
      return;
    }

    clearTimeout(navigationTimerRef.current);

    navigationTimerRef.current = null;
  }, []);

  /*
   * =====================================================
   * LANGUAGE
   * =====================================================
   */

  useEffect(() => {
    localStorage.setItem("sys_lang", lang);

    /*
     * Accessibility:
     * screen reader menggunakan atribut lang
     * untuk menentukan pronunciation.
     */
    document.documentElement.lang = lang === "ID" ? "id" : "en";
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((previousLanguage) => (previousLanguage === "EN" ? "ID" : "EN"));
  }, []);

  /*
   * =====================================================
   * THEME
   * =====================================================
   */

  useEffect(() => {
    localStorage.setItem("sys_theme", theme);

    document.documentElement.classList.toggle("light-theme", theme === "light");

    /*
     * Memberi tahu browser mengenai color scheme.
     *
     * Ini juga membantu browser-native UI seperti
     * form controls dan scrollbar.
     */
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add("theme-switching");

    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-switching");
      });
    });
  }, []);

  /*
   * =====================================================
   * TRANSLATION
   * =====================================================
   */

  const systemLang = lang === "ID" ? id : en;

  /*
   * =====================================================
   * MODAL NAVIGATION
   * =====================================================
   */

  const openModal = useCallback(
    (modalId: OpenableModal, path: string) => {
      /*
       * Mencegah multiple navigation timer ketika
       * user melakukan double-click.
       */
      clearNavigationTimer();

      /*
       * Simpan button/link yang membuka modal.
       */
      if (document.activeElement instanceof HTMLElement) {
        previousFocusedElementRef.current = document.activeElement;
      }

      setLoadingPath(path);

      navigationTimerRef.current = setTimeout(() => {
        setLoadingPath(null);
        setActiveModal(modalId);

        navigationTimerRef.current = null;
      }, MODAL_OPEN_DELAY);
    },
    [clearNavigationTimer],
  );

  const closeModal = useCallback(
    (exitPath: string = "~/sys/home") => {
      clearNavigationTimer();

      setLoadingPath(exitPath);

      navigationTimerRef.current = setTimeout(() => {
        setLoadingPath(null);
        setActiveModal(null);

        /*
         * Setelah modal benar-benar tertutup,
         * kembalikan keyboard focus ke element
         * yang sebelumnya membuka modal.
         */
        requestAnimationFrame(() => {
          previousFocusedElementRef.current?.focus();

          previousFocusedElementRef.current = null;
        });

        navigationTimerRef.current = null;
      }, MODAL_CLOSE_DELAY);

      /*
       * Jika close terjadi akibat popstate,
       * browser sudah memindahkan history.
       *
       * Jangan menjalankan history.back()
       * untuk kedua kalinya.
       */
      if (closingViaPopState.current) {
        closingViaPopState.current = false;
        return;
      }

      /*
       * Jika modal ditutup dari tombol X,
       * backdrop, Escape, dll,
       * buang history entry modal.
       */
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    },
    [clearNavigationTimer],
  );

  /*
   * =====================================================
   * BROWSER HISTORY
   * =====================================================
   */

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    /*
     * Hindari push entry modal berulang jika
     * state yang aktif sudah merupakan modal.
     */
    if (!window.history.state?.modalOpen) {
      window.history.pushState(
        {
          modalOpen: true,
          modal: activeModal,
        },
        "",
      );
    }

    const handlePopState = () => {
      /*
       * Kalau modal sudah tidak ada,
       * tidak perlu melakukan apa pun.
       */
      if (!activeModal) {
        return;
      }

      closingViaPopState.current = true;

      closeModal();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeModal, closeModal]);

  /*
   * Bersihkan timer ketika provider unmount.
   */
  useEffect(() => {
    return () => {
      clearNavigationTimer();
    };
  }, [clearNavigationTimer]);

  /*
   * =====================================================
   * EXTERNAL URL CONFIRMATION
   * =====================================================
   */

  const requestExternalUrl = useCallback((url: string) => {
    setConfirmUrl(url);
  }, []);

  const clearExternalUrl = useCallback(() => {
    setConfirmUrl(null);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        lang,
        toggleLang,

        theme,
        toggleTheme,

        systemLang,

        activeModal,
        loadingPath,
        openModal,
        closeModal,

        confirmUrl,
        requestExternalUrl,
        clearExternalUrl,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);

  if (!context) {
    throw new Error("useSystem must be used within a SystemProvider");
  }

  return context;
};
