import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Medal, Lock } from "lucide-react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  requirement: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgesProps {
  badges: Badge[];
}

export const AchievementBadges = ({ badges }: AchievementBadgesProps) => {
  return (
    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg">
            <Medal className="w-7 h-7 text-yellow-500" />
          </div>
          <span>Achievement Badges</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  badge.unlocked 
                    ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg hover:shadow-xl' 
                    : 'border-muted-foreground/20 bg-muted/10 opacity-60'
                }`}>
                  {!badge.unlocked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`p-3 rounded-full ${
                      badge.unlocked 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' 
                        : 'bg-muted/20'
                    }`}>
                      <badge.icon className={`w-8 h-8 ${
                        badge.unlocked ? 'text-yellow-500' : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="w-full bg-secondary/30 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {badge.progress ? `${badge.progress}/${badge.maxProgress}` : badge.requirement}
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-sm">{badge.description}</p>
                  <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};