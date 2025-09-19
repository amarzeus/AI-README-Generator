import React, { useState, useCallback, useEffect } from 'react';
import type { UserProfile } from './types';
import { generateReadme } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import Preview from './components/Preview';
import { Placeholders } from './constants';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Amar Kumar',
    bio: 'A passionate full-stack developer from India, specializing in building beautiful and functional web applications with React, Node.js, and modern AI technologies.',
    skills: 'React, TypeScript, Node.js, Tailwind CSS, Gemini API, Python, Docker',
    githubUsername: 'amarzeus',
    linkedinUsername: 'amar-kumar-profile',
    twitterUsername: 'amar_zeus',
    website: 'https://portfolio.example.com',
    portfolioUrl: '',
    blogUrl: '',
    education: {
      university: 'University of Technology',
      degree: 'B.Sc. in Computer Science',
      graduationYear: '2024',
    },
    projects: [
      {
        name: 'AI README Generator',
        description: 'An AI-powered tool to generate beautiful GitHub profile READMEs. Built with React, TypeScript, and the Gemini API.',
        url: 'https://github.com/amarzeus/ai-github-readme-generator',
      }
    ],
    showGithubStats: true,
    githubStatsTheme: 'radical',
    githubStatsHideStats: [],
    githubStatsTopLangsLayout: 'compact',
    githubStatsBorderRadius: '8',
    profilePicture: '',
  });

  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>(Placeholders.MARKDOWN_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedMarkdown('');

    try {
      const markdown = await generateReadme(userProfile);
      setGeneratedMarkdown(markdown);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate README. ${errorMessage}`);
      setGeneratedMarkdown(Placeholders.ERROR_PLACEHOLDER);
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <Preview
            markdown={generatedMarkdown}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;