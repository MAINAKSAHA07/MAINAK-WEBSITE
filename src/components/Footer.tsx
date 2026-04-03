import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent text-gray-300 py-12 border-t border-[#2A0E61] z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[15px]">
            &copy; {currentYear} Mainak Malay Saha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;