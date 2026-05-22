import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

export function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // We are simulating an ambient player visually. In a real app we'd use <audio> tags.
  const tracks = [
    { id: 1, name: 'Sapa Morning Breeze', type: 'nature' },
    { id: 2, name: 'Hanoi Cafe Lo-Fi', type: 'lofi' },
    { id: 3, name: 'Traditional Acoustic', type: 'acoustic' }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPicker(!showPicker)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] shadow-sm hover:scale-105 active:scale-95 transition-transform"
      >
        <Music className="w-5 h-5" />
      </button>

      {showPicker && (
        <div className="absolute right-0 top-12 w-64 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-[var(--font-heading)] font-semibold text-[var(--text-primary)]">Ambient Audio</h4>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Volume2 className="w-4 h-4" />
            </div>
          </div>
          
          <div className="space-y-2">
            {tracks.map(track => (
              <button 
                key={track.id}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[var(--accent-light)] group transition-colors"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">{track.name}</span>
                  <span className="text-xs text-[var(--text-secondary)] capitalize">{track.type}</span>
                </div>
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-[var(--accent)]" />
                ) : (
                  <Play className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
