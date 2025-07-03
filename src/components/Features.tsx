import { CheckSquare, Target, Timer, Brain, Zap, Users, Trophy, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Manager",
    description: "Organize tasks with subtasks, priority labels, smart filters, and deadline tracking. Break down complex projects into manageable steps.",
    highlights: ["Subtasks & Dependencies", "Smart Filters", "Priority Matrix", "Due Date Alerts"]
  },
  {
    icon: Target,
    title: "Habit Tracker",
    description: "Build lasting habits with visual streak tracking, progress charts, and milestone celebrations. Turn consistency into a superpower.",
    highlights: ["Streak Visualization", "Progress Charts", "Habit Stacking", "Milestone Rewards"]
  },
  {
    icon: Timer,
    title: "Pomodoro Focus",
    description: "Enhanced focus sessions with XP rewards, ambient sounds, and break reminders. Make deep work feel like a game.",
    highlights: ["25/5 Min Cycles", "XP Rewards", "Focus Music", "Break Reminders"]
  },
  {
    icon: Brain,
    title: "AI Assistant",
    description: "Get personalized task breakdowns, weekly planning suggestions, and productivity insights powered by AI.",
    highlights: ["Task Breakdown", "Weekly Planning", "Smart Insights", "Goal Setting"]
  }
];

const additionalFeatures = [
  { icon: Trophy, title: "Gamification", description: "Level up, earn badges, and unlock achievements" },
  { icon: Users, title: "Team Collaboration", description: "Share goals and compete with friends" },
  { icon: BarChart3, title: "Analytics", description: "Track your productivity patterns and growth" },
  { icon: Zap, title: "Quick Actions", description: "Lightning-fast task creation and updates" }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stay Productive
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            TaskVerse brings together the best productivity tools in one beautifully designed app. 
            No more jumping between different platforms.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200 dark:hover:border-indigo-700">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                  {feature.description}
                </CardDescription>
                <div className="grid grid-cols-2 gap-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Plus Many More Features to be added soon!
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-md group-hover:shadow-lg transition-shadow mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}