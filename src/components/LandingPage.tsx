import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="pt-16">
      <section id="home" className="relative bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted className="object-cover w-full h-full opacity-30">
            <source src="/path-to-your-video.mp4" type="video/mp4" />
          </video>
        </div>
        <motion.div 
          className="container mx-auto px-6 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-5xl font-bold mb-4">Unlock the Power of AI with InsightAI</h1>
          <p className="text-xl mb-8">Transform your business with AI-powered analytics that deliver 10x ROI</p>
          <motion.button 
            className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Your Free AI Consultation
          </motion.button>
          <p className="mt-4 text-sm">Limited time offer: First 50 sign-ups get a personalized AI strategy session</p>
        </motion.div>
      </section>
      
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Why Choose InsightAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4 text-purple-600">📈</div>
              <h3 className="text-xl font-semibold mb-2">Boost Revenue</h3>
              <p className="text-gray-600">Our clients see an average 35% increase in revenue within 6 months</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4 text-purple-600">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">Reduce decision-making time by 70% with our AI-powered insights</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4 text-purple-600">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Scale Faster</h3>
              <p className="text-gray-600">Grow your business 5x faster with data-driven strategies</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Cutting-Edge AI Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Predictive Analytics', icon: '🔮', description: 'Forecast trends and make proactive decisions' },
              { name: 'Natural Language Processing', icon: '💬', description: 'Understand and leverage customer sentiment' },
              { name: 'Computer Vision', icon: '👁️', description: 'Gain insights from images and video data' }
            ].map((service) => (
              <div key={service.name} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-20 bg-purple-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"InsightAI transformed our business. We've seen a 50% increase in customer retention and a 40% boost in sales."</p>
              <p className="font-semibold">- John Doe, CEO of TechCorp</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"The AI-driven insights we've gained have been game-changing. Our productivity has skyrocketed!"</p>
              <p className="font-semibold">- Jane Smith, CTO of InnovateCo</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Revolutionize Your Business?</h2>
          <p className="text-xl mb-8">Join the AI revolution and stay ahead of your competition. Contact us now!</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg">
            Schedule Your Free Consultation
          </button>
          <p className="mt-4">Or reach us at: <a href="mailto:info@insightai.com" className="underline">info@insightai.com</a></p>
        </div>
      </section>
      
      <section id="clients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              { name: 'Google', svg: 'M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' },
              { name: 'Microsoft', svg: 'M3 3h4v4H3V3zm0 5h4v4H3V8zm5 0h4v4H8V8zm5 0h4v4h-4V8zm0-5h4v4H8V3zm-5 0h4v4H8V3zm5 10h4v4h-4v-4zm-5 0h4v4H8v-4zm-5 0h4v4H3v-4z' },
              { name: 'Amazon', svg: 'M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z' },
              { name: 'Apple', svg: 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z' },
              { name: 'Facebook', svg: 'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' },
            ].map((company) => (
              <motion.div
                key={company.name}
                className="w-32 h-16 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-full h-full text-gray-600"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={company.svg} />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Frequently Asked Questions</h2>
          {/* Add FAQ items here */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
