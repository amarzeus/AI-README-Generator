import React, { useRef, useState } from 'react';
import type { UserProfile, Project } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Switch } from './ui/Switch';
import { Select } from './ui/Select';

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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round text-gray-500 dark:text-gray-400 w-8 h-8"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
);

const ImageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image w-8 h-8 text-gray-500 dark:text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const STATS_OPTIONS = ['stars', 'commits', 'prs', 'issues', 'contribs'] as const;

const InputForm: React.FC<InputFormProps> = ({ userProfile, setUserProfile, onGenerate, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [urlErrors, setUrlErrors] = useState<Record<string, boolean>>({});

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
  
  const handlePictureStyleChange = <K extends keyof UserProfile['profilePictureStyle']>(
    field: K,
    value: UserProfile['profilePictureStyle'][K]
  ) => {
    setUserProfile(prev => ({
        ...prev,
        profilePictureStyle: {
            ...prev.profilePictureStyle,
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
    handleChange('projects', [...userProfile.projects, { name: '', description: '', url: '', image: '' }]);
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

  const triggerProjectImageUpload = (index: number) => {
    setActiveProjectIndex(index);
    projectImageInputRef.current?.click();
  };

  const handleProjectImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeProjectIndex !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleProjectChange(activeProjectIndex, 'image', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = ''; // Allow re-uploading the same file
    setActiveProjectIndex(null);
  };
  
  const handleHideStatsChange = (stat: string) => {
    const currentHidden = userProfile.githubStatsHideStats;
    const isHidden = currentHidden.includes(stat);
    const newHidden = isHidden
      ? currentHidden.filter(s => s !== stat)
      : [...currentHidden, stat];
    handleChange('githubStatsHideStats', newHidden);
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const validateUrl = (value: string): boolean => {
    if (!value) return true; // Don't validate empty strings
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (e) {
        return false;
    }
  }

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      const isValid = validateUrl(value);
      setUrlErrors(prev => ({ ...prev, [id]: !isValid }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <input
            type="file"
            ref={projectImageInputRef}
            onChange={handleProjectImageFileChange}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
        />
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={userProfile.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g., Ada Lovelace" />
        </div>

        <div className="space-y-4">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {userProfile.profilePicture ? (
                        <img src={userProfile.profilePicture} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={triggerFileSelect} variant="default" size="sm">
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
                        <Button onClick={() => handleChange('profilePicture', '')} variant="ghost" size="sm" className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50">
                           <TrashIcon />
                           Remove
                        </Button>
                    )}
                </div>
            </div>
             <div className="space-y-4 rounded-md border border-gray-300 dark:border-gray-700 p-4">
                <Label className="font-semibold">Profile Picture Styling</Label>
                <div className="flex items-center justify-between">
                    <Label htmlFor="is-circular" className="font-normal text-sm">Circular Crop</Label>
                    <Switch
                        id="is-circular"
                        checked={userProfile.profilePictureStyle.isCircular}
                        onCheckedChange={(checked) => handlePictureStyleChange('isCircular', checked)}
                    />
                </div>
                 <div className="flex items-center justify-between">
                    <Label htmlFor="has-shadow" className="font-normal text-sm">Enable Shadow</Label>
                    <Switch
                        id="has-shadow"
                        checked={userProfile.profilePictureStyle.hasShadow}
                        onCheckedChange={(checked) => handlePictureStyleChange('hasShadow', checked)}
                    />
                </div>
                {userProfile.profilePictureStyle.hasShadow && (
                    <div className="space-y-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                        <Label htmlFor="shadow-intensity">Shadow Intensity</Label>
                        <Select
                            id="shadow-intensity"
                            value={userProfile.profilePictureStyle.shadowIntensity}
                            onChange={(e) => handlePictureStyleChange('shadowIntensity', e.target.value as UserProfile['profilePictureStyle']['shadowIntensity'])}
                        >
                            <option value="Subtle">Subtle</option>
                            <option value="Medium">Medium</option>
                            <option value="Strong">Strong</option>
                        </Select>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <Label htmlFor="has-border" className="font-normal text-sm">Enable Border</Label>
                    <Switch
                        id="has-border"
                        checked={userProfile.profilePictureStyle.hasBorder}
                        onCheckedChange={(checked) => handlePictureStyleChange('hasBorder', checked)}
                    />
                </div>
                {userProfile.profilePictureStyle.hasBorder && (
                     <div className="space-y-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                        <Label htmlFor="border-color">Border Color</Label>
                        <div className="relative">
                             <Input
                                id="border-color"
                                type="text"
                                value={userProfile.profilePictureStyle.borderColor}
                                onChange={(e) => handlePictureStyleChange('borderColor', e.target.value)}
                                placeholder="#4f46e5"
                                className="pl-12"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <input 
                                    type="color" 
                                    value={userProfile.profilePictureStyle.borderColor} 
                                    onChange={(e) => handlePictureStyleChange('borderColor', e.target.value)}
                                    className="w-6 h-6 p-0 border-none rounded-md bg-transparent cursor-pointer appearance-none"
                                    style={{'WebkitAppearance': 'none'}}
                                />
                            </div>
                        </div>
                    </div>
                )}
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
                    <div key={index} className="border border-gray-300 dark:border-gray-700 p-4 rounded-md space-y-3 relative">
                         <Button onClick={() => handleRemoveProject(index)} variant="ghost" size="sm" className="absolute top-2 right-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50">
                            <TrashIcon />
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 space-y-3">
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
                                    <Input 
                                        id={`project-url-${index}`} 
                                        value={project.url} 
                                        onChange={e => handleProjectChange(index, 'url', e.target.value)} 
                                        onBlur={handleUrlBlur}
                                        placeholder="https://your-project.com" 
                                        className={urlErrors[`project-url-${index}`] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:focus:border-red-500' : ''}
                                    />
                                    {urlErrors[`project-url-${index}`] && <p className="text-xs text-red-500 mt-1">Please enter a valid URL (e.g., https://example.com)</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Project Image</Label>
                                <div className="aspect-video w-full rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                    {project.image ? (
                                        <img src={project.image} alt={`${project.name} preview`} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon />
                                    )}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button onClick={() => triggerProjectImageUpload(index)} variant="default" size="sm" className="w-full text-xs">
                                        <UploadIcon />
                                        Upload
                                    </Button>
                                    {project.image && (
                                        <Button onClick={() => handleProjectChange(index, 'image', '')} variant="ghost" size="sm" className="w-full text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 text-xs">
                                            <TrashIcon />
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                 <Button onClick={handleAddProject} variant="default" className="w-full border-dashed">
                    <PlusIcon />
                    Add Project
                </Button>
            </div>
        </div>

        <div>
            <Label className="text-lg font-semibold">Education</Label>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-md">
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
               <Input 
                    id="website" 
                    value={userProfile.website} 
                    onChange={e => handleChange('website', e.target.value)} 
                    onBlur={handleUrlBlur}
                    placeholder="https://your.domain" 
                    className={urlErrors['website'] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:focus:border-red-500' : ''}
                />
                {urlErrors['website'] && <p className="text-xs text-red-500 mt-1">Please enter a valid URL (e.g., https://example.com)</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
               <Input 
                    id="portfolio" 
                    value={userProfile.portfolioUrl} 
                    onChange={e => handleChange('portfolioUrl', e.target.value)} 
                    onBlur={handleUrlBlur}
                    placeholder="https://your.portfolio"
                    className={urlErrors['portfolio'] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:focus:border-red-500' : ''}
                />
                {urlErrors['portfolio'] && <p className="text-xs text-red-500 mt-1">Please enter a valid URL (e.g., https://example.com)</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog">Blog URL</Label>
               <Input 
                    id="blog" 
                    value={userProfile.blogUrl} 
                    onChange={e => handleChange('blogUrl', e.target.value)} 
                    onBlur={handleUrlBlur}
                    placeholder="https://your.blog" 
                    className={urlErrors['blog'] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:focus:border-red-500' : ''}
                />
                {urlErrors['blog'] && <p className="text-xs text-red-500 mt-1">Please enter a valid URL (e.g., https://example.com)</p>}
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
        {userProfile.showGithubStats && (
             <div className="space-y-4 rounded-md border border-gray-300 dark:border-gray-700 p-4">
                <div className="space-y-2">
                    <Label htmlFor="github-stats-theme">Stats Card Theme</Label>
                    <Select
                        id="github-stats-theme"
                        value={userProfile.githubStatsTheme}
                        onChange={(e) => handleChange('githubStatsTheme', e.target.value)}
                    >
                        <option value="radical">Radical</option>
                        <option value="merko">Merko</option>
                        <option value="gruvbox">Gruvbox</option>
                        <option value="dracula">Dracula</option>
                        <option value="onedark">One Dark</option>
                        <option value="cobalt">Cobalt</option>
                        <option value="synthwave">Synthwave</option>
                        <option value="tokyonight">Tokyo Night</option>
                        <option value="solarized_dark">Solarized Dark</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Hide Specific Stats</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                        {STATS_OPTIONS.map(stat => (
                            <div key={stat} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`hide-${stat}`}
                                    className="h-4 w-4 rounded border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-blue-600 focus:ring-blue-500"
                                    checked={userProfile.githubStatsHideStats.includes(stat)}
                                    onChange={() => handleHideStatsChange(stat)}
                                />
                                <Label htmlFor={`hide-${stat}`} className="capitalize font-normal">{stat}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="hide-border"
                            checked={userProfile.githubStatsHideBorder}
                            onCheckedChange={(checked) => handleChange('githubStatsHideBorder', checked)}
                        />
                        <Label htmlFor="hide-border" className="font-normal">Hide Card Border</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="disable-animations"
                            checked={userProfile.githubStatsDisableAnimations}
                            onCheckedChange={(checked) => handleChange('githubStatsDisableAnimations', checked)}
                        />
                        <Label htmlFor="disable-animations" className="font-normal">Disable Animations</Label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="top-langs-layout">Top Languages Layout</Label>
                        <Select
                            id="top-langs-layout"
                            value={userProfile.githubStatsTopLangsLayout}
                            onChange={(e) => handleChange('githubStatsTopLangsLayout', e.target.value)}
                        >
                            <option value="compact">Compact</option>
                            <option value="normal">Normal</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="border-radius">Card Border Radius (px)</Label>
                        <Input
                            id="border-radius"
                            type="number"
                            value={userProfile.githubStatsBorderRadius}
                            onChange={(e) => handleChange('githubStatsBorderRadius', e.target.value)}
                            placeholder="e.g., 8"
                        />
                    </div>
                </div>
            </div>
        )}
        <div className="space-y-2 pt-2">
            <Label htmlFor="generation-style">Generation Style</Label>
            <Select
                id="generation-style"
                value={userProfile.generationStyle}
                onChange={(e) => handleChange('generationStyle', e.target.value as UserProfile['generationStyle'])}
            >
                <option value="Creative">Creative</option>
                <option value="Balanced">Balanced</option>
                <option value="Precise">Precise</option>
            </Select>
            <p className="text-xs text-gray-500 dark:text-gray-400 min-h-[2.25rem] pt-1">
                {userProfile.generationStyle === 'Creative' && 'Enthusiastic and friendly tone. Uses emojis liberally and may have unconventional section titles to show off your personality.'}
                {userProfile.generationStyle === 'Balanced' && 'The default style. Creates a professional yet approachable README. Uses emojis moderately and maintains a clean, organized structure.'}
                {userProfile.generationStyle === 'Precise' && 'Formal and technical. Avoids emojis and conversational language, focusing on a direct, concise presentation. Ideal for corporate profiles.'}
            </p>
        </div>
        <Button onClick={onGenerate} disabled={isLoading} variant="primary" className="w-full">
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