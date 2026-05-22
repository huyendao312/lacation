import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Gem, Star, Camera, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARCompassOverlay } from '../components/ARCompassOverlay';

interface MapLocation {
  id: string;
  name: string;
  type: 'hidden' | 'popular';
  distance: string;
  x: number; // percentage left
  y: number; // percentage top
  description: string;
  image: string;
  localTip: string;
}

const mapLocations: MapLocation[] = [
  { id: '1', name: "Cô Ba's Bánh Mì", type: 'hidden', distance: '150m away', x: 25, y: 33, description: 'A small alleyway cart serving the crispiest banh mi with a secret pate recipe passed down for generations.', image: 'https://images.unsplash.com/photo-1630132338275-cd3ef1d59648?auto=format&fit=crop&q=80&w=200', localTip: 'Ask for extra chili if you dare!' },
  { id: '2', name: "Ben Thanh Market", type: 'popular', distance: '1.2km away', x: 60, y: 50, description: 'Bustling traditional market offering everything from local handicrafts to delicious street food.', image: 'https://images.unsplash.com/photo-1583417646199-7389868c2eb3?auto=format&fit=crop&q=80&w=200', localTip: 'Bargain down to at least half the price!' },
  { id: '3', name: "Secret Jazz Bar", type: 'hidden', distance: '300m away', x: 40, y: 70, description: 'Hidden behind a tailor shop, this speakeasy offers live jazz and signature cocktails.', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=200', localTip: 'Password changes weekly, check their IG.' },
  { id: '4', name: "Notre Dame Cathedral", type: 'popular', distance: '800m away', x: 75, y: 30, description: 'Iconic 19th-century cathedral built with materials imported directly from France.', image: 'https://images.unsplash.com/photo-1681283840742-b8ec12f71960?auto=format&fit=crop&q=80&w=200', localTip: 'Best photos are taken early morning to avoid crowds.' },
  { id: '5', name: "Central Post Office", type: 'popular', distance: '850m away', x: 30, y: 80, description: 'A grand colonial building with beautiful architecture and historic significance.', image: 'https://images.unsplash.com/photo-1627918451877-bb894d0dc3eb?auto=format&fit=crop&q=80&w=200', localTip: 'You can still send postcards globally from here!' },
  { id: '6', name: "Hidden Antique Cafe", type: 'hidden', distance: '450m away', x: 80, y: 65, description: 'Quiet coffee shop filled with vintage furniture, serving traditional robusta egg coffee.', image: 'https://images.unsplash.com/photo-1589254065609-b7b51b34335c?auto=format&fit=crop&q=80&w=200', localTip: 'Sit on the balcony for a great view of the alley.' },
  { id: '7', name: "Alley 14 Cocktail", type: 'hidden', distance: '250m away', x: 50, y: 40, description: 'Cozy alley bar known for its creative drinks using local tropical ingredients.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200', localTip: 'Try the Phở-inspired cocktail for a unique taste.' },
];

export function MapScreen() {
  const [filter, setFilter] = useState<'hidden' | 'popular'>('hidden');
  const [activeId, setActiveId] = useState<string | null>('1');
  const [showAR, setShowAR] = useState(false);

  const filteredLocations = mapLocations.filter(loc => loc.type === filter);
  const activeLocation = mapLocations.find(loc => loc.id === activeId) || null;

  // When filter changes, select the first pin in that filter automatically
  const handleFilterChange = (newFilter: 'hidden' | 'popular') => {
    setFilter(newFilter);
    const firstLoc = mapLocations.find(loc => loc.type === newFilter);
    if (firstLoc) setActiveId(firstLoc.id);
  };

  return (
    <div className="h-full relative overflow-hidden bg-[#EAE2B7]">
      {/* Fake Map Background (Grid pattern to simulate map tiles) */}
      <div 
        className="absolute inset-0 opacity-20 transition-transform duration-[10s] ease-in-out" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Floating UI Elements */}
      <div className="absolute top-6 left-4 right-4 z-10 flex flex-col gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 flex items-center gap-3">
          <Compass className="w-5 h-5 text-[var(--accent)]" />
          <input 
            type="text" 
            placeholder="Search nearby places..." 
            className="bg-transparent border-none outline-none w-full text-sm font-medium text-gray-900 placeholder:text-gray-500"
          />
        </div>

        {/* Filter Toggler */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-md border border-white/20 flex items-center">
          <button 
            onClick={() => handleFilterChange('hidden')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === 'hidden' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Gem className="w-4 h-4" />
            Hidden Gems
          </button>
          <button 
            onClick={() => handleFilterChange('popular')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === 'popular' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
            Popular Spots
          </button>
        </div>
      </div>

      {/* Map Pins Placed Randomly */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          {filteredLocations.map((loc) => {
            const isActive = loc.id === activeId;
            const isHidden = loc.type === 'hidden';
            
            return (
              <motion.div 
                key={loc.id}
                className={`absolute cursor-pointer ${isActive ? 'z-20' : 'z-10'}`}
                style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: isActive ? 1.25 : 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                onClick={() => setActiveId(loc.id)}
              >
                <div className="relative">
                  {isActive && (
                    <div className="absolute inset-0 bg-white/50 rounded-full blur-md animate-ping" />
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <MapPin 
                      className={`w-8 h-8 drop-shadow-md transition-colors ${
                        isHidden 
                          ? (isActive ? 'text-emerald-500' : 'text-emerald-700/80') 
                          : (isActive ? 'text-blue-500' : 'text-blue-700/80')
                      }`}
                      fill="currentColor" 
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-28 right-4 flex flex-col gap-2 z-10">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-[var(--accent)] transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {activeLocation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="absolute bottom-24 left-4 right-4 z-10"
          >
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden relative border border-gray-100">
                  <img src={activeLocation.image} alt={activeLocation.name} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm">
                    {activeLocation.type === 'hidden' ? <Gem className="w-3 h-3 text-emerald-600" /> : <Star className="w-3 h-3 text-blue-600" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{activeLocation.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 font-medium">
                     <MapPin className="w-3 h-3 text-[var(--accent)]" /> {activeLocation.distance}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-snug">
                    {activeLocation.description}
                  </p>
                </div>
              </div>

              {/* Local Tip Badge */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 flex items-start gap-2 h-auto text-amber-900 shadow-sm mt-1">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">
                  <span className="font-bold text-amber-700 mr-1">Local Tip:</span>
                  {activeLocation.localTip}
                </p>
              </div>
              
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <button className={`flex-1 text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-[0.98] ${
                    activeLocation.type === 'hidden' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 shadow-lg' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-lg'
                  }`}>
                    Route There
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.name)}`, '_blank')}
                    className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold text-sm py-2.5 rounded-xl transition-all active:scale-[0.98] border border-gray-200"
                  >
                    Open in Maps
                  </button>
                </div>
                <button
                  onClick={() => setShowAR(true)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-slate-900/20"
                >
                  <Camera className="w-4 h-4" />
                  AR Compass Navigation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAR && activeLocation && (
          <ARCompassOverlay 
            locationName={activeLocation.name}
            distance={activeLocation.distance}
            onClose={() => setShowAR(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
