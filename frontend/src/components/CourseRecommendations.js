import React from 'react';

const CourseRecommendations = ({ data }) => {
  return (
    <div className="mt-5">
      <h4 className="text-info text-center mb-3"> Recommended Degree Programs</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>Rank</th>
            <th>Course</th>
            <th>University</th>
            <th>Cut-off Z-score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <tr key={index} className="align-middle">
              <td><span className="badge bg-success">{index + 1}</span></td>
              <td>{course.course_name}</td>
              <td>{course.university}</td>
              <td><span className="badge bg-warning text-dark">{course.cutoff_zscore}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseRecommendations;
