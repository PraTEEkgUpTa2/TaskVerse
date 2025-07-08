import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface QuickStatsProps {
  totalSessions: number;
  dayStreak: number;
  badgesEarned: number;
}

export const QuickStats = ({ totalSessions, dayStreak, badgesEarned }: QuickStatsProps) => {
  return (
    <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <Star className="w-6 h-6 text-yellow-500" />
          <span>Quick Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-500 mb-1">{totalSessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
            <div className="text-2xl font-bold text-green-500 mb-1">{dayStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-500 mb-1">{badgesEarned}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};