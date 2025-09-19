import React, { useState, useEffect } from 'react';
import type { UserProfile } from './types';
import { Placeholders } from './constants';
import { generateReadme } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import Preview from './components/Preview';
import ShareModal from './components/ShareModal';

const initialProfile: UserProfile = {
  name: 'Amar Kumar',
  bio: 'A passionate Full Stack Developer with experience in building web applications with JavaScript, React, Node.js, and other cool libraries and frameworks.',
  skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Docker',
  githubUsername: 'amarzeus',
  linkedinUsername: 'amarmahakal',
  twitterUsername: 'its_meAmar',
  website: 'https://github.com/amarzeus',
  showGithubStats: true,
  githubStatsTheme: 'radical',
  githubStatsHideStats: [],
  githubStatsTopLangsLayout: 'compact',
  githubStatsBorderRadius: '8',
  githubStatsHideBorder: true,
  githubStatsDisableAnimations: false,
  profilePicture: '',
  profilePictureStyle: {
    isCircular: true,
    hasBorder: false,
    borderColor: '#4f46e5',
    hasShadow: true,
    shadowIntensity: 'Medium',
  },
  portfolioUrl: '',
  blogUrl: '',
  education: {
    university: '',
    degree: '',
    graduationYear: '',
  },
  projects: [
    {
      name: 'AI GitHub README Generator',
      description: 'A tool that generates beautiful and informative GitHub profile READMEs using the Gemini API.',
      url: 'https://github.com/amarzeus/ai-github-readme-generator',
      image: ''
    }
  ],
  generationStyle: 'Balanced',
};


function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [markdown, setMarkdown] = useState<string>(Placeholders.MARKDOWN_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setMarkdown('');

    try {
      const generatedMarkdown = await generateReadme(userProfile);
      setMarkdown(generatedMarkdown);
      setIsShareModalOpen(true);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setMarkdown(Placeholders.ERROR_PLACEHOLDER);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#0d1117] text-gray-900 dark:text-gray-200 min-h-screen flex flex-col font-sans transition-colors duration-200">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <InputForm 
              userProfile={userProfile} 
              setUserProfile={setUserProfile} 
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:h-[calc(100vh-8rem)]">
            <Preview 
              markdown={markdown}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <Footer />
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        markdown={markdown}
      />
    </div>
  );
}

export default App;