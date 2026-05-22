/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AmbientPlayer } from './components/AmbientPlayer';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AIChatSheet } from './components/AIChatSheet';
import { Theme } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [theme, setTheme] = useState<Theme>('vibrant');
  const [showChat, setShowChat] = useState(false);
  const [customColors, setCustomColors] = useState({ bg: '#FFF0F3', accent: '#FFB5A7', accentLight: '#FCD5CE' });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'custom') {
      document.documentElement.style.setProperty('--custom-bg', customColors.bg);
      document.documentElement.style.setProperty('--custom-accent', customColors.accent);
      document.documentElement.style.setProperty('--custom-accent-light', customColors.accentLight);
    } else {
      document.documentElement.style.removeProperty('--custom-bg');
      document.documentElement.style.removeProperty('--custom-accent');
      document.documentElement.style.removeProperty('--custom-accent-light');
    }
  }, [theme, customColors]);

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center sm:p-6">
      {/* Mobile Prototype Container */}
      <div className="w-full h-[100dvh] sm:h-[844px] max-w-[390px] bg-[var(--bg-primary)] overflow-hidden sm:border-[8px] sm:border-gray-900 sm:rounded-[3rem] relative shadow-2xl transition-colors duration-500">
        
        {/* Dynamic Island / Top Nav Bar Area */}
        <div className="absolute top-0 w-full z-50 px-4 pt-10 pb-2 bg-gradient-to-b from-[var(--bg-primary)] to-transparent pointer-events-none flex justify-between items-start">
          <div className="pointer-events-auto">
            {/* Logo placeholder */}
            <div className="flex flex-col items-start leading-none">
              <h1 className="font-[var(--font-heading)] font-black text-3xl tracking-tighter flex items-center">
                <span className="text-[var(--accent)] transform -rotate-12 inline-block -ml-1 animate-pulse">L</span>
                <span className="-ml-1 text-[var(--text-primary)]">acation</span>
              </h1>
              <span className="text-[10px] font-medium text-[var(--text-secondary)] italic ml-1 font-[var(--font-serif)]">
                sự La cà
              </span>
            </div>
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <AmbientPlayer />
          </div>
        </div>

        {/* Content Area */}
        <div className="h-full pt-20">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {activeTab === 'explore' && <HomeScreen />}
              {activeTab === 'map' && <MapScreen />}
              {activeTab === 'community' && <CommunityScreen />}
              {activeTab === 'profile' && (
                <ProfileScreen 
                  theme={theme} 
                  onThemeChange={setTheme} 
                  customColors={customColors} 
                  onCustomColorsChange={setCustomColors} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 w-full z-50">
           <div className="h-16 w-full bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none absolute bottom-14" />
           <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onOpenChat={() => setShowChat(true)} />
        </div>

        <AnimatePresence>
          {showChat && <AIChatSheet onClose={() => setShowChat(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
