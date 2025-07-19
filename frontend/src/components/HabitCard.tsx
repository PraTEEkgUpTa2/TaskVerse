import React from "react";
import { Flame, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Habit } from "@/pages/HabitTracker";import { HabitWithCompletion } from "@/pages/HabitTracker";
interface HabitCardProps {
  habit: HabitWithCompletion;
  onToggle: (habitId: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "health": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "learning": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "mindfulness": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "personal": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
        habit.completed 
          ? "bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800 shadow-sm" 
          : "bg-card border-border hover:border-border/80"
      }`}
      onClick={() => onToggle(habit._id)}
    >
      <div className="flex items-center space-x-4">
        {/* Status Indicator */}
        <div className="relative">
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={() => onToggle(habit._id)}
            className="w-5 h-5 text-green-600 bg-background border-border rounded focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"
          />
          {habit.completed && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute top-0 w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Habit Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className={`font-semibold ${habit.completed ? "text-green-800 dark:text-green-400" : "text-foreground"}`}>
              {habit.title}
            </h3>
            <Badge className={getCategoryColor(habit.tag)} variant="secondary">
              {habit.tag}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-muted-foreground">
                {habit.streak} day streak
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-muted-foreground">
                +{habit.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Badge */}
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
        habit.streak! >= 10 
          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
          : habit.streak! >= 5 
          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
          : "bg-muted text-muted-foreground"
      }`}>
        🔥 {habit.streak}
      </div>
    </div>
  );
};
