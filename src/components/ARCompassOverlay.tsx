import React, { useEffect, useRef, useState } from 'react';
import { X, Navigation, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  locationName: string;
  distance: string;
  onClose: () => void;
}

export function ARCompassOverlay({ locationName, distance, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.log('Video play interrupted', e));
        }
        setHasPermission(true);
      } catch (err) {
        setHasPermission(false);
      }
    }

    setupCamera();

    // Simulate compass rotation for preview
    const interval = setInterval(() => {
      setHeading(prev => (prev + (Math.random() * 4 - 2)) % 360);
    }, 100);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col"
    >
      {/* Video Background */}
      {hasPermission !== false ? (
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black p-6 text-center">
          <p>Camera access is required for the AR Compass feature.</p>
        </div>
      )}
      
      {/* Overlay UI */}
      <div className="relative z-10 flex-1 flex flex-col justify-between pointer-events-none p-6">
        {/* Top bar */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 text-white shadow-lg border border-white/20 max-w-[70%]">
            <h2 className="font-bold text-lg leading-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--accent)]" /> {locationName}
            </h2>
            <p className="text-sm text-white/80 font-medium ml-7 mt-1">{distance}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/60 transition-colors active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Compass */}
        <div className="flex-1 flex flex-col items-center justify-center pointer-events-none pb-20">
          <motion.div
            animate={{ rotate: heading }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-48 h-48 rounded-full border-2 border-white/30 flex items-center justify-center relative bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm shadow-2xl"
          >
            {/* Compass Marks */}
            <div className="absolute top-2 w-1 h-3 bg-[var(--accent)] rounded-full" />
            
            <div className="absolute flex items-center justify-center w-full h-full">
               <Navigation className="w-16 h-16 text-[var(--accent)] drop-shadow-[0_0_15px_rgba(255,107,107,0.8)]" fill="currentColor" />
            </div>
            
            <div className="absolute -bottom-8 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-bold tracking-widest text-sm border border-white/20">
              {Math.round(heading)}° N
            </div>
          </motion.div>
          
          <p className="text-white font-bold bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl mt-16 border border-white/20">
            Keep walking forward
          </p>
        </div>
      </div>
    </motion.div>
  );
}
