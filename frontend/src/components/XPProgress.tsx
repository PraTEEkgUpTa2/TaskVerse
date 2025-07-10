import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  totalXPForLevel: number;
}

export const XPProgress = ({ currentXP, level, xpToNextLevel, totalXPForLevel }: XPProgressProps) => {
  const xpProgress = ((currentXP % totalXPForLevel) / totalXPForLevel) * 100;

  return (
    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg">
            <TrendingUp className="w-7 h-7 text-purple-500" />
          </div>
          <span>Level Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Level {level}
              </h2>
              <Badge variant="secondary" className="text-sm font-semibold">
                Productivity Ninja
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {xpToNextLevel} XP to Level {level + 1}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{currentXP}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </div>
        </div>

        <div className="space-y-3">
          <Progress 
            value={xpProgress} 
            className="h-4 bg-secondary/30"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{currentXP % totalXPForLevel} XP</span>
            <span>{Math.round(xpProgress)}% complete</span>
            <span>{totalXPForLevel} XP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};