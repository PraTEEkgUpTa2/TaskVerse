import { useState } from "react";
import { Trophy, Coins, Shirt, Star, Crown, User, Target, Flame, Clock, Medal, CheckCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { XPProgress } from "@/components/XPProgress";
import { DailyQuests, type DailyQuest } from "@/components/DailyQuests";
import { AvatarCustomization, type AvatarItem } from "@/components/AvatarCustomization";
import { AchievementBadges, type Badge } from "@/components/AchievementBadges";
import { WeeklyLeaderboard, type LeaderboardEntry } from "@/components/WeeklyLeaderboard";
import { RecentRewards, type RewardEvent } from "@/components/RecentRewards";
import { QuickStats } from "@/components/QuickStats";
import { NextMilestone } from "@/components/NextMilestone";
import { WeeklyEmailSummary } from "@/components/WeeklyEmailSummary";

const Gamification = () => {
  const [currentXP, setCurrentXP] = useState(850);
  const [level, setLevel] = useState(12);
  const [totalCoins, setTotalCoins] = useState(247);
  const [xpToNextLevel] = useState(150);
  const [totalXPForLevel] = useState(1000);
  const [weeklyEmailEnabled, setWeeklyEmailEnabled] = useState(false);

  const avatarItems: AvatarItem[] = [
    {
      id: "basic-outfit",
      name: "Basic Outfit",
      type: "outfit",
      cost: 0,
      unlocked: true,
      equipped: true,
      icon: Shirt
    },
    {
      id: "ninja-outfit",
      name: "Ninja Outfit",
      type: "outfit", 
      cost: 100,
      unlocked: true,
      equipped: false,
      icon: User
    },
    {
      id: "premium-pet",
      name: "Focus Cat",
      type: "pet",
      cost: 150,
      unlocked: false,
      equipped: false,
      icon: Star
    },
    {
      id: "golden-crown",
      name: "Golden Crown",
      type: "accessory",
      cost: 200,
      unlocked: false,
      equipped: false,
      icon: Crown
    }
  ];

  const dailyQuests: DailyQuest[] = [
    {
      id: "focus-sessions",
      title: "Complete 2 focus sessions",
      description: "Stay focused and productive today",
      progress: 1,
      target: 2,
      reward: { type: 'xp', amount: 50 },
      completed: false
    },
    {
      id: "check-tasks",
      title: "Check off 5 tasks",
      description: "Mark 5 tasks as completed",
      progress: 3,
      target: 5,
      reward: { type: 'coins', amount: 20 },
      completed: false
    },
    {
      id: "maintain-streak",
      title: "Maintain 2-day streak",
      description: "Keep your productivity streak alive",
      progress: 2,
      target: 2,
      reward: { type: 'xp', amount: 30 },
      completed: false
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: "ProductivityMaster", xp: 2150, streak: 45 },
    { rank: 2, username: "FocusNinja", xp: 1980, streak: 32 },
    { rank: 3, username: "You", xp: 850, streak: 12, isCurrentUser: true },
    { rank: 4, username: "CodeWarrior", xp: 780, streak: 8 },
    { rank: 5, username: "TaskSlayer", xp: 650, streak: 15 }
  ];

  const badges: Badge[] = [
    {
      id: "first-focus",
      name: "First Focus",
      description: "Complete your first focus session",
      icon: Target,
      unlocked: true,
      requirement: "Complete 1 focus session"
    },
    {
      id: "streak-3",
      name: "3-Day Streak",
      description: "Maintain a 3-day productivity streak",
      icon: Flame,
      unlocked: true,
      requirement: "3 consecutive days"
    },
    {
      id: "early-riser",
      name: "Early Riser",
      description: "Start a focus session before 8 AM",
      icon: Clock,
      unlocked: false,
      requirement: "Focus before 8 AM"
    },
    {
      id: "night-owl",
      name: "Night Owl",
      description: "Complete 5 late night sessions",
      icon: Star,
      unlocked: false,
      requirement: "5 sessions after 9 PM",
      progress: 2,
      maxProgress: 5
    },
    {
      id: "century",
      name: "Century Club",
      description: "Complete 100 total focus sessions",
      icon: Trophy,
      unlocked: false,
      requirement: "100 total sessions",
      progress: 67,
      maxProgress: 100
    },
    {
      id: "marathon",
      name: "Marathon",
      description: "Focus for 8 hours in a single day",
      icon: Medal,
      unlocked: false,
      requirement: "8 hours in one day"
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Complete 10 sessions without interruption",
      icon: CheckCircle,
      unlocked: true,
      requirement: "10 uninterrupted sessions"
    },
    {
      id: "champion",
      name: "Champion",
      description: "Reach Level 15",
      icon: Crown,
      unlocked: false,
      requirement: "Reach Level 15"
    }
  ];

  const rewardHistory: RewardEvent[] = [
    {
      id: "1",
      type: "xp",
      amount: 25,
      description: "Completed 25-minute focus session",
      timestamp: "2 minutes ago"
    },
    {
      id: "2",
      type: "coins",
      amount: 10,
      description: "Perfect focus session bonus",
      timestamp: "15 minutes ago"
    },
    {
      id: "3",
      type: "badge",
      badgeName: "Perfectionist",
      description: "Unlocked 'Perfectionist' badge",
      timestamp: "1 hour ago"
    },
    {
      id: "4",
      type: "xp",
      amount: 50,
      description: "Daily goal completed",
      timestamp: "3 hours ago"
    },
    {
      id: "5",
      type: "coins",
      amount: 15,
      description: "7-day streak bonus",
      timestamp: "Yesterday"
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <SidebarTrigger />
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-full border border-yellow-500/20">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-yellow-500">{totalCoins}</span>
              <span className="text-sm text-muted-foreground">Coins</span>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-6 py-12">
          {/* Welcome Section */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center justify-center space-x-3">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <span>Gamification Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Level up your productivity and earn rewards! 🚀
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Left Column - XP & Badges */}
            <div className="xl:col-span-2 space-y-8">
              <XPProgress 
                currentXP={currentXP}
                level={level}
                xpToNextLevel={xpToNextLevel}
                totalXPForLevel={totalXPForLevel}
              />

              <DailyQuests quests={dailyQuests} />

              <AvatarCustomization items={avatarItems} />

              <AchievementBadges badges={badges} />
            </div>

            {/* Right Column - Stats & History */}
            <div className="space-y-8">
              <QuickStats 
                totalSessions={245}
                dayStreak={32}
                badgesEarned={badges.filter(b => b.unlocked).length}
              />

              <RecentRewards events={rewardHistory} />

              <WeeklyLeaderboard entries={leaderboard} />

              <WeeklyEmailSummary 
                weeklyEmailEnabled={weeklyEmailEnabled}
                onToggle={() => setWeeklyEmailEnabled(!weeklyEmailEnabled)}
              />

              <NextMilestone 
                level={level}
                xpToNextLevel={xpToNextLevel}
                totalXPForLevel={totalXPForLevel}
              />
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Gamification;