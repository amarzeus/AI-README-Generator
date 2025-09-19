import React, { useRef } from 'react';
import type { UserProfile, Project } from '../types';
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wand-2 h-5 w-5"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
);

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 w-4 h-4 mr-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round text-gray-400 w-8 h-8"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
);

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const InputForm: React.FC<InputFormProps> = ({ userProfile, setUserProfile, onGenerate, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof UserProfile,>(field: K, value: UserProfile[K]) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };
  
  const handleEducationChange = (field: keyof UserProfile['education'], value: string) => {
    setUserProfile(prev => ({
        ...prev,
        education: {
            ...prev.education,
            [field]: value,
        },
    }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...userProfile.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    handleChange('projects', updatedProjects);
  };

  const handleAddProject = () => {
    handleChange('projects', [...userProfile.projects, { name: '', description: '', url: '' }]);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = userProfile.projects.filter((_, i) => i !== index);
    handleChange('projects', updatedProjects);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleChange('profilePicture', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

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
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {userProfile.profilePicture ? (
                        <img src={userProfile.profilePicture} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={triggerFileSelect} variant="ghost">
                        <UploadIcon />
                        Upload Image
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/gif"
                        className="hidden"
                    />
                    {userProfile.profilePicture && (
                        <Button onClick={() => handleChange('profilePicture', '')} variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/50">
                           <TrashIcon />
                           Remove
                        </Button>
                    )}
                </div>
            </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={userProfile.bio} onChange={e => handleChange('bio', e.target.value)} placeholder="Tell us about yourself..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea id="skills" value={userProfile.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="Comma separated, e.g., React, Next.js, Docker" />
        </div>

        <div>
            <Label className="text-lg font-semibold">Projects</Label>
            <div className="mt-2 space-y-4">
                {userProfile.projects.map((project, index) => (
                    <div key={index} className="border border-gray-700 p-4 rounded-md space-y-3 relative">
                         <Button onClick={() => handleRemoveProject(index)} variant="ghost" size="sm" className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-900/50">
                            <TrashIcon />
                        </Button>
                        <div className="space-y-2">
                            <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                            <Input id={`project-name-${index}`} value={project.name} onChange={e => handleProjectChange(index, 'name', e.target.value)} placeholder="e.g., My Awesome App" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`project-desc-${index}`}>Description</Label>
                            <Textarea id={`project-desc-${index}`} value={project.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} placeholder="A short description of your project." rows={2} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`project-url-${index}`}>Live URL</Label>
                            <Input id={`project-url-${index}`} value={project.url} onChange={e => handleProjectChange(index, 'url', e.target.value)} placeholder="https://your-project.com" />
                        </div>
                    </div>
                ))}
                 <Button onClick={handleAddProject} variant="ghost" className="w-full border-2 border-dashed border-gray-600 hover:border-gray-500">
                    <PlusIcon />
                    Add Project
                </Button>
            </div>
        </div>

        <div>
            <Label className="text-lg font-semibold">Education</Label>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-700 p-4 rounded-md">
                 <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="university">University Name</Label>
                    <Input id="university" value={userProfile.education.university} onChange={e => handleEducationChange('university', e.target.value)} placeholder="e.g., Stanford University" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" value={userProfile.education.degree} onChange={e => handleEducationChange('degree', e.target.value)} placeholder="e.g., M.S. in Computer Science" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input id="graduationYear" value={userProfile.education.graduationYear} onChange={e => handleEducationChange('graduationYear', e.target.value)} placeholder="e.g., 2024" />
                </div>
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input id="portfolio" value={userProfile.portfolioUrl} onChange={e => handleChange('portfolioUrl', e.target.value)} placeholder="https://your.portfolio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog">Blog URL</Label>
              <Input id="blog" value={userProfile.blogUrl} onChange={e => handleChange('blogUrl', e.target.value)} placeholder="https://your.blog" />
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