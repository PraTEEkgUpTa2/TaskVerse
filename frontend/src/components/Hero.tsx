import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                All-in-One Productivity,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Built for Doers
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                Tasks, Habits, Focus, Streaks, AI Planning — All in One Seamless App. 
                Transform your productivity with gamification that makes getting things done actually fun.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl text-lg font-semibold group border-2">
                <Play className="mr-2 h-5 w-5" />
                Demo Coming Soon...
              </Button>
            </div>

            {/* Trust Indicators */}
            
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Good morning, Alex!</h3>
                    <p className="text-indigo-100">You have 3 tasks due today</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">85</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Today's Tasks */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Today's Focus</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300 line-through">Complete project proposal</span>
                      <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-1 rounded">+50 XP</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 rounded mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Review team feedback</span>
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded mr-2">High</span>
                        <span className="text-xs text-gray-500">2h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Habit Streak */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Morning Exercise</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">7-day streak! 🔥</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">7</div>
                      <div className="text-xs text-gray-500">days</div>
                    </div>
                  </div>
                </div>

                {/* Focus Timer */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Focus Session</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Deep work mode active</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">25:00</div>
                      <div className="text-xs text-gray-500">minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg transform rotate-12">
              Level 12 🏆
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform -rotate-12">
              +150 XP Today! ⚡
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}