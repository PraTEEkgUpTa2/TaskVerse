import { Trophy, Zap, Target, Medal, Star, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const achievements = [
  { icon: Target, title: "Task Master", description: "Complete 100 tasks", progress: 75, color: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Focus Ninja", description: "Complete 50 Pomodoros", progress: 60, color: "from-purple-500 to-pink-500" },
  { icon: Medal, title: "Streak Legend", description: "30-day habit streak", progress: 40, color: "from-green-500 to-emerald-500" },
  { icon: Crown, title: "Productivity King", description: "Reach Level 25", progress: 85, color: "from-yellow-500 to-orange-500" }
];

const levels = [
  { level: 12, title: "Productivity Ninja", xp: 2850, nextXp: 3000, color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
];

export function Gamification() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Make Productivity{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Actually Fun
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Level up your productivity with XP, achievements, and rewards. 
            Turn your daily tasks into an addictive game.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Level Progress */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-200 dark:border-indigo-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Level 12</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Productivity Ninja</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-500">2,850</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">XP</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Progress to Level 13</span>
                  <span>150 XP to go</span>
                </div>
                <Progress value={95} className="h-3" />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">245</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Done</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">32</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">18</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Badges</div>
                </div>
              </div>
            </div>

            {/* XP Sources */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">How to Earn XP</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Complete a task</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold">+10-50 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Finish Pomodoro</span>
                  </div>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">+25 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Daily habit completed</span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">+15 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Weekly goal achieved</span>
                  </div>
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold">+100 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Achievements */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Achievements</h3>
            
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${achievement.color} rounded-xl`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{achievement.progress}%</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}

            {/* Badge Collection Preview */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Badge Collection</h4>
              <div className="grid grid-cols-6 gap-3">
                {[Trophy, Star, Target, Medal, Crown, Zap].map((Icon, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm flex items-center justify-center group hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Collect 50+ unique badges by completing challenges and milestones!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-4">Ready to Level Up Your Life?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join the productivity game where every task completed gets you closer to your next achievement. 
              Start earning XP today!
            </p>
            <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center">
              Start Gaming Your Productivity
              <Zap className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}