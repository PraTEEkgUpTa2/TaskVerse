import { ListCheck, Flame, Clock, Zap } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCard } from "@/components/StatsCard";
import { GamificationWidget } from "@/components/GamificationWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

type User = {
  firstName: string;
  lastName?: string;
  email?: string;
  
};

const Dashboard = () => {
  const tasks = [
    { id: 1, title: "Complete project proposal", completed: true, priority: "high" },
    { id: 2, title: "Review team feedback", completed: false, priority: "medium" },
    { id: 3, title: "Update portfolio website", completed: false, priority: "low" },
    { id: 4, title: "Plan weekly goals", completed: false, priority: "high" },
  ];

  const habits = [
    { id: 1, name: "Morning Exercise", streak: 7, completed: true },
    { id: 2, name: "Read 30 minutes", streak: 12, completed: false },
    { id: 3, name: "Meditation", streak: 5, completed: true },
  ];

  const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser || { name: "Guest" });
      } else {
          setUser({ firstName: "Guest" });
      }
    }, []);

    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) return "Good morning";
      if (hours < 18) return "Good afternoon"; 
      return "Good evening";}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <DashboardHeader />
      
      <main className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {getGreeting()}, 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> {user?.firstName}! </span> 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            You have 3 tasks due today. Let's make it productive!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Tasks Today"
            value="8"
            subtext="+2 from yesterday"
            icon={ListCheck}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Habit Streak"
            value="32"
            subtext="Days in a row"
            icon={Flame}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
          <StatsCard
            title="Focus Time"
            value="2.5h"
            subtext="Today's sessions"
            icon={Clock}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <StatsCard
            title="XP Earned"
            value="180"
            subtext="+45 today"
            icon={Zap}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Preview */}
          <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ListCheck className="w-5 h-5 text-blue-600" />
                <span>Today's Tasks</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => {
                const checkboxId = `task-checkbox-${task.id}`;
                return (
                  <div
                    key={task.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                      task.completed 
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={task.completed}
                      className="w-4 h-4 text-blue-600 rounded"
                      readOnly
                      title={`Mark "${task.title}" as completed`}
                    />
                    <label htmlFor={checkboxId} className={task.completed ? "line-through text-slate-500 cursor-pointer" : "text-slate-900 dark:text-white cursor-pointer"}>
                      {task.title}
                    </label>
                    <Badge 
                      variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Gamification Widget */}
          <GamificationWidget />
        </div>

        {/* Habits and Focus Session */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Habits Preview */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Habit Tracker</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${habit.completed ? "bg-green-500" : "bg-slate-300"}`} />
                    <span className="font-medium text-slate-900 dark:text-white">{habit.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{habit.streak} days</Badge>
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Focus Session */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span>Focus Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-slate-900 dark:text-white">25:00</div>
                <p className="text-slate-500 dark:text-slate-400">Deep work mode ready</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Start Focus Session
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">25 min</Button>
                  <Button variant="outline" size="sm">50 min</Button>
                </div>
              </div>
              <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                Sessions today: 3 • Total: 2.5h
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
