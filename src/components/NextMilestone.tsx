
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface NextMilestoneProps {
  level: number;
  xpToNextLevel: number;
  totalXPForLevel: number;
}

export const NextMilestone = ({ level, xpToNextLevel, totalXPForLevel }: NextMilestoneProps) => {
  return (
    <Card className="border-border/50 shadow-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">Next Milestone</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Level {level + 1}</span>
            <span className="text-sm text-muted-foreground">{xpToNextLevel} XP needed</span>
          </div>
          <Progress value={((totalXPForLevel - xpToNextLevel) / totalXPForLevel) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Complete 6 more focus sessions to level up!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};