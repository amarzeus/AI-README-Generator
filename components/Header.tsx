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

const logoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImxvZ29HcmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNjQiIHkyPSI2NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNBNzhCRkEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2MzY2RjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxMiIgZmlsbD0idXJsKCNsb2dvR3JhZGllbnQpIi8+PHBhdGggZD0iTTIyIDE2SDQyVjE4SDIyVjE2Wk0yMiAyNEg0MlYyNkgyMlYyNFpNMjIgMzJINDI0VjM0SDIyVjMyWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCAxMEg0MEw1MCAyMFY1NEgxNFYxMFpNMzggMTRIMThWNTAgSDQ2VjIySDM4VjE0WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMzcuNzUgMzcuNUw0MCAzM0w0Mi4yNSAzNy41TDQ2IDQwTDQyLjI1IDQyLjVMNDAgNDdMMzcuNzUgNDIuNUwzNCA0MEwzNy43NSAzNy41WiIgZmlsbD0iI0E3OEJGQSIvPjwvc3ZnPg==";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <img src={logoDataUri} alt="AI README Generator Logo" className="h-9 w-9" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
             AI README Generator
            </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/amar-kumar-profile"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://twitter.com/amar_zeus"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Profile"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/amarzeus/ai-github-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;