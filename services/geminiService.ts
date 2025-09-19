import { GoogleGenAI } from "@google/genai";
import type { UserProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const createPrompt = (profile: UserProfile): string => {
  return `
You are an expert GitHub profile README generator. Your task is to create a visually appealing, professional, and engaging README.md file based on the following JSON data.
The response must be **only** valid Markdown, with one exception for the profile picture as noted below.

**Profile Data:**
${JSON.stringify(profile, null, 2)}

**INSTRUCTIONS:**

1.  **Profile Picture:** If the \`profilePicture\` field is not empty, you **MUST** place an image at the very top of the README.
    *   This image **MUST** be rendered using an HTML \`<img>\` tag to ensure it is centered and circular.
    *   Use this exact HTML structure: \`<p align="center"><img src="${profile.profilePicture}" alt="${profile.name}" width="150" height="150" style="border-radius:50%;"></p>\`

2.  **Header:** After the profile picture (if any), add a level 1 heading (#) with a creative greeting, like "Hi there, I'm ${profile.name} 👋".

3.  **About Me:** Create a section titled "🚀 About Me" with a level 2 heading (##). Use the provided 'bio'.

4.  **Skills:** Create a "🛠️ Skills" section (##). List the skills from the 'skills' field. For each skill, generate a Shields.io badge with the 'for-the-badge' style.
    *   **Badge URL Format:** \`https://img.shields.io/badge/SKILL_NAME-HEX_COLOR?style=for-the-badge&logo=LOGO_NAME&logoColor=white\`
    *   **Important:** Automatically find appropriate HEX_COLOR and LOGO_NAME for popular technologies (e.g., React: logo='react', color='20232A', logoColor='61DAFB'). If a logo is unavailable, just use the skill name.

5.  **Connect with me:** Create a "🔗 Connect with me" section (##). Provide links to the user's social media.
    *   LinkedIn: \`https://linkedin.com/in/${profile.linkedinUsername}\`
    *   Twitter: \`https://twitter.com/${profile.twitterUsername}\`
    *   Website: \`${profile.website}\` (if provided).

6.  **GitHub Stats:** If 'showGithubStats' is true, include a "📊 GitHub Stats" section (##).
    *   Add the GitHub Readme Stats card: \`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=radical&hide_border=true&rank_icon=github\`
    *   Also include the Top Languages card: \`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=radical&hide_border=true\`

7.  **Final Output:** The entire response must be a single block of valid Markdown code. Do not include explanations, comments, or wrap it in markdown code fences (\`\`\`). The only exception is the HTML \`<img>\` tag for the profile picture as instructed.
`;
};

export const generateReadme = async (profile: UserProfile): Promise<string> => {
  try {
    const prompt = createPrompt(profile);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating README with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};