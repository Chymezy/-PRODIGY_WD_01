import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';

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
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4" id="footer-about">
              {t('footer.about')}
            </h2>
            <p className="text-gray-300">
              {t('footer.description')}
            </p>
          </div>
          
          {/* Quick Links Navigation */}
          <nav aria-labelledby="footer-quick-links">
            <h2 className="text-lg font-semibold mb-4" id="footer-quick-links">
              {t('footer.quickLinks')}
            </h2>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    aria-label={t(`footer.aria.${item}`)}
                  >
                    {t(`navbar.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Information */}
          <div role="contentinfo" aria-labelledby="footer-contact">
            <h2 className="text-lg font-semibold mb-4" id="footer-contact">
              {t('footer.contactUs')}
            </h2>
            <address className="text-gray-300 not-italic">
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

          {/* Social Links */}
          <div role="complementary" aria-labelledby="footer-social">
            <h2 className="text-lg font-semibold mb-4" id="footer-social">
              {t('footer.followUs')}
            </h2>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label={t('footer.aria.followOn', { replace: { social: social.name } })}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} NeuraPulse. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
