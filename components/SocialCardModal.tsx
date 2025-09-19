import React from 'react';
import type { UserProfile } from '../types';
import { Card, CardContent } from './ui/Card';

interface SocialCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    userProfile: UserProfile;
}

const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const SocialCardModal: React.FC<SocialCardModalProps> = ({ isOpen, onClose, userProfile }) => {
    if (!isOpen) return null;

    const shareText = `Check out my new AI-generated GitHub README! Created with GitHub README Generator.`;
    const shareUrl = window.location.href;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="relative max-w-2xl w-full"
                onClick={e => e.stopPropagation()}
            >
                <Card className="overflow-hidden">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 transition-colors z-10">
                        <XIcon />
                    </button>
                    <CardContent className="p-0">
                       <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
                            <div className="flex items-center gap-6">
                                {userProfile.profilePicture ? (
                                     <img src={userProfile.profilePicture} alt={userProfile.name} className="w-24 h-24 rounded-full border-4 border-white/50 object-cover" />
                                ) : (
                                  <div className="w-24 h-24 rounded-full border-4 border-white/50 bg-white/20 flex items-center justify-center">
                                    <span className="text-4xl font-bold">{userProfile.name.charAt(0)}</span>
                                  </div>
                                )}
                                <div>
                                    <h2 className="text-3xl font-bold">{userProfile.name}</h2>
                                    <p className="text-indigo-200 mt-1 max-w-md">{userProfile.bio.substring(0, 100)}{userProfile.bio.length > 100 ? '...' : ''}</p>
                                </div>
                            </div>
                       </div>
                       <div className="p-8 bg-white dark:bg-gray-800">
                           <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Share this Profile</h3>
                           <p className="text-gray-500 dark:text-gray-400 mt-1">Share your newly generated README with your network.</p>
                           <div className="mt-4 flex gap-4">
                               <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors">
                                   Share on X
                               </a>
                               <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                   Share on LinkedIn
                               </a>
                           </div>
                           <div className="mt-6 text-center">
                               <p className="text-sm text-gray-400">Generated with GitHub README Generator</p>
                           </div>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SocialCardModal;