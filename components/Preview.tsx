import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// A lightweight markdown to HTML converter for this specific use case
const simpleMarkdownToHtml = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold border-b border-gray-700 pb-2 mb-4 mt-6">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>');

    // Links with Icons
    const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
    const twitterIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>`;
    const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
    const websiteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>`;
    const portfolioIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
    const blogIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        let icon = '';
        const lowerText = text.toLowerCase();
        
        if (lowerText === 'linkedin') {
            icon = linkedinIcon;
        } else if (lowerText === 'twitter') {
            icon = twitterIcon;
        } else if (lowerText === 'github') {
            icon = githubIcon;
        } else if (lowerText === 'website') {
             icon = websiteIcon;
        } else if (lowerText === 'portfolio') {
            icon = portfolioIcon;
        } else if (lowerText === 'blog') {
            icon = blogIcon;
        }

        if (icon) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline inline-flex items-center gap-2">${icon}<span>${text}</span></a>`;
        }
        // Default link rendering if no icon matches
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">${text}</a>`;
    });


    // Images (for badges and stats)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt: string, src: string) => {
        if (src.includes('github-readme-stats.vercel.app')) {
            // GitHub stats cards are larger and should be rendered as block-like elements
            return `<img alt="${alt}" src="${src}" class="my-2" />`;
        }
        // Shields.io badges for skills
        return `<img alt="${alt}" src="${src}" class="inline-block h-8 my-1 mr-1" />`;
    });

    // Bold
    html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');

    // Paragraphs
    html = html.split('\n\n').map(p => {
        const trimmed = p.trim();
        if (!trimmed) return '';
        // If it's already a block element from our processing or from Gemini, don't wrap it in <p>
        if (trimmed.startsWith('<h1') || trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<p')) {
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