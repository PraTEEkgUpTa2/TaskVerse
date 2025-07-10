import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, subtext, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
