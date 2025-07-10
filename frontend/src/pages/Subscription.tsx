import { Check, Star, Zap, Crown, Shield, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Subscription = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 10 tasks per day",
        "3 habit trackers",
        "Basic focus sessions",
        "Weekly analytics",
        "Basic gamification"
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Star
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious productivity enthusiasts",
      features: [
        "Unlimited tasks & projects",
        "Unlimited habit trackers",
        "Advanced focus modes",
        "Detailed analytics & reports",
        "Full gamification system",
        "Priority support",
        "Data export",
        "Custom themes"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
      icon: Zap
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Advanced integrations",
        "Custom branding",
        "SSO authentication",
        "24/7 phone support",
        "Dedicated account manager"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Crown
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared with third parties"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with real-time sync across all devices"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      
      
      <main className="p-6 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full">
            <Crown className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Upgrade Your Productivity</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Choose Your TaskVerse Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Unlock powerful features to supercharge your productivity and achieve your goals faster
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? "border-purple-200 dark:border-purple-800 shadow-lg scale-105" 
                  : "border-slate-200 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${
                  plan.popular 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                    : "bg-slate-100 dark:bg-slate-800"
                }`}>
                  <plan.icon className={`w-6 h-6 ${
                    plan.popular ? "text-white" : "text-slate-600 dark:text-slate-400"
                  }`} />
                </div>
                
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">
                    {plan.description}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full py-3 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white" 
                      : ""
                  }`}
                  disabled={plan.name === "Free"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose TaskVerse?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Built for modern professionals who demand the best productivity tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period."
              },
              {
                question: "Is there a free trial for Pro plans?",
                answer: "Yes, we offer a 14-day free trial for all Pro plans. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
