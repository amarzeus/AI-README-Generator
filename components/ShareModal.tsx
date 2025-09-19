import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

// Icons
const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-5 w-5 mr-2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-5 w-5 mr-2"><path d="M20 6 9 17l-5-5"/></svg>
);
const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5 mr-2">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
  </svg>
);
const LinkedInIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5 mr-2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);
const PartyPopperIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-party-popper h-12 w-12 text-indigo-500"><path d="M5.8 11.3 2.2 22l10.7-3.6"/><path d="M13.4 16.8 22 7.8l-3.6-10.7"/><path d="M2.2 2.2 8 8"/><path d="M16 8.5 19.5 5"/><path d="m13.5 14 3.5-3.5"/><path d="M8.5 16 5 19.5"/><path d="M14 13.5 10.5 17"/></svg>
);

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    markdown: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, markdown }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareText = `I just created an awesome GitHub profile README with this AI-powered generator! Check it out:`;
    const shareUrl = window.location.href;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
            <div 
                className="relative max-w-lg w-full"
                onClick={e => e.stopPropagation()}
            >
                <Card className="overflow-hidden">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10">
                        <XIcon />
                    </button>
                    <CardContent className="p-8 text-center">
                        <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full h-20 w-20 flex items-center justify-center">
                           <PartyPopperIcon />
                        </div>
                        <h2 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white">README Generated!</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                           Your professional README is ready. Share it with your network or copy the markdown to update your GitHub profile.
                        </p>
                        <div className="mt-6 space-y-3">
                            <Button onClick={handleCopy} variant="ghost" className="w-full border-2 border-gray-200 dark:border-gray-600">
                                {copied ? <CheckIcon /> : <CopyIcon />}
                                {copied ? 'Copied to Clipboard!' : 'Copy Markdown'}
                            </Button>
                             <div className="flex gap-3">
                                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                                   <TwitterIcon /> Share on X
                                </a>
                                <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                   <LinkedInIcon /> Share on LinkedIn
                                </a>
                            </div>
                        </div>
                         <div className="mt-8">
                            <Button onClick={onClose} variant="default" className="w-1/2">
                                Done
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ShareModal;
