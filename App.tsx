
import React, { useState, useCallback } from 'react';
import type { UserProfile } from './types';
import { generateReadme } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import Preview from './components/Preview';
import { Placeholders } from './constants';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Amar Kumar',
    bio: 'A passionate full-stack developer from India, specializing in building beautiful and functional web applications with React, Node.js, and modern AI technologies.',
    skills: 'React, TypeScript, Node.js, Tailwind CSS, Gemini API, Python, Docker',
    githubUsername: 'amarzeus',
    linkedinUsername: 'amar-kumar-profile',
    twitterUsername: 'amar_zeus',
    website: 'https://portfolio.example.com',
    showGithubStats: true,
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
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
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
