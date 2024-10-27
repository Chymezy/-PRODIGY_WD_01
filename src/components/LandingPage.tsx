import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-16">
      <section id="home" className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-32">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to TechNova</h1>
          <p className="text-xl mb-8">Innovating the future, one line of code at a time.</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </section>
      
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">About Us</h2>
          <p className="text-lg text-gray-600">TechNova is a cutting-edge tech startup dedicated to pushing the boundaries of what's possible in software development and artificial intelligence.</p>
        </div>
      </section>
      
      <section id="services" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['AI Solutions', 'Web Development', 'Mobile Apps'].map((service) => (
              <div key={service} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{service}</h3>
                <p className="text-gray-600">Innovative {service.toLowerCase()} tailored to your needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h2>
          <p className="text-lg mb-4 text-gray-600">Get in touch with us for any inquiries or collaborations.</p>
          <a href="mailto:info@technova.com" className="text-blue-600 hover:underline">
            info@technova.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
