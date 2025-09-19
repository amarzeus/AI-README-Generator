
import React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, id, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange(event.target.checked);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 
        ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform 
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
        <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
            className="sr-only"
            {...props}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };