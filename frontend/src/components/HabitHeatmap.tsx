import React, { useState } from "react";
import { Habit } from "@/pages/HabitTracker";

interface HabitHeatmapProps {
  habits: Habit[];
}

export const HabitHeatmap: React.FC<HabitHeatmapProps> = ({ habits }) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<string>("all");

  // Generate last 365 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = generateDates();
  const weeks = [];
  
  // Group dates into weeks (starting from Sunday)
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  // Calculate activity level for a date
  const getActivityLevel = (date: string) => {
    let completedCount = 0;
    
    (habits ?? []).forEach(habit => {
      if (selectedHabit === "all" || habit._id === selectedHabit) {
        if (habit.completedDates!.includes(date)) {
          completedCount++;
        }
      }
    });

    if (completedCount === 0) return 0;
    if (completedCount <= 1) return 1;
    if (completedCount <= 2) return 2;
    if (completedCount <= 3) return 3;
    return 4;
  };

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return "bg-muted border-border";
      case 1: return "bg-green-200 dark:bg-green-900/40 border-green-300 dark:border-green-800";
      case 2: return "bg-green-300 dark:bg-green-800/60 border-green-400 dark:border-green-700";
      case 3: return "bg-green-400 dark:bg-green-700/80 border-green-500 dark:border-green-600";
      case 4: return "bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500";
      default: return "bg-muted border-border";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCompletedHabitsForDate = (date: string) => {
    return (habits ?? []).filter(habit => 
      (selectedHabit === "all" || habit._id === selectedHabit) && 
      habit.completedDates!.includes(date)
    );
  };

  return (
    <div className="space-y-6">
      {/* Habit Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedHabit("all")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedHabit === "all"
              ? "bg-purple-500 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Habits
        </button>
        {(habits ?? []).map(habit => (
          <button
            key={habit._id}
            onClick={() => setSelectedHabit(habit._id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedHabit === habit._id
                ? "bg-purple-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {habit.title}
          </button>
        ))}
      </div>

      {/* Heatmap Container with proper scrolling */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="inline-flex gap-1 min-w-max p-2">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  const level = getActivityLevel(date);
                  const completedHabits = getCompletedHabitsForDate(date);
                  
                  return (
                    <div
                      key={date}
                      className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-125 hover:shadow-sm relative ${getActivityColor(level)}`}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      title={`${formatDate(date)} - ${completedHabits.length} habit${completedHabits.length !== 1 ? 's' : ''} completed`}
                    >
                      {/* Tooltip */}
                      {hoveredDate === date && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-popover border border-border rounded-lg shadow-lg text-sm whitespace-nowrap z-50 text-popover-foreground">
                          <div className="font-semibold">{formatDate(hoveredDate)}</div>
                          <div className="text-xs opacity-75 mt-1">
                            {completedHabits.length} habit{completedHabits.length !== 1 ? 's' : ''} completed
                          </div>
                          {completedHabits.length > 0 && (
                            <div className="text-xs mt-2 space-y-1">
                              {completedHabits.map(habit => (
                                <div key={habit._id} className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <span>{habit.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm border ${getActivityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
