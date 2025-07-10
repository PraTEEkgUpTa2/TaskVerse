import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Zap, Coins, Star } from "lucide-react";

export interface RewardEvent {
  id: string;
  type: 'xp' | 'coins' | 'badge';
  amount?: number;
  badgeName?: string;
  description: string;
  timestamp: string;
}

interface RecentRewardsProps {
  events: RewardEvent[];
}

export const RecentRewards = ({ events }: RecentRewardsProps) => {
  const getEventIcon = (event: RewardEvent) => {
    switch (event.type) {
      case 'xp':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'coins':
        return <Coins className="w-4 h-4 text-yellow-500" />;
      case 'badge':
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <Award className="w-6 h-6 text-purple-500" />
          <span>Recent Rewards</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div 
            key={event.id}
            className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-xl border border-border/30 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex-shrink-0">
              {getEventIcon(event)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {event.amount && (
                  <span className="text-sm font-semibold text-primary">
                    +{event.amount} {event.type === 'xp' ? 'XP' : 'Coins'}
                  </span>
                )}
                {event.badgeName && (
                  <Badge variant="secondary" className="text-xs">
                    {event.badgeName}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {event.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {event.timestamp}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};