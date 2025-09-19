import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'default' | 'ghost';
  size?: 'default' | 'sm';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-65 border";

    const focusRingClasses = "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0d1117]";

    const variantClasses = {
      primary: "bg-[#238636] text-white border-transparent hover:bg-[#2ea043]",
      default: "bg-[#f6f8fa] text-[#24292f] border-[rgba(27,31,36,0.15)] hover:bg-[#f3f4f6] dark:bg-[#21262d] dark:text-[#c9d1d9] dark:border-[rgba(240,246,252,0.1)] dark:hover:bg-[#30363d] dark:hover:border-gray-600",
      ghost: "text-blue-600 hover:bg-blue-100/50 dark:text-blue-500 dark:hover:bg-blue-900/20 border-transparent",
    };

    const sizeClasses = {
        default: 'h-9 px-4',
        sm: 'h-8 rounded-md px-3',
    };

    return (
      <button
        className={`${baseClasses} ${focusRingClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };