export interface UserProfile {
  name: string;
  bio: string;
  skills: string;
  githubUsername: string;
  linkedinUsername: string;
  twitterUsername: string;
  website: string;
  showGithubStats: boolean;
  profilePicture: string; // This will be a base64 data URL
}