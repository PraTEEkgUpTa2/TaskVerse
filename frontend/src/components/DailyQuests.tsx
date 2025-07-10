
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, Zap, Coins } from "lucide-react";

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: { type: 'xp' | 'coins'; amount: number };
  completed: boolean;
}

interface DailyQuestsProps {
  quests: DailyQuest[];
}

export const DailyQuests = ({ quests }: DailyQuestsProps) => {
  return (
    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg">
            <Target className="w-7 h-7 text-green-500" />
          </div>
          <span>Daily Quests</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.map((quest) => (
          <div 
            key={quest.id}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              quest.completed 
                ? 'border-green-500/50 bg-gradient-to-r from-green-500/10 to-green-500/5' 
                : 'border-border/50 bg-secondary/20 hover:bg-secondary/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  quest.completed ? 'bg-green-500' : 'bg-secondary'
                }`}>
                  {quest.completed ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{quest.title}</h3>
                  <p className="text-xs text-muted-foreground">{quest.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {quest.reward.type === 'xp' ? (
                    <Zap className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Coins className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="text-sm font-medium text-yellow-500">
                    +{quest.reward.amount}
                  </span>
                </div>
              </div>
            </div>
            
            {!quest.completed && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{quest.progress}/{quest.target}</span>
                </div>
                <Progress 
                  value={(quest.progress / quest.target) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};