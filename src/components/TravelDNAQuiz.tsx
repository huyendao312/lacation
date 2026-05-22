import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (traits: string[]) => void;
  initialTraits: string[];
}

const ALL_TRAITS = [
  { id: '#SlowTraveler', label: 'Slow Traveler', color: 'bg-[#FDE2E4] text-[#C9184A]' },
  { id: '#EcoWarrior', label: 'Eco Warrior', color: 'bg-[#E2ECE9] text-[#2D6A4F]' },
  { id: '#StreetFoodGourmet', label: 'Street Food Gourmet', color: 'bg-[#FFF1E6] text-[#D08C60]' },
  { id: '#IntrovertFriendly', label: 'Introvert Friendly', color: 'bg-[#EDF2FB] text-[#003566]' },
  { id: '#CultureVulture', label: 'Culture Vulture', color: 'bg-purple-100 text-purple-800' },
  { id: '#ThrillSeeker', label: 'Thrill Seeker', color: 'bg-red-100 text-red-800' },
  { id: '#NightOwl', label: 'Night Owl', color: 'bg-indigo-100 text-indigo-800' },
  { id: '#BudgetBackpacker', label: 'Budget Backpacker', color: 'bg-green-100 text-green-800' },
];

export function TravelDNAQuiz({ onClose, onSave, initialTraits }: Props) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialTraits);

  const toggleTrait = (id: string) => {
    setSelectedTraits(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-primary)] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <h2 className="font-bold text-lg text-[var(--text-primary)]">Update Travel DNA</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-primary)] rounded-full transition-colors text-[var(--text-secondary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Select the traits that best describe your travel style. This helps our AI personalize your itineraries.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {ALL_TRAITS.map(trait => {
                const isSelected = selectedTraits.includes(trait.id);
                return (
                  <button
                    key={trait.id}
                    onClick={() => toggleTrait(trait.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                      isSelected ? trait.color + ' ring-2 ring-offset-2 ring-black/10' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {trait.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            onClick={() => onSave(selectedTraits)}
            className="w-full py-3 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
