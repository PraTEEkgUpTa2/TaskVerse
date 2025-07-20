import { useEffect, useState } from "react";
import axios from "@/api/axios"
import { Flame, Plus, Target, Calendar, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitCard } from "@/components/HabitCard";
import { HabitHeatmap } from "@/components/HabitHeatmap";
import { StatsCard } from "@/components/StatsCard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddHabitModal } from "@/components/AddHabitModal";

export interface Habit {
  _id: string;
  title: string;
  tag: string;
  xp: number;
  streak: number;
  longestStreak: number;
  completedDates: string[];
  createdAt: string;
}

export interface HabitWithCompletion extends Habit {
  completed: boolean;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("/api/v1/habits/habit");
      setHabits(res.data.data);
    } catch (err) {
      console.error("Error fetching habits", err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    try {
      await axios.patch(
        `/api/v1/habits/${habitId}`,
        { markCompleted: true }
      );
      fetchHabits();
    } catch (err) {
      console.error("Error updating habit", err);
    }
  };

  const isCompletedToday = (completedDates: string[]) =>
  completedDates?.some(date => new Date(date).toDateString() === new Date().toDateString());

  const handleAddHabit = async (newHabit: { title: string; tag: string }) => {
    try {
      const {data} = await axios.post("/api/v1/habits/habit",newHabit);
      setHabits(prev => [...prev, data.data])
    } catch (err) {
      console.error("Error adding habit", err);
    }
  };

  const totalXP = (habits ?? []).reduce((sum, h) => {
  const completedToday = h.completedDates?.some(date =>
    new Date(date).toDateString() === new Date().toDateString()
  );
  return completedToday ? sum + (h.xp ?? 0) : sum;
}, 0);
  const completedToday = (habits ?? []).filter(habit =>
    (habit.completedDates ?? []).some(date => new Date(date).toDateString() === new Date().toDateString())
  ).length;
  const longestStreak = Math.max(...(habits ?? []).map(h => h.longestStreak || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="flex items-center p-4">
        <SidebarTrigger />
      </div>

      <main className="p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Habit Tracker</span>
            <span className="text-2xl">🎯</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Build consistency and track your daily progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Today's XP"
            value={totalXP.toString()}
            subtext={`From ${completedToday} habits`}
            icon={Zap}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatsCard
            title="Completed Today"
            value={`${completedToday}/${habits?.length}`}
            subtext="Keep it up!"
            icon={Target}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <StatsCard
            title="Longest Streak"
            value={longestStreak.toString()}
            subtext="Days in a row"
            icon={Flame}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
          <StatsCard
            title="Total Habits"
            value={habits?.length.toString()}
            subtext="Active tracking"
            icon={Trophy}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Today's Habits</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {(habits ?? []).map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={{ ...habit, completed: isCompletedToday(habit.completedDates)}}
                  onToggle={handleToggleHabit}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Streak Master</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">15 day streak achieved!</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">XP Collector</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">500+ XP earned this week</p>
                  </div>
                </div>
              </div>

              <div className="text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                <Calendar className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Complete 7 days in a row to unlock the "Weekly Warrior" badge!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <span>Habit Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HabitHeatmap habits={habits} />
          </CardContent>
        </Card>
      </main>

      <Button
        onClick={() => setIsAddModalOpen(true)}
        size="lg"
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 z-50 transition-all duration-300 hover:scale-110"
      >
        <Plus className="h-7 w-7 text-white" />
      </Button>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
};

export default HabitTracker;
