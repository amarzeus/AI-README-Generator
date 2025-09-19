import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-gray-300 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>
          Crafted with ❤️ by{' '}
          <a
            href="https://github.com/amarzeus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-500 hover:underline"
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