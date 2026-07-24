import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search safety specs, SKU, or keywords...',
  className,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative flex items-center w-full max-w-md', className)}>
      <span className="material-symbols-outlined absolute left-3 text-on-surface-variant pointer-events-none">
        search
      </span>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface-container-high border border-outline-variant text-on-surface font-body-lg pl-10 pr-4 py-2 rounded-sm transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
      />
    </form>
  );
};
