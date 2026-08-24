/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, startTransition } from 'react';
import { id } from '../locales/id';
import { en } from '../locales/en';

type Language = 'EN' | 'ID';
type Theme = 'dark' | 'light';
export type ModalType = "projects" | "experience" | "skills" | "about" | null;

interface SystemContextType {
  lang: Language;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  systemLang: typeof id;
  activeModal: ModalType;
  loadingPath: string | null;
  openModal: (id: ModalType, path: string) => void;
  closeModal: (exitPath?: string) => void;
  confirmUrl: string | null;
  requestExternalUrl: (url: string) => void;
  clearExternalUrl: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('sys_lang') as Language) || 'ID';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('sys_theme') as Theme) || 'dark';
  });

  // State terpusat untuk modal dan loading path terminal
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sys_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sys_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const systemLang = lang === 'ID' ? id : en;

  const toggleLang = () => setLang((prev) => (prev === 'EN' ? 'ID' : 'EN'));
  const toggleTheme = () => {
    startTransition(() => {
      setTheme((prev) => {
        const nextTheme = prev === 'dark' ? 'light' : 'dark';
        return nextTheme;
      });
    });
  };

  // Fungsi global untuk membuka modal dengan efek loading path
  const openModal = (id: ModalType, path: string) => {
    requestAnimationFrame(() => {
      setLoadingPath(path);
      setTimeout(() => {
        setLoadingPath(null);
        setActiveModal(id);
      }, 800);
    });
  };

  // Fungsi global untuk menutup modal dengan efek loading path (bisa dipakai semua modal!)
  const closeModal = (exitPath: string = "~/sys/home") => {
    setLoadingPath(exitPath);
    setTimeout(() => {
      setLoadingPath(null);
      setActiveModal(null);
    }, 600);
  };

  const [confirmUrl, setConfirmUrl] = useState<string | null>(null);

  const requestExternalUrl = (url: string) => {
    setConfirmUrl(url);
  };

  const clearExternalUrl = () => {
    setConfirmUrl(null);
  };

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
        clearExternalUrl
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within a SystemProvider');
  return context;
};