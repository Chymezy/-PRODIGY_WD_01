import React from 'react';
import { useTranslation } from 'react-i18next';

export const withTranslation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { t } = useTranslation();

    const translateProps = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map(translateProps);
      }

      const result: any = {};
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('t:')) {
          result[key] = t(obj[key].slice(2));
        } else {
          result[key] = translateProps(obj[key]);
        }
      }
      return result;
    };

    const translatedProps = translateProps(props);

    return <WrappedComponent {...translatedProps} />;
  };
};
