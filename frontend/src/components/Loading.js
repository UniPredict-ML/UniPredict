import React from 'react';

const Loading = () => (
  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mt-6 text-center font-medium">
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      <span>Loading your recommendations, please wait...</span>
    </div>
  </div>
);

export default Loading;
