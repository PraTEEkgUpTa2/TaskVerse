import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Copy, 
  Share2, 
  Gift, 
  Trophy, 
  Coins, 
  CheckCircle, 
  Clock, 
  Twitter, 
  Mail,
  MessageSquare,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios"


type ReferredUser = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

type ReferralEntry = {
  _id: string;
  status: "pending" | "joined";
  referred?: ReferredUser | null;
  joinedAt?: string;
  createdAt: string;
};

type ReferralStatsResponse = {
  total: number;
  pending: ReferralEntry[];
  joined: ReferralEntry[];
};


const Referral = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [referralStats, setReferralStats] = useState<ReferralStatsResponse>({
  total: 0,
  pending: [],
  joined: [],
});
  
  

  const getUserData = async () => {
    const user = await axios.get("api/v1/users/profile");
    setReferralCode(user.data.data.referralCode);
  }

  const getReferralData = async () => {
    const res = await axios.get("api/v1/users/stats");
    setReferralStats(res.data.data);
  }

    useEffect(() => {
    getReferralData();
    getUserData();
  },[])

  const referralLink = referralCode ? `http://localhost:5173/signup?ref=${referralCode}` : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareOnTwitter = () => {
    const text = "Join me on TaskVerse - the ultimate productivity app! 🚀";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = `Join me on TaskVerse - the ultimate productivity app! 🚀 ${referralLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = "Join TaskVerse with me!";
    const body = `Hey! I've been using TaskVerse and it's amazing for productivity. Join me using this link: ${referralLink}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };

   const invitedFriends = [
  ...referralStats.joined.map((r) => ({
    id: r._id,
    name: r.referred?.name || "Unknown",
    status: "joined",
    joinedDate: new Date(r.joinedAt || r.createdAt).toLocaleDateString(),
    avatar: r.referred?.name?.split(" ").map(n => n[0]).join("") || "👤"
  })),
  ...referralStats.pending.map((r) => ({
    id: r._id,
    name: "Pending User",
    status: "pending",
    joinedDate: null,
    avatar: "⏳"
  }))
];

  const joinedCount = invitedFriends.filter(friend => friend.status === "joined").length;
  const targetCount = 3;
  const progressPercentage = Math.min((joinedCount / targetCount) * 100, 100);
  const isUnlocked = joinedCount >= targetCount;



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <div className="backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Refer & Unlock Rewards
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invite your friends to TaskVerse and unlock amazing rewards
              together! Build your productivity tribe and earn exclusive
              benefits.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Progress Section */}
        <Card className="border-slate-200 dark:border-slate-800 border border-primary/10 backdrop-blur-md shadow-xl rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-500" />
                  Your Invite Progress
                </CardTitle>
                <CardDescription>
                  {isUnlocked
                    ? "🎉 Congratulations! You've unlocked your reward!"
                    : `Invite ${
                        targetCount - joinedCount
                      } more friends to unlock 1-month Pro`}
                </CardDescription>
              </div>
              {isUnlocked && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Gift className="h-4 w-4 mr-1" />
                  Unlocked!
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">
                  {(joinedCount >= targetCount) ? `${targetCount}/${targetCount}`: `${joinedCount}/${targetCount}`} friends joined
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-3 bg-gradient-to-r from-green-400 to-emerald-500/10"
              />
              {isUnlocked && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">
                    1-month Pro plan unlocked!
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Referral Link Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 border border-primary/10 backdrop-blur-md shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  Your Referral Link
                </CardTitle>
                <CardDescription>
                  Share this link with your friends to invite them to TaskVerse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!referralLink ? (
                  <div className="text-muted-foreground text-sm">
                    Loading your referral link...
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={copyToClipboard} size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={shareOnTwitter} variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button onClick={shareOnWhatsApp} variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button onClick={shareViaEmail} variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Friends Invited Section */}
            <Card className="border-slate-200 dark:border-slate-800 border border-primary/10 backdrop-blur-md shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className=" text-blue-600" />
                  Friends You've Invited
                </CardTitle>
                <CardDescription>
                  Track your invited friends and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invitedFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {friend.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {friend.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {friend.status === "joined" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Joined {friend.joinedDate}</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-orange-500" />
                                <span>Pending</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          friend.status === "joined" ? "default" : "secondary"
                        }
                      >
                        {friend.status === "joined" ? "Joined" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 border border-primary/10 backdrop-blur-md shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Why Refer Friends?
                </CardTitle>
                <CardDescription>
                  Unlock amazing benefits for you and your friends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/20 dark:from-pink-600/30 dark:to-purple-600/20 shadow-md flex items-center justify-center">
                      <Gift className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Unlock 1-month Pro plan
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Get premium features free
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/20 dark:from-pink-600/30 dark:to-purple-600/20 shadow-md flex items-center justify-center">
                      <Coins className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Earn coins & XP
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Boost your productivity score
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/20 dark:from-pink-600/30 dark:to-purple-600/20 shadow-md flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Rank higher on leaderboard
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Show off your network
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/20 dark:from-pink-600/30 dark:to-purple-600/20 shadow-md flex items-center justify-center">
                      <Zap className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Early access to features
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Be the first to try new tools
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-slate-200 dark:border-slate-800 border border-primary/10 backdrop-blur-md shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Invites
                  </span>
                  <span className="font-semibold text-foreground">
                    {invitedFriends.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Friends Joined
                  </span>
                  <span className="font-semibold text-foreground">
                    {joinedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Rewards Unlocked
                  </span>
                  <span className="font-semibold text-foreground">
                    {isUnlocked ? 1 : 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;