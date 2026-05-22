import React, { useContext } from 'react';
import { Compass, Map as MapIcon, Users, User, Sparkles } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenChat: () => void;
}

export function BottomNav({ activeTab, onTabChange, onOpenChat }: Props) {
  const { t } = useContext(LanguageContext);

  const tabs = [
    { id: 'explore', icon: Compass, label: t('explore') },
    { id: 'map', icon: MapIcon, label: t('map') },
    { id: 'chat', icon: Sparkles, label: t('chat'), isAction: true },
    { id: 'community', icon: Users, label: t('community') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[var(--bg-secondary)] border-t border-[var(--border)] px-4 py-2 flex justify-between items-end z-40 pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        
        if (tab.isAction) {
          return (
            <div key={tab.id} className="relative -top-5 flex flex-col items-center">
              <button
                onClick={onOpenChat}
                className="bg-[var(--accent)] text-white p-4 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] shadow-[var(--accent-light)] hover:scale-105 active:scale-95 transition-all outline-none"
              >
                <Icon className="w-6 h-6" />
              </button>
            </div>
          );
        }

        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${
              isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-[var(--accent-light)]' : 'bg-transparent'}`}>
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
