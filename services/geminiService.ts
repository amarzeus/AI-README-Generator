import { GoogleGenAI } from "@google/genai";
import type { UserProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getStyleInstructions = (style: UserProfile['generationStyle']): string => {
  switch (style) {
    case 'Creative':
      return "You are a creative and enthusiastic assistant. Your tone should be friendly, engaging, and fun. Use emojis liberally to add personality. Feel free to use creative section titles and a more conversational writing style. The goal is a README that pops and shows off personality.";
    case 'Precise':
      return "You are a precise and professional assistant. Your tone must be formal, direct, and technical. Do not use any emojis. Focus on clarity, conciseness, and accuracy. The structure should be logical and straightforward, suitable for a corporate or highly technical audience.";
    case 'Balanced':
    default:
      return "You are a helpful and professional assistant. Your tone should be a balance between professional and approachable. Use emojis where appropriate to make the content more engaging, but don't overdo it. The structure should be clean, well-organized, and easy to read.";
  }
};

const createProfilePictureStyleString = (style: UserProfile['profilePictureStyle']): string => {
    const styles: string[] = [];
    styles.push(style.isCircular ? 'border-radius:50%;' : 'border-radius:12px;');

    if (style.hasBorder && style.borderColor) {
        const color = style.borderColor.match(/^#[0-9a-f]{6}$/i) ? style.borderColor : '#4f46e5';
        styles.push(`border: 4px solid ${color};`);
    }

    if (style.hasShadow) {
        const shadowValues = {
            Subtle: 'box-shadow: 0 4px 10px rgba(0,0,0,0.08);',
            Medium: 'box-shadow: 0 8px 24px rgba(0,0,0,0.12);',
            Strong: 'box-shadow: 0 15px 40px rgba(0,0,0,0.2);'
        };
        styles.push(shadowValues[style.shadowIntensity]);
    }
    
    styles.push('object-fit: cover;');

    return styles.join(' ');
};


const createPrompt = (profile: UserProfile): string => {
  const hiddenStats = profile.githubStatsHideStats.join(',');
  const profilePictureStyleString = createProfilePictureStyleString(profile.profilePictureStyle);

  const statsCardParams = new URLSearchParams({
    username: profile.githubUsername,
    show_icons: 'true',
    theme: profile.githubStatsTheme,
    rank_icon: 'github',
  });
  if (hiddenStats) statsCardParams.append('hide', hiddenStats);
  if (profile.githubStatsBorderRadius) statsCardParams.append('border_radius', profile.githubStatsBorderRadius);
  if (profile.githubStatsHideBorder) statsCardParams.append('hide_border', 'true');
  if (profile.githubStatsDisableAnimations) statsCardParams.append('disable_animations', 'true');
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?${statsCardParams.toString()}`;

  const streakCardParams = new URLSearchParams({
    user: profile.githubUsername,
    theme: profile.githubStatsTheme,
  });
  if (profile.githubStatsBorderRadius) streakCardParams.append('border_radius', profile.githubStatsBorderRadius);
  if (profile.githubStatsHideBorder) streakCardParams.append('hide_border', 'true');
  const streakCardUrl = `https://github-readme-streak-stats.herokuapp.com/?${streakCardParams.toString()}`;

  const topLangsCardParams = new URLSearchParams({
    username: profile.githubUsername,
    layout: profile.githubStatsTopLangsLayout,
    theme: profile.githubStatsTheme,
  });
  if (profile.githubStatsBorderRadius) topLangsCardParams.append('border_radius', profile.githubStatsBorderRadius);
  if (profile.githubStatsHideBorder) topLangsCardParams.append('hide_border', 'true');
  if (profile.githubStatsDisableAnimations) topLangsCardParams.append('disable_animations', 'true');
  const topLangsCardUrl = `https://github-readme-stats.vercel.app/api/top-langs/?${topLangsCardParams.toString()}`;
  
  const styleInstructions = getStyleInstructions(profile.generationStyle);

  return `
You are an expert GitHub profile README generator. Your task is to create a visually appealing, professional, and engaging README.md file based on the following JSON data.
The response must be **only** valid Markdown, with one exception for the profile picture as noted below.

**Generation Style & Tone:**
${styleInstructions}

**Profile Data:**
${JSON.stringify(profile, null, 2)}

**INSTRUCTIONS:**

1.  **Profile Picture:** If the \`profilePicture\` field is not empty, you **MUST** place an image at the very top of the README.
    *   This image **MUST** be rendered using an HTML \`<img>\` tag to ensure it is centered and styled correctly.
    *   Use this exact HTML structure: \`<p align="center"><img src="${profile.profilePicture}" alt="${profile.name}" width="150" height="150" style="${profilePictureStyleString}"></p>\`

2.  **Header:** After the profile picture (if any), add a level 1 heading (#) with a creative greeting, like "Hi there, I'm ${profile.name} 👋".

3.  **About Me:** Create a section titled "🚀 About Me" with a level 2 heading (##). Use the provided 'bio'.

4.  **Skills Section:**
    *   Create a section with a level 2 heading (##) titled "🛠️ Skills".
    *   For each skill in the 'skills' field (which is a comma-separated string), you **MUST** generate a corresponding Shields.io badge.
    *   The badges should be displayed inline, separated by spaces. Do not use lists.
    *   **Badge Generation Rules:**
        *   **Style:** Use the 'for-the-badge' style: \`style=for-the-badge\`.
        *   **Logo & Color:** You must research and find the official logo name and brand HEX color for each technology. Use these for the 'logo' and badge color parameters. For example, for "TypeScript", the logo is 'typescript' and the color is '3178C6'. For "Node.js", the skill name in the badge must be "Node.js", the logo 'node.js', and the color '339933'.
        *   **URL Encoding:** Ensure the skill name in the badge URL is properly encoded (e.g., spaces become '%20' or '+').
        *   **Logo Color:** The logo color should always be 'white' (\`logoColor=white\`).
        *   **Example Badge URL for TypeScript:** \`https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white\`
        *   **Fallback:** If you cannot find a specific logo for a skill, create a badge with just the skill name and a neutral color like '777'.
    *   **Output Format:** The output for this section must be a series of Markdown images, like \`![Skill Name](URL)\`.

5.  **Projects Section:**
    *   Create a section with a level 2 heading (##) titled "🚀 My Projects".
    *   **Only include this section if the 'projects' array in the JSON is not empty.**
    *   For each project in the array:
        *   Create a level 3 heading (###) with the project name linked to its URL: \`### [PROJECT_NAME](PROJECT_URL)\`
        *   **If the project object contains a non-empty 'image' field (which is a base64 data URL), you MUST display it right after the heading.** Use an HTML \`<img>\` tag to render it. The image should be responsive and have a subtle rounded border. Use this exact HTML structure: \`<p align="center"><img src="${"project.image"}" alt="${"project.name"}" style="width:100%; max-width: 600px; border-radius: 8px; margin-top: 8px; margin-bottom: 8px;"></p>\`
        *   Below the heading (and image, if present), add the project 'description'.
    
6.  **Education Section:**
    *   Create a section with a level 2 heading (##) titled "🎓 Education".
    *   **Only include this section if the 'education.university' field in the JSON is not empty.**
    *   Format the content as a single, bolded line: **${profile.education.university}** - ${profile.education.degree} (${profile.education.graduationYear})

7.  **Connect with me:** Create a "🔗 Connect with me" section (##). Provide links to the user's social media and websites. **Only include links for fields that are not empty in the JSON data.** Use the specified markdown link text.
    *   GitHub: \`[GitHub](https://github.com/${profile.githubUsername})\`
    *   LinkedIn: \`[LinkedIn](https://linkedin.com/in/${profile.linkedinUsername})\`
    *   Twitter: \`[Twitter](https://twitter.com/${profile.twitterUsername})\`
    *   Website: \`[Website](${profile.website})\`
    *   Portfolio: \`[Portfolio](${profile.portfolioUrl})\`
    *   Blog: \`[Blog](${profile.blogUrl})\`

8.  **GitHub Stats:** If 'showGithubStats' is true, include a "📊 GitHub Stats" section (##).
    *   Add the GitHub Readme Stats card: \`![](${statsCardUrl})\`
    *   Include the GitHub Streak Stats card: \`![](${streakCardUrl})\`
    *   Finally, include the Top Languages card: \`![](${topLangsCardUrl})\`

9.  **Final Output:** The entire response must be a single block of valid Markdown code. Do not include explanations, comments, or wrap it in markdown code fences (\`\`\`). The only exception is the HTML \`<img>\` tag for the profile picture as instructed.
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
    
    let errorMessage = "An unknown error occurred while communicating with the Gemini API.";

    if (error instanceof Error) {
        const lowerCaseMessage = error.message.toLowerCase();
        
        if (lowerCaseMessage.includes('api key not valid')) {
            errorMessage = 'The provided API key is invalid. Please ensure it is set correctly.';
        } else if (lowerCaseMessage.includes('quota') || lowerCaseMessage.includes('rate limit')) {
            errorMessage = 'You have exceeded your API quota for the Gemini API. Please check your usage or try again later.';
        } else if (lowerCaseMessage.includes('safety') || lowerCaseMessage.includes('blocked')) {
            errorMessage = 'The request was blocked due to safety settings. Please try adjusting your input text.';
        } else if (error.message.includes('[400]')) {
            errorMessage = `The request was malformed (Error 400). This can happen if the input data is too large or contains unexpected values. Details: ${error.message}`;
        } else {
            errorMessage = `Gemini API Error: ${error.message}`;
        }
    }
    
    throw new Error(errorMessage);
  }
};