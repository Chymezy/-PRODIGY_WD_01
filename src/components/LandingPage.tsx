import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-16">
      <section id="home" className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Unlock the Power of AI with InsightAI</h1>
          <p className="text-xl mb-8">Transform your business with AI-powered analytics that deliver 10x ROI</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg">
            Get Your Free AI Consultation
          </button>
          <p className="mt-4 text-sm">Limited time offer: First 50 sign-ups get a personalized AI strategy session</p>
        </div>
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
    </div>
  );
};

export default LandingPage;
