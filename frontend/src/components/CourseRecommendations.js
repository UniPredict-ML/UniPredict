import React, { useState } from 'react';

const CourseRecommendations = ({ data }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1: return { text: '1st', color: 'bg-blue-600 text-white' };
      case 2: return { text: '2nd', color: 'bg-blue-500 text-white' };
      case 3: return { text: '3rd', color: 'bg-blue-400 text-white' };
      default: return { text: `${rank}th`, color: 'bg-gray-500 text-white' };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 2.0) return 'text-red-600 bg-red-50';
    if (score >= 1.5) return 'text-orange-600 bg-orange-50';
    if (score >= 1.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-3">
      {data.map((course, index) => {
        const rank = index + 1;
        const rankBadge = getRankBadge(rank);
        const isExpanded = expandedCard === index;
        
        return (
          <div
            key={index}
            className={`bg-white border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer ${
              isExpanded ? 'shadow-md' : ''
            }`}
            onClick={() => setExpandedCard(isExpanded ? null : index)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-full ${rankBadge.color} flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
                    {rankBadge.text}
                  </div>
                  
                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 leading-tight">
                      {course.degree}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rank #{rank} recommendation
                    </p>
                  </div>
                </div>

                {/* Z-Score Display */}
                <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getScoreColor(course.predicted_cutoff)}`}>
                  {course.predicted_cutoff.toFixed(4)}
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-medium text-gray-700 mb-1">Required Z-Score</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {course.predicted_cutoff.toFixed(4)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-medium text-gray-700 mb-1">Match Rating</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {Math.max(100 - (rank - 1) * 8, 75)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="text-center">
          <h3 className="font-semibold text-blue-900 mb-1">
            Summary
          </h3>
          <p className="text-sm text-blue-700">
            Found {data.length} degree programs matching your profile.
            {data.length > 0 && ` Top recommendation: ${data[0].degree}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
