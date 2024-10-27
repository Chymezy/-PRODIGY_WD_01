import { useTranslation as useI18nTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface UseTranslationType {
  t: TFunction;
  i18n: {
    changeLanguage: (lang: string) => void;
    language: string;
  };
  currentLanguage: string;
}

export const useTranslation = (): UseTranslationType => {
  const { t, i18n } = useI18nTranslation();

  return {
    t,
    i18n,
    currentLanguage: i18n.language
  };
};
