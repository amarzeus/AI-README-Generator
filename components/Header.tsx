import React from 'react';

const GithubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

const LinkedInIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
  </svg>
);

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const logoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxMiIgZmlsbD0iIzI0MjkyZiIvPjxwYXRoIGQ9Ik0yMyAxNEg0MUM0Mi4xMDQ2IDE0IDQzIDE0Ljg5NTQgNDMgMTZWNDJMMzUgMzRMMjMgNDZWMTZDMjMgMTQuODk1NC AyMy44OTU0IDE0IDIzIDE0WiIgc3Ryb2tlPSIjZTZlZGYzIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQxLjc1IDIyLjVMNDQgMThMNDYuMjUgMjIuNUw1MCAyNUw0Ni4yNSAyNy41TDQ0IDMyTDQxLjc1IDI3LjVMNDggMjVMNDEuNzUgMjIuNVoiIGZpbGw9IiM1OGE2ZmYiLz48L3N2Zz4=";

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-[#f6f8fa] dark:bg-[#161b22] border-b border-gray-300 dark:border-gray-800 sticky top-0 z-10 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <img src={logoDataUri} alt="GitHub README Generator Logo" className="h-9 w-9" />
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
             GitHub README Generator
            </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="https://www.linkedin.com/in/amarmahakal/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://x.com/its_meAmar"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Profile"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/amarzeus/ai-github-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;