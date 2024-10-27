import i18next from 'i18next';

export const t = (key: string, defaultValue: string) => {
  const translation = i18next.t(key, { defaultValue });
  if (translation === key && process.env.NODE_ENV === 'development') {
    console.warn(`Missing translation for key: ${key}`);
    return defaultValue;
  }
  return translation;
};

export const extractTranslationKeys = () => {
  const keys: Record<string, string> = {};
  const extractKeysFromObject = (obj: any, prefix = '') => {
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'string') {
        keys[fullKey] = obj[key];
      } else if (typeof obj[key] === 'object') {
        extractKeysFromObject(obj[key], fullKey);
      }
    }
  };

  // Extract keys from all loaded namespaces
  Object.keys(i18next.services.resourceStore.data).forEach(lng => {
    Object.keys(i18next.services.resourceStore.data[lng]).forEach(ns => {
      extractKeysFromObject(i18next.services.resourceStore.data[lng][ns], ns);
    });
  });

  return keys;
};
