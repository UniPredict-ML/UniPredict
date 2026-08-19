import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/unipredict', label: 'UniPredict App' },
    { path: '/about', label: 'About Us' }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="shadow-lg" style={{backgroundColor: '#eff1f5'}}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/unipredict-logo.png" 
              alt="UniPredict Logo" 
              className="w-24 h-24 object-contain"
            />
            <span className="text-xl font-bold" style={{color: '#374151'}}>UniPredict</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-lg font-medium transition-colors hover:opacity-80"
                style={{
                  color: isActiveLink(link.path) ? '#3b82f6' : '#374151',
                  backgroundColor: isActiveLink(link.path) ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:opacity-80 focus:outline-none transition-opacity"
              style={{color: '#6b7280'}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.2)'}}>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-lg font-medium transition-colors hover:opacity-80"
                  style={{
                    color: isActiveLink(link.path) ? '#3b82f6' : '#374151',
                    backgroundColor: isActiveLink(link.path) ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;