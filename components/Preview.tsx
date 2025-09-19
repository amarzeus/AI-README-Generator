import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// A lightweight markdown to HTML converter for this specific use case
const simpleMarkdownToHtml = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold border-b border-gray-700 pb-2 mb-4 mt-6">$1</h2>');

    // Links with Icons
    const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
    const twitterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 9.7 0 7.2-4.3 12.7-12.8 12.7C5.1 24 0 18.9 0 12.6c.1-.1.1-.1.2-.1 2.1 0 4.2-.8 5.8-2.2.1-.1.1-.1.2-.2-2.1 0-4-1.3-4.6-3.2-.1-.1 0 0 0 .1.3 0 .7.1 1.1.1-2.1-.5-3.6-2.2-3.6-4.5 0-.1 0-.1.1-.1.6.3 1.3.5 2 .5C3.1 8 1.4 5.3 3.3 3c.1-.1.1-.1.2-.1 2.4 2.8 5.7 4.6 9.5 4.9.1 0 .1 0 .1-.1-.1-2.4 1.5-4.5 4-4.5 1.1 0 2.2.5 3 1.2.1.1.1.1.2.1.9-.2 1.8-.5 2.5-.9-.1.1-.1.1-.2.2-.3.9-1 1.7-1.9 2.1.1 0 .1 0 .1-.1.8-.1 1.6-.3 2.3-.6v.1z"/></svg>`;
    const websiteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>`;

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        let icon = '';
        if (url.includes('linkedin.com')) {
            icon = linkedinIcon;
        } else if (url.includes('twitter.com')) {
            icon = twitterIcon;
        } else if (text.toLowerCase() === 'website' && url) {
             icon = websiteIcon;
        }

        if (icon) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline inline-flex items-center gap-2">${icon}<span>${text}</span></a>`;
        }
        // Default link rendering if no icon matches
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">${text}</a>`;
    });


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