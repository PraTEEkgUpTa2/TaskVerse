import { Gift, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function GamificationWidget() {
  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>Level Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level and XP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Level 12</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Productivity Ninja</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-500">2,850</p>
              <p className="text-xs text-slate-500">XP</p>
            </div>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">150 XP to Level 13</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-white">245</p>
            <p className="text-xs text-slate-500">Tasks Done</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-white">32</p>
            <p className="text-xs text-slate-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-white">18</p>
            <p className="text-xs text-slate-500">Badges</p>
          </div>
        </div>

        {/* Recent Achievement */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Recent Achievement</h4>
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <Medal className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Task Master</p>
              <p className="text-xs text-slate-500">Complete 100 tasks</p>
            </div>
            <Badge variant="secondary" className="ml-auto">75%</Badge>
          </div>
        </div>

        {/* Next Reward */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="w-4 h-4 text-yellow-600" />
            <p className="text-sm font-medium">Next Reward</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">250 XP until Premium Themes unlock!</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55.47.98.97 1.21C11.25 18.48 11.61 18.9 12 19.34c.39-.44.75-.86 1.03-1.13.5-.23.97-.66.97-1.21v-2.34" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
