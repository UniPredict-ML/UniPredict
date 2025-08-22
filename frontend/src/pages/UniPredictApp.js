import React, { useState, useEffect } from 'react';
import CourseRecommendations from '../components/CourseRecommendations';
import Error from '../components/Error';

const UniPredictApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentData, setStudentData] = useState({ user_z_score: '', stream: '', district: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      id: 'zscore',
      title: 'Z-Score',
      subtitle: 'Enter your academic performance score',
      field: 'user_z_score'
    },
    {
      id: 'stream',
      title: 'Academic Stream',
      subtitle: 'Select your field of study',
      field: 'stream'
    },
    {
      id: 'district',
      title: 'District',
      subtitle: 'Choose your location',
      field: 'district'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setRecommendations(data.recommend);
      setCurrentStep(steps.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isStepComplete = (stepIndex) => {
    const step = steps[stepIndex];
    if (!step) return false;
    return studentData[step.field] && studentData[step.field].trim() !== '';
  };

  const canProceed = isStepComplete(currentStep);

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'zscore':
        return (
          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Z-Score *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="1.75"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={studentData.user_z_score}
                onChange={(e) => setStudentData({ ...studentData, user_z_score: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">Enter your academic Z-score (e.g., 1.75)</p>
            </div>
          </div>
        );
      
      case 'stream':
        const streams = [
          { value: 'biological science', label: 'Biological Science' },
          { value: 'physical science', label: 'Physical Science' },
          { value: 'commerce', label: 'Commerce' },
          { value: 'arts', label: 'Arts' },
          { value: 'biosystems technology', label: 'Biosystems Technology' }
        ];
        
        return (
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Academic Stream *
              </label>
              <div className="space-y-2">
                {streams.map((stream) => (
                  <label
                    key={stream.value}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="stream"
                      value={stream.value}
                      checked={studentData.stream === stream.value}
                      onChange={(e) => setStudentData({ ...studentData, stream: e.target.value })}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{stream.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'district':
        return (
          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District *
              </label>
              <input
                type="text"
                placeholder="Colombo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={studentData.district}
                onChange={(e) => setStudentData({ ...studentData, district: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">Enter your district for location-specific recommendations</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Profile</h3>
          <p className="text-gray-600">Please wait while we find your matches...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h3>
          <Error message={error} />
          <button
            onClick={() => setCurrentStep(0)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (recommendations.length > 0) {
      return (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Recommendations</h3>
            <p className="text-gray-600">Based on your profile, here are the best degree options for you:</p>
          </div>
          <CourseRecommendations data={recommendations} />
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setCurrentStep(0);
                setRecommendations([]);
                setStudentData({ user_z_score: '', stream: '', district: '' });
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            UniPredict
          </h1>
          <p className="text-gray-600">
            Find the perfect degree program for your profile
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          {currentStep < steps.length && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        index < currentStep 
                          ? 'bg-blue-600 text-white' 
                          : index === currentStep 
                          ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-4 transition-colors ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {currentStep < steps.length ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {steps[currentStep].subtitle}
                  </p>
                </div>
                
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentStep === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!canProceed || loading}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                      canProceed && !loading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {loading && currentStep === steps.length - 1 ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>{currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}</span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              renderResults()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniPredictApp;