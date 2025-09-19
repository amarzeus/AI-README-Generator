
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/30 border-t border-gray-700">
      <div className="container mx-auto px-4 py-4 text-center text-gray-400">
        <p>
          Crafted with ❤️ by{' '}
          <a
            href="https://github.com/amarzeus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Amar Kumar
          </a>
          .
        </p>
         <p className="text-sm mt-1">Powered by Gemini API</p>
      </div>
    </footer>
  );
};

export default Footer;
