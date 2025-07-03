import { Users, Gift, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const referralRewards = [
  {
    friends: 1,
    reward: "Premium Themes",
    description: "Unlock beautiful dark and light themes",
    icon: "🎨"
  },
  {
    friends: 3,
    reward: "Advanced Analytics",
    description: "Detailed productivity insights and reports",
    icon: "📊"
  },
  {
    friends: 5,
    reward: "AI Planning Pro",
    description: "Enhanced AI assistant with weekly planning",
    icon: "🧠"
  },
  {
    friends: 10,
    reward: "Lifetime Pro",
    description: "All premium features, forever free!",
    icon: "👑"
  }
];

export function Referral() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4 mr-2" />
            Limited Time: Double Rewards
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Invite Friends,{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Unlock Pro Features
            </span>
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Share TaskVerse with friends and earn premium features for free. 
            The more friends you invite, the more you unlock!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Referral Rewards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Referral Rewards Program</h3>
            
            {referralRewards.map((reward, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{reward.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                          {reward.friends} friend{reward.friends > 1 ? 's' : ''}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                        <span className="font-semibold">{reward.reward}</span>
                      </div>
                      <p className="text-indigo-100 text-sm">{reward.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: How It Works */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6">How It Works</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Share Your Link</h4>
                  <p className="text-indigo-100 text-sm">Get your unique referral link from your dashboard and share it with friends.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Friends Sign Up</h4>
                  <p className="text-indigo-100 text-sm">When they create an account using your link, you both get bonus XP!</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Unlock Rewards</h4>
                  <p className="text-indigo-100 text-sm">Automatically unlock premium features based on successful referrals.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">Pro Tip</span>
              </div>
              <p className="text-sm text-indigo-100">
                Friends who stay active for 30 days count as successful referrals. 
                Quality over quantity!
              </p>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all">
              <Users className="mr-2 w-5 h-5" />
              Start Referring Friends
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-yellow-400 mb-2">Coming Soon...</div>
            <div className="text-indigo-100">Join the TaskVerse</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}