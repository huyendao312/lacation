import React, { useState, useContext } from 'react';
import { Leaf, Award, Footprints, Settings, ChevronRight, Plus, Calendar, Music, Type, RefreshCw, Palette, Globe } from 'lucide-react';
import { TravelDNAQuiz } from '../components/TravelDNAQuiz';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Theme } from '../types';
import { LanguageContext, languagesList, LanguageCode } from '../contexts/LanguageContext';

interface CustomColors {
  bg: string;
  accent: string;
  accentLight: string;
}

interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  customColors: CustomColors;
  onCustomColorsChange: (colors: CustomColors) => void;
}

export function ProfileScreen({ theme, onThemeChange, customColors, onCustomColorsChange }: Props) {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [showDiaryForm, setShowDiaryForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [diaryNote, setDiaryNote] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [diarySong, setDiarySong] = useState('');
  const [showDnaQuiz, setShowDnaQuiz] = useState(false);
  
  const [traits, setTraits] = useState<string[]>([
    '#SlowTraveler',
    '#EcoWarrior',
    '#StreetFoodGourmet',
    '#IntrovertFriendly'
  ]);

  const traitColors: Record<string, string> = {
    '#SlowTraveler': 'bg-[#FDE2E4] text-[#C9184A]',
    '#EcoWarrior': 'bg-[#E2ECE9] text-[#2D6A4F]',
    '#StreetFoodGourmet': 'bg-[#FFF1E6] text-[#D08C60]',
    '#IntrovertFriendly': 'bg-[#EDF2FB] text-[#003566]',
    '#CultureVulture': 'bg-purple-100 text-purple-800',
    '#ThrillSeeker': 'bg-red-100 text-red-800',
    '#NightOwl': 'bg-indigo-100 text-indigo-800',
    '#BudgetBackpacker': 'bg-green-100 text-green-800',
  };

  const handleSaveTraits = (newTraits: string[]) => {
    setTraits(newTraits);
    setShowDnaQuiz(false);
  };

  const songs = [
    'Hanoi Acoustic Mornings',
    'Sapa Breeze',
    'Lo-fi Da Lat',
    'Mekong Sunset'
  ];

  return (
    <div className="pb-24 pt-6 px-4 space-y-8 h-full overflow-y-auto">
       <div className="flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          {t('profile')}
        </h1>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 bg-[var(--bg-secondary)] rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors active:scale-95"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[var(--accent)] to-amber-500 mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)]">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Sarah L.</h2>
        <p className="text-sm text-[var(--text-secondary)]">Travel DNA: Cultured Explorer</p>
      </div>

      {/* Impact Score Card */}
      <div className="bg-[var(--impact-bg)] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 blur-xl">
          <Leaf className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-5 h-5" />
            <h3 className="font-semibold text-white/90">Impact Score</h3>
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-[var(--font-heading)] font-bold">1,240</span>
            <span className="text-sm text-white/80">pts</span>
          </div>
          
          <p className="text-sm text-white/80 leading-relaxed">
            Your travels have supported 12 local businesses and reduced 4kg of plastic waste.
          </p>

          <button className="mt-2 w-full py-2.5 bg-white/20 hover:bg-white/30 transition-colors rounded-xl font-medium text-sm flex items-center justify-center gap-2">
            View Full Report <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
         <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">Your Travel DNA</h3>
           <button 
             onClick={() => setShowDnaQuiz(true)}
             className="text-[var(--accent)] flex items-center gap-1 text-xs font-bold bg-[var(--accent-light)] px-2 py-1 rounded-full"
           >
             <RefreshCw className="w-3 h-3" /> Retake
           </button>
         </div>
         <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-6 space-y-4 shadow-sm">
            
            <div className="flex flex-wrap gap-2">
              {traits.length === 0 ? (
                <span className="text-sm text-[var(--text-secondary)] italic">No traits selected. Retake quiz!</span>
              ) : (
                traits.map(trait => (
                  <span key={trait} className={`px-3 py-1.5 text-xs font-bold rounded-xl ${traitColors[trait] || 'bg-gray-100 text-gray-800'}`}>
                    {trait}
                  </span>
                ))
              )}
            </div>

         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
          <Footprints className="w-6 h-6 text-amber-600" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Travel Log</span>
          <span className="text-xs text-[var(--text-secondary)]">2 offline vlogs</span>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
          <Award className="w-6 h-6 text-emerald-600" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Compatibility</span>
          <span className="text-xs text-[var(--text-secondary)]">Find matches</span>
        </div>
      </div>
      
      {/* Travel Diary Form Section */}
      <div className="space-y-3 mt-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">Travel Diary</h3>
           <button 
             onClick={() => setShowDiaryForm(!showDiaryForm)}
             className="text-[var(--accent)] flex items-center gap-1 text-xs font-bold bg-[var(--accent-light)] px-2 py-1 rounded-full"
           >
             <Plus className="w-4 h-4" /> Add Entry
           </button>
        </div>

        {showDiaryForm ? (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Date
              </label>
              <input 
                type="date"
                value={diaryDate}
                onChange={(e) => setDiaryDate(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Soundtrack
              </label>
              <select
                value={diarySong}
                onChange={(e) => setDiarySong(e.target.value)}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="">Select a song...</option>
                {songs.map(song => (
                  <option key={song} value={song}>{song}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> Notes
              </label>
              <textarea 
                value={diaryNote}
                onChange={(e) => setDiaryNote(e.target.value)}
                placeholder="What did you discover today?"
                rows={3}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            <button 
              onClick={() => {
                setShowDiaryForm(false);
                setDiaryNote('');
                setDiaryDate('');
                setDiarySong('');
              }}
              className="w-full py-2.5 bg-[var(--accent)] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Save Entry
            </button>
          </div>
        ) : (
          <div className="space-y-3">
             <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-5 shadow-sm space-y-3">
               <div className="flex justify-between items-start">
                 <span className="text-xs font-bold text-[var(--text-secondary)]">Oct 12, 2023</span>
                 <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-full flex items-center gap-1"><Music className="w-3 h-3"/> Hanoi Acoustic Mornings</span>
               </div>
               <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed">Found a hidden cafe in the Old Quarter. The egg coffee was incredible and the pace of life here is so different from what I'm used to.</p>
             </div>
          </div>
        )}
      </div>

      {showDnaQuiz && (
        <TravelDNAQuiz 
          initialTraits={traits}
          onClose={() => setShowDnaQuiz(false)}
          onSave={handleSaveTraits}
        />
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-primary)] p-6 space-y-6 overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-[var(--text-primary)]">{t('settings')}</h2>
            <button 
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-sm font-bold text-[var(--text-primary)]"
            >
              {t('done')}
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-secondary)] uppercase text-xs tracking-wider">{t('appearance')}</h3>
            
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[var(--text-primary)]">{t('theme')}</span>
                <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
              </div>

              {theme === 'custom' && (
                <div className="pt-4 border-t border-[var(--border)] space-y-3 animate-in fade-in">
                   <div className="flex items-center gap-2 mb-2">
                     <Palette className="w-4 h-4 text-[var(--text-secondary)]" />
                     <span className="text-sm font-bold text-[var(--text-primary)]">{t('customColors')}</span>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => onCustomColorsChange({ bg: '#FFF0F3', accent: '#FFB5A7', accentLight: '#FCD5CE' })}
                        className={`h-16 rounded-2xl bg-[#FFF0F3] border-2 flex items-center justify-center transition-all ${customColors.bg === '#FFF0F3' ? 'border-[#FFB5A7] scale-105' : 'border-transparent'}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#FFB5A7]" />
                      </button>

                      <button 
                        onClick={() => onCustomColorsChange({ bg: '#F3F4F6', accent: '#93C5FD', accentLight: '#DBEAFE' })}
                        className={`h-16 rounded-2xl bg-[#F3F4F6] border-2 flex items-center justify-center transition-all ${customColors.accent === '#93C5FD' ? 'border-[#93C5FD] scale-105' : 'border-transparent'}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#93C5FD]" />
                      </button>

                      <button 
                        onClick={() => onCustomColorsChange({ bg: '#FDF4FF', accent: '#D8B4E2', accentLight: '#F3E8FF' })}
                        className={`h-16 rounded-2xl bg-[#FDF4FF] border-2 flex items-center justify-center transition-all ${customColors.accent === '#D8B4E2' ? 'border-[#D8B4E2] scale-105' : 'border-transparent'}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#D8B4E2]" />
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-secondary)] uppercase text-xs tracking-wider">{t('language')}</h3>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-2 shadow-sm space-y-1">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${language === lang.code ? 'bg-[var(--accent-light)] text-[var(--accent)] font-bold' : 'text-[var(--text-primary)] hover:bg-[var(--bg-primary)] font-medium'}`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4" />
                    {lang.name}
                  </div>
                  {language === lang.code && <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
