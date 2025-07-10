import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Lock, CheckCircle, Coins } from "lucide-react";

export interface AvatarItem {
  id: string;
  name: string;
  type: 'outfit' | 'pet' | 'accessory';
  cost: number;
  unlocked: boolean;
  equipped: boolean;
  icon: React.ElementType;
}

interface AvatarCustomizationProps {
  items: AvatarItem[];
}

export const AvatarCustomization = ({ items }: AvatarCustomizationProps) => {
  return (
    <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-lg">
            <User className="w-7 h-7 text-pink-500" />
          </div>
          <span>Avatar Customization</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  item.equipped 
                    ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg'
                    : item.unlocked 
                      ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-500/5 hover:shadow-lg' 
                      : 'border-muted-foreground/20 bg-muted/10 opacity-60'
                }`}>
                  {!item.unlocked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  {item.equipped && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-full ${
                      item.equipped 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10'
                        : item.unlocked 
                          ? 'bg-gradient-to-r from-green-500/20 to-green-500/10' 
                          : 'bg-muted/20'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        item.equipped 
                          ? 'text-primary' 
                          : item.unlocked 
                            ? 'text-green-500' 
                            : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-xs mb-1">{item.name}</h3>
                      <div className="flex items-center justify-center space-x-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-muted-foreground">{item.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div className="space-y-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs">Cost: {item.cost} coins</p>
                  <p className="text-xs">
                    {item.equipped ? 'Currently equipped' : item.unlocked ? 'Available to equip' : 'Locked'}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/30">
          <Button variant="outline" className="w-full">
            <Coins className="w-4 h-4 mr-2" />
            Go to Store
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};