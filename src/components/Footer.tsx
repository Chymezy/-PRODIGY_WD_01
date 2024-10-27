import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = ['Home', 'About', 'Services', 'Contact', 'FAQ'];
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About NeuraNova</h3>
            <p className="text-gray-400 dark:text-gray-300">
              NeuraNova is a leading provider of AI-powered analytics solutions, helping businesses make data-driven decisions and achieve exponential growth.
            </p>
          </div>
          <nav>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label={`Go to ${item}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 AI Street, Tech City, 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: <a href="mailto:info@neuranova.com" className="hover:text-white transition-colors duration-300">info@neuranova.com</a></p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-300">
          <p>&copy; {currentYear} NeuraNova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
