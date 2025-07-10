import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Flame } from "lucide-react";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

interface WeeklyLeaderboardProps {
  entries: LeaderboardEntry[];
}

export const WeeklyLeaderboard = ({ entries }: WeeklyLeaderboardProps) => {
  return (
    <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <Users className="w-6 h-6 text-orange-500" />
          <span>Weekly Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => (
          <div 
            key={entry.rank}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              entry.isCurrentUser 
                ? 'border-primary/50 bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg' 
                : 'border-border/30 bg-secondary/10 hover:bg-secondary/20'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                entry.rank === 2 ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30' :
                entry.rank === 3 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                'bg-muted text-muted-foreground'
              }`}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
              </div>
              <div>
                <p className={`font-semibold text-sm ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                  {entry.username}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{entry.xp} XP</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span>{entry.streak}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {entry.isCurrentUser && (
              <Badge variant="secondary" className="text-xs">
                You
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};