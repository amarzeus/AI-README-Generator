
import { GoogleGenAI } from "@google/genai";
import type { UserProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const createPrompt = (profile: UserProfile): string => {
  return `
You are an expert GitHub profile README generator. Your task is to create a visually appealing, professional, and engaging README.md file in Markdown format based on the following JSON data:
${JSON.stringify(profile, null, 2)}

**INSTRUCTIONS:**

1.  **Header:** Start with a creative greeting like "Hi there, I'm ${profile.name} 👋" or something similar. Use a level 1 heading (#).
2.  **About Me:** Create a section titled "🚀 About Me" (or a similar engaging title) with a level 2 heading (##). Use the provided 'bio'. Make it sound professional and enthusiastic.
3.  **Skills:** Create a "🛠️ Skills" section (##). List the skills from the 'skills' field. For each skill, generate a Shields.io badge. Use the 'for-the-badge' style.
    *   **Badge URL Format:** \`https://img.shields.io/badge/SKILL_NAME-HEX_COLOR?style=for-the-badge&logo=LOGO_NAME&logoColor=white\`
    *   **Important:** Automatically find appropriate HEX_COLOR and LOGO_NAME for popular technologies (e.g., React: logo='react', color='20232A', logoColor='61DAFB'; TypeScript: logo='typescript', color='3178C6'). If a logo is not available on simpleicons.org, just display the text on the badge.
    *   Arrange the badges neatly, perhaps in a single line or wrapped.
4.  **Connect with me:** Create a "🔗 Connect with me" section (##). Provide links to the user's social media. Use icons or simple text links.
    *   LinkedIn: \`https://linkedin.com/in/${profile.linkedinUsername}\`
    *   Twitter: \`https://twitter.com/${profile.twitterUsername}\`
    *   Website: \`${profile.website}\` (if provided).
5.  **GitHub Stats:** If 'showGithubStats' is true, include a section "📊 GitHub Stats" (##). Add a GitHub Readme Stats card.
    *   **URL:** \`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=radical&hide_border=true&rank_icon=github\`
    *   Also include the Top Languages card: \`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=radical&hide_border=true\`
6.  **Overall Tone:** Keep it professional but personal and friendly. Use emojis to make it visually appealing.
7.  **Final Output:** The entire response MUST be a single block of valid Markdown code. Do not include any explanations, comments, or text outside of the Markdown content. Do not wrap it in markdown code fences (\`\`\`).
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
