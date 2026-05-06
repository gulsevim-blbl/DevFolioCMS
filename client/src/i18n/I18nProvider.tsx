import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { I18nContext } from "./i18n-context";
import en from "./locales/en.json";
import tr from "./locales/tr.json";
import type { I18nContextValue, Language } from "./types";

type TranslationMap = Record<string, string>;

const translations: Record<Language, TranslationMap> = {
  tr,
  en
};

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem("language");
  return savedLanguage === "en" || savedLanguage === "tr" ? savedLanguage : "tr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    function setLanguage(nextLanguage: Language) {
      localStorage.setItem("language", nextLanguage);
      setLanguageState(nextLanguage);
    }

    function t(key: string, values?: Record<string, string | number>) {
      const template = translations[language][key] ?? translations.en[key] ?? key;

      if (!values) return template;

      return Object.entries(values).reduce(
        (text, [name, replacement]) =>
          text.replaceAll(`{${name}}`, String(replacement)),
        template
      );
    }

    return { language, setLanguage, t };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
