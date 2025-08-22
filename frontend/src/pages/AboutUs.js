import React from 'react';

const AboutUs = () => {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About UniPredict</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to revolutionizing university admission predictions through 
            cutting-edge technology and data-driven insights.
          </p>
        </div>

        {/* <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              UniPredict aims to democratize access to higher education by providing students 
              with accurate, data-driven predictions about their university admission chances.
            </p>
            <p className="text-gray-600 mb-4">
              Our platform leverages advanced machine learning algorithms and comprehensive 
              historical data to help students make informed decisions about their academic future.
            </p>
            <p className="text-gray-600">
              We believe that every student deserves to know their chances and plan accordingly, 
              regardless of their background or circumstances.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Advanced ML algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Real-time predictions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Comprehensive data analysis
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                User-friendly interface
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Personalized recommendations
              </li>
            </ul>
          </div>
        </div> */}

        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">DS</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Scientists</h3>
              <p className="text-gray-600">Expert team developing prediction algorithms</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Software Engineers</h3>
              <p className="text-gray-600">Building robust and scalable platforms</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">UX</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">UX Designers</h3>
              <p className="text-gray-600">Creating intuitive user experiences</p>
            </div>
          </div>
        </div>

        {/* <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Us
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;