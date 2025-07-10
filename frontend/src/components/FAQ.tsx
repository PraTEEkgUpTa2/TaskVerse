import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is TaskVerse?",
    answer: "TaskVerse is an upcoming productivity platform that combines task management, habit tracking, focus sessions, and AI-based planning — all gamified to make productivity more engaging and fun."
  },
  {
    question: "Is TaskVerse available to use right now?",
    answer: "Not yet! TaskVerse is currently under development. We're working hard to deliver a smooth and powerful experience. Stay tuned — an early access version will be launched soon!"
  },
  {
    question: "Will TaskVerse be free?",
    answer: "Yes. TaskVerse will offer a generous free tier that includes core features like task and habit management, Pomodoro timer, and basic gamification. We’ll also introduce a Pro version with advanced AI tools and team features."
  },
  {
    question: "What makes TaskVerse different?",
    answer: "Unlike traditional to-do apps, TaskVerse is being designed as a unified system — combining productivity tools, gamified progress tracking, and AI planning into a single beautiful interface."
  },
  {
    question: "What platforms will TaskVerse support?",
    answer: "We’re starting with a fully responsive web app. Mobile apps for iOS and Android are on the roadmap after launch with full cross-device sync planned."
  },
  {
    question: "Can I collaborate with others?",
    answer: "Team collaboration is part of our roadmap. Initially, TaskVerse will focus on solo productivity, with shared workspaces and group goals planned in future updates."
  },
  {
    question: "How can I stay updated?",
    answer: "You can follow our build journey on Twitter, Dev.to, and Medium. We’ll also launch a waitlist soon — sign up to be the first to try it!"
  },
  {
    question: "Can I suggest features or give feedback?",
    answer: "Absolutely! We're building TaskVerse in public and would love your feedback. Feel free to reach out through our social media or upcoming Discord community."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about TaskVerse and how it can transform your productivity.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}