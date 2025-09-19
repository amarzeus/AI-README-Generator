import React from 'react';

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 rounded-md shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-5 border-b border-gray-300 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-5 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent };