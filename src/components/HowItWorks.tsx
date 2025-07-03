import { UserPlus, Calendar, Play, Gift } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required.",
    details: "Get started with our forever-free plan and explore all basic features.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Plan Your Day",
    description: "Add tasks, set habits, and let our AI help you organize your priorities.",
    details: "Smart scheduling suggestions based on your goals and energy levels.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Play,
    title: "Execute & Focus",
    description: "Start your Pomodoro sessions, complete tasks, and build streaks.",
    details: "Gamified experience makes productivity addictive and rewarding.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description: "Level up, unlock badges, and celebrate your productivity wins.",
    details: "Share achievements with friends and climb the leaderboards.",
    color: "from-pink-500 to-red-500"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How TaskVerse{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started in minutes and transform your productivity with our proven 4-step system.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white dark:text-gray-900">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.details}
                  </p>
                </div>

                {/* Arrow for mobile */}
                <div className="lg:hidden flex justify-center mt-8 mb-8">
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Productivity?</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              TaskVerse is your next-gen productivity companion. Sign up now for free early access and unlock your most focused self.
            </p>
            <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Started Now
              <UserPlus className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}