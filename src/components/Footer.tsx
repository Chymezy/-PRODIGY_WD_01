import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';
import { accessibleColors } from '../utils/accessibilityUtils';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = ['home', 'about', 'services', 'contact', 'faq'];
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  ];

  return (
    <footer className={`py-12 ${accessibleColors.background.primary.dark}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${accessibleColors.text.primary.dark}`}>
              {t('footer.about')}
            </h3>
            <p className={accessibleColors.text.secondary.dark}>
              {t('footer.description')}
            </p>
          </div>
          
          <nav>
            <h3 className={`text-lg font-semibold mb-4 ${accessibleColors.text.primary.dark}`}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    className={`${accessibleColors.text.secondary.dark} hover:text-white transition-colors duration-300`}
                    aria-label={t(`footer.aria.${item}`)}
                  >
                    {t(`navbar.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${accessibleColors.text.primary.dark}`}>
              {t('footer.contactUs')}
            </h3>
            <address className={`${accessibleColors.text.secondary.dark} not-italic`}>
              <p>{t('footer.address')}</p>
              <p>{t('footer.phone')}</p>
              <p>
                {t('footer.email')}: 
                <a 
                  href="mailto:info@neurapulse.com" 
                  className="hover:text-white transition-colors duration-300 ml-1"
                >
                  info@neurapulse.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${accessibleColors.text.primary.dark}`}>
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${accessibleColors.text.secondary.dark} hover:text-white transition-colors duration-300`}
                  aria-label={t('footer.aria.followOn', { replace: { social: social.name } })}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`border-t border-gray-700 mt-8 pt-8 text-center ${accessibleColors.text.secondary.dark}`}>
          <p>&copy; {currentYear} NeuraPulse. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
