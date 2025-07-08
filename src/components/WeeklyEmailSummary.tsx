import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface WeeklyEmailSummaryProps {
  weeklyEmailEnabled: boolean;
  onToggle: () => void;
}

export const WeeklyEmailSummary = ({ weeklyEmailEnabled, onToggle }: WeeklyEmailSummaryProps) => {
  return (
    <Card className="border-border/50 shadow-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Mail className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">Weekly Summary</h3>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get a weekly summary of your productivity achievements delivered to your inbox.
          </p>
          
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30">
            <div className="space-y-1">
              <p className="font-medium text-sm">Email Notifications</p>
              <p className="text-xs text-muted-foreground">
                XP earned, streaks, and new badges
              </p>
            </div>
            <Button 
              variant={weeklyEmailEnabled ? "default" : "outline"}
              size="sm"
              onClick={onToggle}
            >
              {weeklyEmailEnabled ? 'Enabled' : 'Enable'}
            </Button>
          </div>
          
          {weeklyEmailEnabled && (
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-500 font-medium">
                ✅ Weekly summaries enabled
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Next summary: Sunday 8 AM
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};