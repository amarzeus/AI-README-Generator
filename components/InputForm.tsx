import React from 'react';
import type { UserProfile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Switch } from './ui/Switch';

interface InputFormProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const WandIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wand-2">
        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
        <path d="m14 7 3 3"/>
        <path d="M5 6v4"/>
        <path d="M19 14v4"/>
        <path d="M10 2v2"/>
        <path d="M7 8H3"/>
        <path d="M21 16h-4"/>
        <path d="M11 3H9"/>
    </svg>
);


const InputForm: React.FC<InputFormProps> = ({ userProfile, setUserProfile, onGenerate, isLoading }) => {
  const handleChange = <K extends keyof UserProfile,>(field: K, value: UserProfile[K]) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={userProfile.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g., Ada Lovelace" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={userProfile.bio} onChange={e => handleChange('bio', e.target.value)} placeholder="Tell us about yourself..." rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea id="skills" value={userProfile.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="Comma separated, e.g., React, Next.js, Docker" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input id="github" value={userProfile.githubUsername} onChange={e => handleChange('githubUsername', e.target.value)} placeholder="your-username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Username</Label>
              <Input id="linkedin" value={userProfile.linkedinUsername} onChange={e => handleChange('linkedinUsername', e.target.value)} placeholder="your-username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Username</Label>
              <Input id="twitter" value={userProfile.twitterUsername} onChange={e => handleChange('twitterUsername', e.target.value)} placeholder="your-handle" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" value={userProfile.website} onChange={e => handleChange('website', e.target.value)} placeholder="https://your.domain" />
            </div>
        </div>
         <div className="flex items-center space-x-2 pt-2">
            <Switch
                id="github-stats"
                checked={userProfile.showGithubStats}
                onCheckedChange={(checked) => handleChange('showGithubStats', checked)}
            />
            <Label htmlFor="github-stats">Include GitHub Stats Card</Label>
        </div>
        <Button onClick={onGenerate} disabled={isLoading} className="w-full">
            {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                 <WandIcon />
                 <span>Generate README</span>
              </div>
            )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InputForm;