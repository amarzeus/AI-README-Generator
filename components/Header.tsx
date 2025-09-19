import React from 'react';

const GithubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

const LinkedInIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
  </svg>
);

const logoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARRSURBVHhe7VtNqB5FFP7+7s7s7s4+2KWLthVBLGwUUREUFBQfUFA8iB4EBUV8UbwpraygoI/6oI/gQQ/iQY/iQXwQFPGgLSkWKvYiWJBYSwsLsb0sC3a3t7t3+n6Zmd3b3Z2d3b2ZtWdy82bmnOn75syZMzchISEhISEhISEhISEh4eQhaWlpsWHDhtw3a9Ys1K9fP1RUVNiNGzfCXr582d2BAwfCqqurw2VlZfHk/b1798K9e/fC/v37xxWdPHky3Lp1K3zhwoXw3r170bJlyxY4ffr0uP3tt99GixYtivvHjx93P3HiRKhr164xP2/ePKhdu3ZRtWvXjgoLC4OVK1fG94YOHRp17Ngx8t21a1fUqVMn1KVLl1h2cnKixowZE3Xt2jWqqKiI+vr06RPq0qVLyPfu3RslJSUF1alTRyUnJ8dS7t27F3Xv3j0qLS0NlZeXx/r79+8PdevWDfXr1w8lJibG/WvXrkV9+/ZNy5YtG5aUlBTpOXr0aNShQwcoKCgIFRQUxLK0tDR4+fJlHD58uPj5/fv34bPPPouvv/46+PjxY/x+9OhRrFu3Lh4/fhwLCwuD1atXw9dffw2NjY3hwsKCePb19fXBlStXjOuvX7+OlStXjtu7d++GdevWxbW1tWGPHj1i/vr162FoaCh89uxZtG3bNrh582Z4+vRpePPmzTBnzpzw9OnT8IABA+D+/ftx+6VLl+DWrVuxfvDgwRg+f/483L17N2zevBnOnz8fnj59Gt6+fRvu3bsXbt68GY4cORMOHz4crq6uwosXL8Lly5fDqVOnwtmzZ8OpU6fClStXjtsTJ06EvXv3xt1r1qxx3/79+8O9e/fCb7/9Fvbv3x+urq7C6dOnwe3btw+vXr0aXrx4EV5eXg4rKirCzZs34/Zt27ZFYWFh4PPPP4/379+PoaGhODs7i5MnT8bfv/76azx//jz+/vDDD2FtbQ07duyIV1dXw+DgYDx5+uDBg/jw4UO8vb0dfvvtN9y9excOHDgQLi8vj2cLCgqCmzZtGtdv2rQJ9+/fD2vXrh13RUVFePbsWbz+27dvY8eOHfH8+PHjMX7y5Ek8e/YsVlZWRhISEl6MHDlywE9/+tP4448/xg8//NAo4tChQ2FpaWncBQUFMXB9fX348uTJqH79+vHp06cjJiYmVFFREd5++22cO3cubt2+fXtcXV2N2zds2BBv374dDx8+DFdXV+P5sLAw3L59O+zevXvUoUMHlJKS0nj+5MmTkZeXF/Xs2TMqLy8PjY2N4V27dsFvv/0W165dG15eXg4//fRTSEtLG9esX78+/PXXX8Pl5eXx7LKyMjw6OhrVqVNHiIuLiwMHDsQff/whXr58Gffv348rKytjb3h4OBYWFkZCQkKc79ixo9jY2JBycnLyH3xKcnJypGvXruGlS5fitrS0xNu3bw8bN24cbty5cye8e/cubNmyJezevbv8vnv3blhbWwvv37+P27dv346BgYGwtLQUnj17FpYuXYpbt25FO3bsiGvXrsVbt25F+/btw19++SX++OMP+PXXX+Odd96JW7dupY+Pj/g/+OADrFy5Mm7duHEDR48ejaWlpfG7cuVK5Ofnx5oNGzYMd+7cicWLFw+rra0dN2zZsiV+/vln+Oijj+L9+vUTn3vuOcjLywsJCQn/G8XFxUGjRo3Cp59+Gs8//zz8/PPP8d9//z2qqakJlZWVoWXLlsHFixfDrVu3wq1btyIkJCQkJCQkJCQkJCQkLg//B740+L76Ff+PAAAAAElFTkSuQmCC";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <img src={logoDataUri} alt="AI README Generator Logo" className="h-9 w-9" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
             AI README Generator
            </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/amar-kumar-profile"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://twitter.com/amar_zeus"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Profile"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/amarzeus/ai-github-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;