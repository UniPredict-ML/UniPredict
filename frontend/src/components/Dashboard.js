import React, { useState } from 'react';
import CourseRecommendations from './CourseRecommendations';
import Loading from './Loading';
import Error from './Error';

const Dashboard = () => {
  const [studentData, setStudentData] = useState({ zScore: '', stream: '', district: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.example.com/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-light rounded">
        <h2 className="text-primary mb-4 text-center">🎓 Degree Recommendation System</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Z-Score</label>
            <input type="number" placeholder="Enter your Z-score" className="form-control"  
              value={studentData.zScore}
              onChange={(e) => setStudentData({ ...studentData, zScore: e.target.value })}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Stream</label>
            <select className="form-select" value={studentData.stream}
              onChange={(e) => setStudentData({ ...studentData, stream: e.target.value })} required>
              <option value="">Select Stream</option>
              <option value="Science"> Science</option>
              <option value="Commerce"> Commerce</option>
              <option value="Arts"> Arts</option>
              <option value="Technology"> Technology</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">District</label>
            <input type="text" placeholder="Enter your District" className="form-control"
              value={studentData.district}
              onChange={(e) => setStudentData({ ...studentData, district: e.target.value })}
              required />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success px-4">🔍 Get Recommendations</button>
          </div>
        </form>

        {loading && <Loading />}
        {error && <Error message={error} />}
        {recommendations.length > 0 && <CourseRecommendations data={recommendations} />}
      </div>
    </div>
  );
};

export default Dashboard;
