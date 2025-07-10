import { useState } from "react";
import { Save, User, Bell, Camera, Zap, Crown, Shield, Lock, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    bio: "Productivity enthusiast and goal achiever. Building better habits daily!",
    avatar: ""
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    accentColor: "purple",
    weeklyEmail: true,
    taskReminders: true,
    focusReminders: false,
    darkMode: true
  });

  const [stats] = useState({
    level: 12,
    title: "Productivity Ninja",
    currentXP: 850,
    nextLevelXP: 1000,
    streak: 15
  });

  const progressPercentage = (stats.currentXP / stats.nextLevelXP) * 100;

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings...", { profile, preferences });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
            </div>
            <Button 
              onClick={handleSave} 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="">
        {/* Profile Section */}
        <div className="">
          {/* Profile Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="flex items-end gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-slate-900 dark:text-white text-2xl font-semibold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Crown className="h-4 w-4 text-white" />
                      <span className="text-white font-medium text-sm">Level {stats.level}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400/90 font-medium">{stats.title}</p>
                  <p className="text-slate-600 dark:text-slate-400/70 text-sm">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="pt-20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Experience</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{stats.currentXP} XP</span>
                    <span className="text-muted-foreground">{stats.nextLevelXP} XP</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🔥</span>
                  <span className="text-sm font-medium text-muted-foreground">Streak</span>
                </div>
                <div className="text-2xl font-bold text-orange-500">{stats.streak}</div>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Crown className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Rank</span>
                </div>
                <div className="text-2xl font-bold text-blue-500">#{stats.level}</div>
                <p className="text-xs text-muted-foreground">global ranking</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Full Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium text-foreground">Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    className="bg-background border-border resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Notifications Section */}
        <div className=" p-8">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">Get weekly progress reports via email</p>
                </div>
              </div>
              <Switch
                checked={preferences.weeklyEmail}
                onCheckedChange={(checked) => handlePreferenceChange("weeklyEmail", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Task Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
                </div>
              </div>
              <Switch
                checked={preferences.taskReminders}
                onCheckedChange={(checked) => handlePreferenceChange("taskReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Focus Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded to start focus sessions</p>
                </div>
              </div>
              <Switch
                checked={preferences.focusReminders}
                onCheckedChange={(checked) => handlePreferenceChange("focusReminders", checked)}
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-8">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Account Security
          </h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12 border-border text-foreground hover:bg-muted">
              <Lock className="h-4 w-4 mr-3" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 border-border text-foreground hover:bg-muted">
              <Globe className="h-4 w-4 mr-3" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 border-border text-foreground hover:bg-muted">
              <Shield className="h-4 w-4 mr-3" />
              Two-Factor Authentication
            </Button>
            <div className="pt-4 border-t">
              <Button variant="destructive" className="w-full h-12">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;