import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, GraduationCap, School } from 'lucide-react';

export default function App() {
  const [zScore, setZScore] = useState('');
  const [stream, setStream] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http:localhost:8000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zScore, stream, district })
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      alert("Error fetching recommendations.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-white p-0 md:p-0 flex flex-col">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-10 px-4 flex flex-col items-center shadow-lg rounded-b-3xl mb-8">
        <GraduationCap size={48} className="text-white mb-2 animate-bounce" />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">University Recommendation System</h1>
        <p className="text-lg text-blue-100 mt-2 text-center max-w-xl">Find the best university courses for your Z-Score, stream, and district. Get personalized recommendations instantly!</p>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-8 px-2 md:px-0">
        {/* Form Card */}
        <Card className="rounded-3xl shadow-2xl border border-blue-200 bg-white/80 backdrop-blur-md">
          <CardContent className="p-8 grid gap-6">
            <div className="flex flex-col gap-4">
              {/* Z-Score Bar Section */}
              <label className="font-semibold text-blue-700 mb-1">Z-Score</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="Enter your Z-Score"
                value={zScore}
                onChange={e => setZScore(e.target.value)}
                className="rounded-xl border-blue-400 focus:ring-2 focus:ring-blue-300 transition px-4 py-2 mb-2"
              />
              {/* Stream Section Selection List */}
              <label className="font-semibold text-blue-700 mb-1">Stream</label>
              <select
                value={stream}
                onChange={e => setStream(e.target.value)}
                className="rounded-xl border-blue-400 focus:ring-2 focus:ring-blue-300 transition px-4 py-2 mb-2 bg-white"
              >
                <option value="">Select your Stream</option>
                <option value="Bio">Bio</option>
                <option value="Math">Math</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
              </select>
              <Input
                placeholder="Enter your District"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="rounded-xl border-blue-400 focus:ring-2 focus:ring-blue-300 transition"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Get Recommendations'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Cards */}
        {recommendations.length > 0 && (
          <div
            className="grid md:grid-cols-2 gap-6 animate-fade-in"
            style={{ animation: 'fadeIn 1s' }}
          >
            {recommendations.map((rec, idx) => (
              <Card
                key={idx}
                className="border-l-8 border-blue-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:scale-[1.03]"
                style={{ transition: 'transform 0.2s' }}
              >
                <CardContent className="p-6 space-y-3 flex flex-col">
                  <div className="flex items-center gap-2">
                    <School size={28} className="text-blue-500 animate-float" />
                    <h3 className="text-xl font-bold text-blue-700">{rec.course}</h3>
                  </div>
                  <p className="text-base text-gray-700">
                    <span className="font-semibold text-blue-600">University:</span> {rec.university}
                  </p>
                  <p className="text-base text-gray-700">
                    <span className="font-semibold text-blue-600">Cutoff Z-Score:</span> {rec.cutoff}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Chart Section */}
        {recommendations.length > 0 && (
          <Card className="rounded-2xl shadow-xl border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 mt-8 animate-fade-in" style={{ animation: 'fadeIn 1.2s' }}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                <BarChart size={28} className="text-blue-500" /> Comparison Chart
              </h2>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={recommendations}>
                  <XAxis dataKey="course" tick={{ fontSize: 14, fill: '#2563eb' }} />
                  <YAxis tick={{ fontSize: 14, fill: '#2563eb' }} />
                  <Tooltip
                    contentStyle={{ background: "#eff6ff", borderRadius: "8px", color: "#1e40af" }}
                    labelStyle={{ color: "#1e40af" }}
                  />
                  <Bar dataKey="cutoff" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Add these styles to your global CSS (e.g., index.css)
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in {
  animation: fadeIn 1s;
}
@keyframes float {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-6px);}
}
.animate-float {
  animation: float 2s infinite;
}
*/
