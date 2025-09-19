import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// A lightweight markdown to HTML converter for this specific use case
const simpleMarkdownToHtml = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold border-b border-gray-700 pb-2 mb-4 mt-6">$1</h2>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>');

    // Images (for badges and stats)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="inline-block h-8 my-1 mr-1" />');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');

    // Paragraphs
    html = html.split('\n\n').map(p => {
        const trimmed = p.trim();
        if (!trimmed) return '';
        // If it's already a block element from our processing or from Gemini, don't wrap it in <p>
        if (trimmed.startsWith('<h1') || trimmed.startsWith('<h2') || trimmed.startsWith('<p')) {
            return trimmed;
        }
        return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`
    }).join('');

    return html;
};


const CopyIcon: React.FC<{isCopied: boolean}> = ({ isCopied }) => {
    if (isCopied) {
        return (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
    );
};


interface PreviewProps {
  markdown: string;
  isLoading: boolean;
  error: string | null;
}

const Preview: React.FC<PreviewProps> = ({ markdown, isLoading, error }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [renderedHtml, setRenderedHtml] = useState('');

    useEffect(() => {
        setRenderedHtml(simpleMarkdownToHtml(markdown));
    }, [markdown]);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between">
        <CardTitle>Preview</CardTitle>
        <Button onClick={handleCopy} size="sm" variant="ghost" disabled={!markdown || isLoading}>
            <CopyIcon isCopied={isCopied} />
            <span className="ml-2">{isCopied ? 'Copied!' : 'Copy Markdown'}</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto github-preview-scrollbar relative">
        {isLoading && (
            <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
                    <p className="mt-4 text-lg">Generating your masterpiece...</p>
                </div>
            </div>
        )}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
        <div 
          className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      </CardContent>
    </Card>
  );
};

export default Preview;