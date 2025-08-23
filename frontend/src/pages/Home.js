import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter';

const Home = () => {
  const headingText = useTypewriter("Welcome to UniPredict", 100, 500);
  const descriptionText = useTypewriter("Your intelligent university prediction system powered by advanced algorithms to help you make informed academic decisions.", 50, 2000);
  const [showButton, setShowButton] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Calculate total duration: heading (100ms * 20 chars + 500ms delay) + description (50ms * 113 chars + 2000ms delay)
    const totalDuration = (100 * 20 + 500) + (50 * 113 + 2000);
    const timer = setTimeout(() => {
      setShowButton(true);
      setShowCards(true);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className={`container mx-auto px-4 ${!showButton ? 'min-h-screen flex items-center justify-center' : 'py-16'}`}>
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ease-out opacity-100 translate-y-0">
            {headingText.split('UniPredict').map((part, index) =>
              index === 0 ? part : (
                <span key={index}>
                  <span className="text-blue-600">UniPredict</span>
                  {part}
                </span>
              )
            )}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {descriptionText}
          </p>
          <div className="flex justify-center">
            <Link
              to="/unipredict"
              className={`w-40 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold
                 transform transition-all 
              duration-1000 ease-out ${showButton
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
              Get Started
            </Link>
          </div>
        </div>

        {showCards && (
          <div className={`mt-20 grid md:grid-cols-3 gap-1 place-items-center transform transition-all 
                duration-500 ease-out ${showCards
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                  }`}>

          <div className={`card bg-white rounded-lg p-6 shadow-lg transform transition-all duration-700 ease-out ${showCards
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                  }`} style={{transitionDelay: showCards ? '0ms' : '0ms'}}>
            <div className=" w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Predictions</h3>
            <p className="text-gray-600">Get accurate university admission predictions based on your academic profile.</p>
          </div>

          <div className={`card bg-white rounded-lg p-6 shadow-lg transform transition-all duration-700 ease-out ${showCards
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                  }`} style={{transitionDelay: showCards ? '150ms' : '0ms'}}>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">Get instant results with our optimized prediction algorithms.</p>
          </div>

          <div className={`card bg-white rounded-lg p-6 shadow-lg transform transition-all duration-700 ease-out ${showCards
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                  }`} style={{transitionDelay: showCards ? '300ms' : '0ms'}}>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600">Receive personalized recommendations for your academic journey.</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Home;