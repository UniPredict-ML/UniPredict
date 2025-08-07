import React, { useState } from 'react';
import CourseRecommendations from './CourseRecommendations';
import Loading from './Loading';
import Error from './Error';

const Dashboard = () => {
  const [studentData, setStudentData] = useState({ user_z_score: '', stream: '', district: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              value={studentData.user_z_score}
              onChange={(e) => setStudentData({ ...studentData, user_z_score: e.target.value })}
              required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Stream</label>
            <select className="form-select" value={studentData.stream}
              onChange={(e) => setStudentData({ ...studentData, stream: e.target.value })} required>
              <option value="">Select Stream</option>
              <option value="biological science"> Biological Science</option>
              <option value="physical science"> Physical Science</option>
              <option value="commerce"> Commerce</option>
              <option value="arts"> Arts</option>
              <option value="biosystems technology"> Biosystems Technology</option>
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
        {/* {recommendations.length > 0 && <CourseRecommendations data={recommendations} />} */}
        {Array.isArray(recommendations) && recommendations.length > 0 && (
          <CourseRecommendations data={recommendations} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
