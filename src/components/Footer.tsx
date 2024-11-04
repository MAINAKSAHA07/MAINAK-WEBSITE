import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-slate-400">
            © {currentYear} Mainak Malay Saha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;