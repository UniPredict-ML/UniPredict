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

        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">M C R Mallawaarchchi</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0093</p>
              <p className="text-gray-600 text-sm text-center">Model training, Data gathering</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">Dunal Senitha De Mel</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0499</p>
              <p className="text-gray-600 text-sm text-center">Data preprocessing, Data gathering</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">R.K.N.R. Ranasinghe</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0238</p>
              <p className="text-gray-600 text-sm text-center">Frontend & Backend development, Model integration</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">H.A.L.Ruwanya</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0480</p>
              <p className="text-gray-600 text-sm text-center">Frontend development</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">N.M.R.D.Narasingha</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0587</p>
              <p className="text-gray-600 text-sm text-center">Data gathering, Documentation, Frontend development</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">W.A.D.R. Weerasinghe</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0134</p>
              <p className="text-gray-600 text-sm text-center">Data gathering, Model development, Presentation, Documentation</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">S.M.A.Nisansala</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0849</p>
              <p className="text-gray-600 text-sm text-center">Presentation, Documentation</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">K.K.R.Shehara</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0559</p>
              <p className="text-gray-600 text-sm text-center">Presentation, Documentation</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">S.G.T.A.Anusarani</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0530</p>
              <p className="text-gray-600 text-sm text-center">Presentation, Documentation</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-1 text-center">P.M.V.M.Didulani</h3>
              <p className="text-sm text-blue-600 mb-2 text-center">22ug1-0487</p>
              <p className="text-gray-600 text-sm text-center">Presentation, Documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;