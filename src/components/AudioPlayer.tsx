import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;
    audio.muted = false;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser requires user interaction before audio plays
        });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      startAudio();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    // Attempt automatic playback immediately
    startAudio();

    // Browser policy: start audio on first user gesture anywhere on document
    const handleGlobalInteraction = () => {
      startAudio();
    };

    const events = ['click', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach(evt => {
      document.addEventListener(evt, handleGlobalInteraction, { capture: true, once: true });
    });

    const audio = audioRef.current;
    if (audio) {
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
    }

    return () => {
      events.forEach(evt => {
        document.removeEventListener(evt, handleGlobalInteraction, { capture: true });
      });
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-background-music.mp3"
        loop
        preload="auto"
        playsInline
      >
        <source src="/wedding-background-music.mp3" type="audio/mpeg" />
        <source src="/assets/aistudio/AUD-20261028-WA0010_515583a7.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating elegant sound controller */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#2E0B12]/95 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-[#D4AF37]/60 shadow-2xl text-[#FFF8E7] transition-all hover:border-[#D4AF37]">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 text-xs font-medium tracking-wide hover:text-[#E8C86A] transition-colors focus:outline-none"
          title={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#8B1E28] text-[#F3E5AB]">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 translate-x-0.5" />
            )}
            {!isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
              </span>
            )}
          </span>
          <span className="font-royal tracking-widest text-[11px] uppercase text-[#F3E5AB]">
            {isPlaying ? 'Wedding Music Playing' : 'Tap to Play Music'}
          </span>
        </button>

        {isPlaying && (
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#D4AF37]/30">
            {/* Animated sound wave bars */}
            <div className="flex items-end gap-0.5 h-4 w-5">
              <span className="w-1 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.1s] h-3"></span>
              <span className="w-1 bg-[#F3E5AB] rounded-full animate-bounce [animation-delay:0.3s] h-4"></span>
              <span className="w-1 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s] h-2"></span>
            </div>

            <button
              onClick={toggleMute}
              className="p-1 text-[#F3E5AB] hover:text-[#D4AF37] transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
