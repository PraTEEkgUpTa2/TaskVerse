import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Music, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface FocusSession {
  id: string;
  duration: number; // in minutes
  completed: boolean;
  date: string;
  startTime: string;
}

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sessions, setSessions] = useState<FocusSession[]>([
    {
      id: "1",
      duration: 25,
      completed: true,
      date: "2025-01-07",
      startTime: "09:30"
    },
    {
      id: "2", 
      duration: 25,
      completed: true,
      date: "2025-01-07",
      startTime: "10:30"
    },
    {
      id: "3",
      duration: 15,
      completed: false,
      date: "2025-01-07",
      startTime: "14:15"
    }
  ]);

  const totalTime = 25 * 60; // 25 minutes
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  

  useEffect(() => {
    audioRef.current = new Audio("/lofi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; 
    
    return () => {
    // Cleanup on unmount or toggle
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0; // Reset to beginning
  };
  }, [musicEnabled]);

  // Play or pause on toggle
  useEffect(() => {
    if (!audioRef.current) return;

    if (musicEnabled) {
      audioRef.current.play().catch((err) => console.log("Playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled]);
    
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Auto-complete session when timer reaches 0
      const newSession: FocusSession = {
        id: Date.now().toString(),
        duration: 25,
        completed: true,
        date: new Date().toISOString().split('T')[0],
        startTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => [newSession, ...prev]);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const handleReset = useCallback(() => {
     if (isActive && timeLeft > 0 && timeLeft < 25*60) {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      duration: Math.round((totalTime - timeLeft) / 60), // how many minutes were completed
      completed: false, // because it was reset
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })
    };
    setSessions(prev => [newSession, ...prev]);
  }
    setTimeLeft(25 * 60);
    setIsActive(false);
    setIsPaused(false);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalText = () => {
    if (timeLeft === 0) return "Great job! 🎉";
    if (isActive && !isPaused) return "Time to focus! 🧠";
    if ( timeLeft < totalTime && timeLeft > 0) return "Break coming soon! ⏰";
    return "Ready to be productive? 💪";
  };

  const completedToday = sessions.filter(s => s.completed && s.date === new Date().toISOString().split('T')[0]).length;
  const totalMinutesToday = sessions
    .filter(s => s.completed && s.date === new Date().toISOString().split('T')[0])
    .reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header with sidebar toggle and music control */}
      <div className="flex items-center justify-between p-4">
        <SidebarTrigger />
        
        <div className="flex items-center space-x-2">
          <Music className={`w-4 h-4 ${musicEnabled ? 'text-purple-600' : 'text-slate-400'}`} />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {musicEnabled ? "currentTrack" : 'Background music'}
          </span>
          <Switch 
            checked={musicEnabled}
            onCheckedChange={setMusicEnabled}
          />
        </div>
      </div>

      <main className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-2">
            <span>Focus Mode</span>
            <span className="text-2xl">⏱️</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {getMotivationalText()}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {/* Timer Section */}
          <div className="xl:col-span-3 space-y-12">
            {/* Main Timer Display */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="pt-12 pb-8">
                <div className="text-center space-y-6">
                  {/* Timer Display */}
                  <div className={`text-8xl font-bold transition-all duration-300 ${
                    isActive && !isPaused 
                      ? 'text-purple-600 animate-pulse' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress 
                      value={progress} 
                      className="w-full h-3"
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              {!isActive || isPaused ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="h-16 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-6 h-6 mr-2" />
                  {isPaused ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  size="lg"
                  variant="outline"
                  className="h-16 px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Pause className="w-6 h-6 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="h-16 px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Session Stats & Logs */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>Today's Focus</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{completedToday}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{totalMinutesToday}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Minutes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Log */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Today's Focus Log</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.filter(session => session.date === new Date().toISOString().split("T")[0]).slice(0,4).map((session) => (
                    
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {session.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {session.duration} mins
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {session.date},{session.startTime}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      session.completed 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {session.completed ? 'Completed' : 'Skipped'}
                    </div>
                  </div>
                ))}
                
                {sessions.filter(s => s.date === new Date().toISOString().split("T")[0]).length === 0 && (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No focus sessions yet today</p>
                    <p className="text-sm">Start your first session!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FocusMode;