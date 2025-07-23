import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Music, Settings, Star, Maximize2 } from "lucide-react";
import FlipDigit from './../components/FlipDigit';
import { SidebarTrigger } from "@/components/ui/sidebar";

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface ModeConfig {
  duration: number; // in minutes
  label: string;
  color: string;
  bgColor: string;
}

const modeConfigs: Record<TimerMode, ModeConfig> = {
  pomodoro: { 
    duration: 25, 
    label: 'Focus Time', 
    color: 'text-red-400',
    bgColor: 'from-red-500/20 to-orange-500/20'
  },
  shortBreak: { 
    duration: 5, 
    label: 'Short Break', 
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-teal-500/20'
  },
  longBreak: { 
    duration: 15, 
    label: 'Long Break', 
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-purple-500/20'
  }
};

const FocusMode = () => {
  const [currentMode, setCurrentMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(modeConfigs.pomodoro.duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/lofi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; 
    
    return () => {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    };
  }, [musicEnabled]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicEnabled) {
      audioRef.current.play().catch((err) => console.log("Playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled]);
    
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, []);

  // Update timer when mode changes
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(modeConfigs[currentMode].duration * 60);
    }
  }, [currentMode, isActive]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Auto switch to next mode
      if (currentMode === 'pomodoro') {
        setCurrentMode('shortBreak');
      } else {
        setCurrentMode('pomodoro');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft, currentMode]);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const handleReset = useCallback(() => {
    const newTime = modeConfigs[currentMode].duration * 60;
    setTimeLeft(newTime);
    setIsActive(false);
    setIsPaused(false);
  }, [currentMode]);

  const handleModeChange = (mode: TimerMode) => {
    if (!isActive) {
      setCurrentMode(mode);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((modeConfigs[currentMode].duration * 60 - timeLeft) / (modeConfigs[currentMode].duration * 60)) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${modeConfigs[currentMode].bgColor} transition-all duration-1000`}>
       <div className="flex items-center justify-between p-4">
        <SidebarTrigger />
      {/* Music Control - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center space-x-3 glass-morphism rounded-full px-4 py-2 shadow-lg">
          <Music className={`w-4 h-4 transition-colors ${musicEnabled ? 'text-indigo-400' : 'text-slate-400'}`} />
          <span className="text-sm text-white/80 font-medium">LoFi Music</span>
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className={`w-10 h-6 rounded-full transition-colors duration-300 ${
              musicEnabled ? 'bg-indigo-500' : 'bg-slate-600'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
              musicEnabled ? 'transform translate-x-5' : 'transform translate-x-1'
            }`} />
          </button>
        </div>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen px-6 space-y-12 pb-20">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Focus Timer
          </h1>
          <div className={`text-xl font-medium ${modeConfigs[currentMode].color}`}>
            {modeConfigs[currentMode].label}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex space-x-4">
          {Object.entries(modeConfigs).map(([mode, config]) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode as TimerMode)}
              disabled={isActive && !isPaused}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                ${currentMode === mode 
                  ? `${config.color} bg-white/10 border border-current shadow-lg scale-105` 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-slate-600'
                }
                ${(isActive && !isPaused) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center space-y-8">
          {/* Progress Ring */}
          <div className="relative w-80 h-80 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={currentMode === 'pomodoro' ? '#ef4444' : currentMode === 'shortBreak' ? '#22c55e' : '#3b82f6'}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Timer Clock - Centered in progress ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="timer-glow absolute inset-0 rounded-full"></div>
              <div className="flex items-center space-x-4 z-10">
                <FlipDigit value={minutes} label="minutes" />
                <div className="text-4xl md:text-5xl font-mono font-bold text-white/50 pb-8">:</div>
                <FlipDigit value={seconds} label="seconds" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-lg text-slate-400 font-light">
            {isActive && !isPaused ? 'Stay focused!' : isPaused ? 'Timer paused' : 'Ready to start'}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-6 mb-16">
          {/* Start/Pause Button */}
          {!isActive || isPaused ? (
            <button
              onClick={handleStart}
              className={`
                ${modeConfigs[currentMode].color.replace('text-', 'bg-').replace('-400', '-500')} 
                hover:${modeConfigs[currentMode].color.replace('text-', 'bg-').replace('-400', '-600')}
                text-white px-12 py-4 text-lg font-semibold rounded-full 
                transition-all duration-300 shadow-lg hover:shadow-xl
                hover:scale-105 active:scale-95 flex items-center space-x-3
              `}
            >
              <Play className="w-5 h-5" />
              <span>{isPaused ? 'Resume' : 'Start'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className={`
                ${modeConfigs[currentMode].color.replace('text-', 'bg-').replace('-400', '-500')} 
                hover:${modeConfigs[currentMode].color.replace('text-', 'bg-').replace('-400', '-600')}
                text-white px-12 py-4 text-lg font-semibold rounded-full 
                transition-all duration-300 shadow-lg hover:shadow-xl
                hover:scale-105 active:scale-95 flex items-center space-x-3
              `}
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
          )}

          {/* Secondary Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 
                       rounded-full p-3 transition-all duration-300 
                       hover:scale-110 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 
                             rounded-full p-3 transition-all duration-300 
                             hover:scale-110 active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Fullscreen Toggle - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={toggleFullscreen}
          className="bg-indigo-600 hover:bg-indigo-700 text-white
                   px-4 py-2 rounded-full font-medium text-sm 
                   transition-all duration-300 shadow-lg hover:shadow-xl
                   hover:scale-105 active:scale-95 flex items-center space-x-2"
        >
          <Star className="w-4 h-4 text-yellow-300" />
          <span>{isFullscreen ? 'Exit Focus' : 'Focus Mode'}</span>
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FocusMode;