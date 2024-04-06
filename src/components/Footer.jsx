import React from 'react';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-3">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-semibold">Ethereal Estates</h2>
              <p className="text-sm">© 2024 Ethereal Estates. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}