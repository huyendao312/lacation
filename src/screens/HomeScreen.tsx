import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockActivities, mockTracks } from '../data';
import { Activity } from '../types';
import { Battery, BatteryMedium, BatteryFull, MapPin, Star, ChevronRight, Map, RefreshCw } from 'lucide-react';
import { MoodPlaylist } from '../components/MoodPlaylist';
import { WeatherWidget } from '../components/WeatherWidget';

export function HomeScreen() {
  const [energyLevel, setEnergyLevel] = useState<number>(50);
  const [destination, setDestination] = useState<string>('Hanoi');
  const [reloadSeed, setReloadSeed] = useState<number>(0);

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const destinations = ['Hanoi', 'Saigon', 'Da Lat', 'Northwest'];

  // Filter activities based on energy level
  // If energy is high (>70), show high energy items
  // If mid (30-70), show mid energy items
  // If low (<30), show low energy items
  const activities = useMemo(() => {
    const filtered = mockActivities.filter(a => {
      if (dismissedIds.includes(a.id)) return false;
      if (energyLevel >= 70) return a.energyLevel >= 70;
      if (energyLevel < 30) return a.energyLevel < 40;
      return a.energyLevel >= 40 && a.energyLevel < 70;
    });

    // Shuffle using the seed to allow reloading
    let currentIndex = filtered.length, randomIndex;
    const shuffled = [...filtered];
    
    // We add reloadSeed to essentially force re-evaluation
    // A simple seeded shuffle or pseudo-random is fine.
    // For React we can just use Math.random() since it's re-run only when dependencies change.
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex], shuffled[currentIndex]];
    }

    // Keep only top 2 or 3 activities when shuffled
    return shuffled.slice(0, 3).sort((a, b) => a.time.localeCompare(b.time));
  }, [energyLevel, reloadSeed, dismissedIds]);

  // Determine mood text based on slider
  let moodText = "Balanced & Curious";
  let MoodIcon = BatteryMedium;
  if (energyLevel >= 70) {
    moodText = "High Energy & Adventurous";
    MoodIcon = BatteryFull;
  } else if (energyLevel < 30) {
    moodText = "Relaxed & Chill";
    MoodIcon = Battery;
  }

  // Filter tracks by destination before passing to MoodPlaylist
  const destinationTracks = mockTracks.filter(t => t.destination === destination);

  return (
    <div className="pb-24 pt-6 px-4 space-y-8 h-full overflow-y-auto">
      
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Good morning.
          </h1>
          <p className="text-[var(--text-secondary)]">Here is your tailored journey for today.</p>
        </div>

        {/* Destination Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] pr-2 border-r border-[var(--border)]">
            <Map className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Region</span>
          </div>
          {destinations.map(d => (
            <button
              key={d}
              onClick={() => setDestination(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                destination === d 
                  ? 'bg-[var(--accent)] text-white shadow-md' 
                  : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Weather Forecast Widget */}
        <div className="pt-2">
          <WeatherWidget region={destination} />
        </div>
      </div>

      {/* Mood Slider UI */}
      <div className="bg-[var(--mood-bg)] p-6 rounded-3xl border border-[var(--mood-border)] border-b-4 border-r-4 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">Current Mood</h2>
            <p className="text-sm text-[var(--text-secondary)]">Adjust to instantly pivot your itinerary.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center">
            <MoodIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-3">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={energyLevel} 
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)] px-1">
            <span>Relaxed</span>
            <span className="text-[var(--accent)]">{moodText}</span>
            <span>Adventurous</span>
          </div>
        </div>
      </div>

      {/* Mood Data-Driven Playlist */}
      <MoodPlaylist energyLevel={energyLevel} tracks={destinationTracks} />

      {/* Dynamic Itinerary Timeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">Your Day</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setReloadSeed(prev => prev + 1)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium px-2.5 py-1 bg-[var(--accent-light)] text-[var(--accent)] rounded-full">AI Curated</span>
          </div>
        </div>

        <div className="relative border-l-2 border-[var(--border)] ml-3 space-y-8">
          <AnimatePresence mode="popLayout">
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto', marginBottom: 32 }}
                exit={{ opacity: 0, x: 200, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative pl-6"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-primary)] z-10" />
                
                <motion.div 
                  className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] border-l-4 border-l-[var(--accent)] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] group bg-white"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  whileDrag={{ scale: 1.02, zIndex: 20, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (Math.abs(offset.x) > 120 || Math.abs(velocity.x) > 400) {
                      setDismissedIds(prev => [...prev, activity.id]);
                    }
                  }}
                >
                  <div className="h-32 w-full relative overflow-hidden pointer-events-none">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {activity.time}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2 pointer-events-none">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-base text-[var(--text-primary)] leading-tight">{activity.title}</h3>
                      <div className="flex items-center gap-1 text-[var(--accent)] text-xs font-medium bg-[var(--accent-light)] px-1.5 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-current" />
                        {activity.rating}
                      </div>
                    </div>
                    
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{activity.description}</p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </div>
                      <button className="text-[var(--accent)] flex items-center text-xs font-semibold pointer-events-auto hover:opacity-80 transition-opacity">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
