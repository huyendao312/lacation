import React from 'react';
import { Theme } from '../types';

interface Props {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: Props) {
  const themes: { id: Theme; label: string; color: string }[] = [
    { id: 'vibrant', label: 'Vibrant', color: 'bg-[#E63946]' },
    { id: 'eco', label: 'Eco', color: 'bg-green-600' },
    { id: 'minimal', label: 'Minimal', color: 'bg-gray-800' },
    { id: 'custom', label: 'Custom', color: 'bg-pink-300' },
  ];

  return (
    <div className="flex gap-2 p-2 bg-[var(--bg-secondary)] rounded-full shadow-sm border border-[var(--border)]">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onThemeChange(t.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            currentTheme === t.id
              ? 'bg-[var(--accent)] text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${t.color}`} />
          {t.label}
        </button>
      ))}
    </div>
  );
}
