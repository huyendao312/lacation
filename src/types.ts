export type Theme = 'minimal' | 'eco' | 'custom' | 'vibrant';

export interface TravelDNA {
  energyLevelPreference: number; // 0 (Relaxed) to 100 (High Energy)
  interests: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  vibe: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  energyLevel: number;
  type: 'food' | 'activity' | 'relax' | 'culture';
  image: string;
  tags: string[];
  location: string;
  rating: number;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  energyRange: [number, number]; // [min, max]
  destination: string;
  type: 'music' | 'podcast';
}
