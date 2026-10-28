import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Mohanam / Bhupali auspicious pentatonic notes (Sa, Ri, Ga, Pa, Dha)
  // Auspicious Indian wedding celebratory scale
  const ragaFrequencies = [
    261.63, // C4 (Sa)
    293.66, // D4 (Ri)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (High Sa)
    587.33, // D5 (High Ri)
    659.25  // E5 (High Ga)
  ];

  // Classic auspicious shehnai / flute phrases
  const melodyMelodicSequence = [
    { note: 0, duration: 1.2 },
    { note: 1, duration: 0.8 },
    { note: 2, duration: 1.4 },
    { note: 3, duration: 1.0 },
    { note: 4, duration: 1.6 },
    { note: 3, duration: 0.8 },
    { note: 2, duration: 1.2 },
    { note: 4, duration: 1.0 },
    { note: 5, duration: 2.0 }, // Peak
    { note: 4, duration: 1.0 },
    { note: 3, duration: 1.2 },
    { note: 2, duration: 1.4 },
    { note: 1, duration: 0.8 },
    { note: 0, duration: 2.2 },
    { note: 2, duration: 1.0 },
    { note: 3, duration: 1.5 }
  ];

  const playShehnaiNote = (ctx: AudioContext, masterGain: GainNode, freq: number, duration: number) => {
    const now = ctx.currentTime;
    
    // Rich overtone oscillator mimicking reed shehnai / bansuri timbre
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    
    // Gentle vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.8, now); // 4.8Hz human vibrato
    lfoGain.gain.setValueAtTime(freq * 0.015, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);
    lfo.start(now);
    lfo.stop(now + duration + 0.5);

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    subOsc.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight chorus detune
    subOsc.frequency.setValueAtTime(freq / 2, now);

    // Warm resonant bandpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    filter.Q.setValueAtTime(2.2, now);

    const noteGain = ctx.createGain();
    // Gentle attack and emotional release
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.18);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + duration + 0.5);
    osc2.stop(now + duration + 0.5);
    subOsc.stop(now + duration + 0.5);
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!gainNodeRef.current) {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;
    }

    // Gentle Tanpura Drone in background (Sa-Pa drone)
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.035, ctx.currentTime);
    const saDrone = ctx.createOscillator();
    const paDrone = ctx.createOscillator();
    saDrone.type = 'sine';
    paDrone.type = 'sine';
    saDrone.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
    paDrone.frequency.setValueAtTime(196.00, ctx.currentTime); // G3
    saDrone.connect(droneGain);
    paDrone.connect(droneGain);
    droneGain.connect(gainNodeRef.current);
    saDrone.start();
    paDrone.start();

    isPlayingRef.current = true;
    setIsPlaying(true);

    let step = 0;
    const playNext = () => {
      if (!isPlayingRef.current || !ctx || !gainNodeRef.current) return;
      const current = melodyMelodicSequence[step % melodyMelodicSequence.length];
      const freq = ragaFrequencies[current.note];
      playShehnaiNote(ctx, gainNodeRef.current, freq, current.duration);

      const nextDelay = (current.duration + 0.1) * 1000;
      step++;
      timerRef.current = window.setTimeout(playNext, nextDelay);
    };

    playNext();
  };

  const stopMusicLoop = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusicLoop();
    } else {
      startMusicLoop();
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#2E0B12]/95 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-[#D4AF37]/50 shadow-2xl text-[#FFF8E7] transition-all duration-300 hover:border-[#D4AF37]">
      <button
        onClick={togglePlay}
        className="flex items-center gap-2.5 text-xs font-medium tracking-wide hover:text-[#E8C86A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        title={isPlaying ? 'Pause auspicious Shehnai wedding tune' : 'Play auspicious Shehnai wedding tune'}
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#8B1E28] text-[#F3E5AB]">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 translate-x-0.5" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
          )}
        </span>
        <span className="hidden sm:inline font-royal tracking-widest text-[11px] uppercase text-[#F3E5AB]">
          {isPlaying ? 'Shehnai Raga Playing' : 'Play Wedding Music'}
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
  );
};
