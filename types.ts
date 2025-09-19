export interface Project {
  name: string;
  description: string;
  url: string;
}

export interface ProfilePictureStyle {
  isCircular: boolean;
  hasBorder: boolean;
  borderColor: string;
  hasShadow: boolean;
  shadowIntensity: 'Subtle' | 'Medium' | 'Strong';
}

export interface UserProfile {
  name: string;
  bio: string;
  skills: string;
  githubUsername: string;
  linkedinUsername: string;
  twitterUsername: string;
  website: string;
  showGithubStats: boolean;
  githubStatsTheme: string;
  githubStatsHideStats: string[];
  githubStatsTopLangsLayout: string;
  githubStatsBorderRadius: string;
  githubStatsHideBorder: boolean;
  githubStatsDisableAnimations: boolean;
  profilePicture: string; // This will be a base64 data URL
  profilePictureStyle: ProfilePictureStyle;
  portfolioUrl: string;
  blogUrl: string;
  education: {
    university: string;
    degree: string;
    graduationYear: string;
  };
  projects: Project[];
  generationStyle: 'Creative' | 'Balanced' | 'Precise';
}