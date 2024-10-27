import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const withTranslation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { t } = useTranslation();
    return <WrappedComponent {...props} t={t} />;
  };
};
