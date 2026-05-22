import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Mic } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Track } from '../types';

interface Props {
  energyLevel: number;
  tracks: Track[];
}

export function MoodPlaylist({ energyLevel, tracks }: Props) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredTracks = tracks.filter(
    (t) => energyLevel >= t.energyRange[0] && energyLevel <= t.energyRange[1]
  );

  useEffect(() => {
    // If the active track is no longer in the filtered list, stop it.
    if (activeTrackId && !filteredTracks.some(t => t.id === activeTrackId)) {
      setIsPlaying(false);
      setActiveTrackId(null);
    }
  }, [energyLevel, activeTrackId, filteredTracks]);

  // Pause when unmounting
  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  const handleToggle = (trackId: string) => {
    if (activeTrackId === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrackId(trackId);
      setIsPlaying(true);
    }
  };

  const activeTrack = tracks.find(t => t.id === activeTrackId);

  return (
    <div className="bg-[var(--bg-secondary)] p-6 rounded-3xl border border-[var(--border)] shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[var(--font-heading)] font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Music className="w-5 h-5 text-[var(--accent)]" /> 
          Local Audio
        </h2>
        <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--bg-primary)] px-2 py-1 rounded-md border border-[var(--border)] gap-1 flex items-center">
          {filteredTracks.length} tracks
        </span>
      </div>

      <div className="space-y-2">
        {filteredTracks.length === 0 && (
          <p className="text-xs text-[var(--text-secondary)]">No tracks available for this mood and region.</p>
        )}
        {filteredTracks.map(track => {
          const isActive = activeTrackId === track.id;
          return (
            <div 
              key={track.id}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-colors cursor-pointer ${
                isActive 
                  ? 'border-[var(--accent)] bg-[var(--accent-light)]' 
                  : 'border-[var(--border)] bg-[var(--bg-primary)] hover:border-gray-300'
              }`}
              onClick={() => handleToggle(track.id)}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  {track.type === 'podcast' ? (
                    <Mic className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`} />
                  ) : (
                    <Music className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`} />
                  )}
                  <span className={`text-sm font-bold line-clamp-1 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                    {track.title}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-0.5 pl-5">
                  {track.artist}
                </span>
              </div>
              <button className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${isActive ? 'bg-[var(--accent)] text-white' : 'bg-white text-[var(--text-primary)] shadow-sm border border-[var(--border)]'}`}>
                {isActive && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 translate-x-[1px] fill-current" />}
              </button>
            </div>
          );
        })}
      </div>

      <ReactPlayer
        url={activeTrack?.url || ''}
        playing={isPlaying && !!activeTrack}
        onEnded={() => setIsPlaying(false)}
        width="320px"
        height="180px"
        style={{ position: 'fixed', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}
        config={{
          youtube: {
            playerVars: { 
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0
            }
          }
        }}
      />
    </div>
  );
}
