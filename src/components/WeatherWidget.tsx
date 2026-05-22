import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeatherWidgetProps {
  region: string;
}

const mockWeather: Record<string, { temp: number; condition: string; humidity: number }> = {
  'Hanoi': { temp: 24, condition: 'Cloudy', humidity: 78 },
  'Saigon': { temp: 32, condition: 'Sunny', humidity: 62 },
  'Da Lat': { temp: 18, condition: 'Rainy', humidity: 85 },
  'Northwest': { temp: 15, condition: 'Foggy', humidity: 90 },
};

export function WeatherWidget({ region }: WeatherWidgetProps) {
  const weather = mockWeather[region] || mockWeather['Hanoi'];

  const renderIcon = () => {
    switch (weather.condition) {
      case 'Sunny': return <Sun className="w-8 h-8 text-amber-500" />;
      case 'Cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Foggy': return <Wind className="w-8 h-8 text-slate-400" />;
      default: return <Sun className="w-8 h-8 text-amber-500" />;
    }
  };

  const getGradient = () => {
    switch (weather.condition) {
      case 'Sunny': return 'from-amber-100 to-amber-50 border-amber-200';
      case 'Cloudy': return 'from-gray-100 to-gray-50 border-gray-200';
      case 'Rainy': return 'from-blue-100 to-blue-50 border-blue-200';
      case 'Foggy': return 'from-slate-100 to-slate-50 border-slate-200';
      default: return 'from-[var(--bg-secondary)] to-[var(--bg-primary)] border-[var(--border)]';
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={region}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-br ${getGradient()} border rounded-3xl p-5 shadow-sm flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{weather.temp}°</h3>
              <span className="text-sm font-bold text-gray-500">C</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">{weather.condition}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Humidity</span>
          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-sm font-bold text-gray-700">{weather.humidity}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
