import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-4 w-4 mr-2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 mr-2"><path d="M20 6 9 17l-5-5"/></svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

interface PreviewProps {
  markdown: string;
  isLoading: boolean;
}

const ReadmeSkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-8 p-4">
    {/* Profile Picture and Header */}
    <div className="flex flex-col items-center space-y-4">
      <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-8 w-3/5 rounded bg-gray-200 dark:bg-gray-700"></div>
    </div>

    {/* About Me Section */}
    <div className="space-y-4">
      <div className="h-6 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    {/* Skills Section */}
    <div className="space-y-4">
      <div className="h-6 w-1/5 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-8 w-28 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="space-y-4">
      <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="space-y-4">
        <div className="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-20 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  </div>
);


const Preview: React.FC<PreviewProps> = ({ markdown, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10">
        <CardTitle>Preview</CardTitle>
        <div className="flex items-center space-x-2">
            <Button onClick={handleCopy} variant="ghost" size="sm" disabled={!markdown || isLoading}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button onClick={handleDownload} variant="ghost" size="sm" disabled={!markdown || isLoading}>
                <DownloadIcon />
                Download
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {isLoading ? (
          <ReadmeSkeletonLoader />
        ) : (
          <article className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </article>
        )}
      </CardContent>
    </Card>
  );
};

export default Preview;