"use client";

import { Navbar1 as ShadcnBlocksComNavbar1 } from "@/components/blocks/shadcnblocks-com-navbar1";
import { HeroGeometric as ShapeLandingHero } from "@/components/ui/shape-landing-hero";
import { Footerdemo as FooterSection } from "@/components/ui/footer-section";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Globe } from "@/components/ui/globe";
import { AnimatedList, AnimatedListProps } from "@/components/ui/animated-list";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Pricing } from "@/components/blocks/pricing";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { TextGrid } from "@/components/ui/text-grid";
import { Faq3 } from "@/components/blocks/faq3";
import { CTA } from "@/components/ui/call-to-action";
import { Zap, BarChart, Shield, Users } from "lucide-react";

// Counter animation component for the engagement metrics card
const CounterAnimation = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        }
        clearInterval(interval);
        return 100;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl font-bold">{count}%</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${count}%` }}
        ></div>
      </div>
    </div>
  );
};

// Feature Card component
const FeatureCard = ({ title, description, children }: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 z-0">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform group-hover:-translate-y-2">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );
};

// Step component for the how-it-works section
const Step = ({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center md:items-start max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center md:text-left">{description}</p>
    </div>
  );
};

// Custom animated list items
const AnimatedListItems = () => (
  <>
    <div className="bg-primary/10 p-3 rounded-lg font-medium w-full">Document edited by @user1</div>
    <div className="bg-primary/10 p-3 rounded-lg font-medium w-full">Comment added by @user2</div>
    <div className="bg-primary/10 p-3 rounded-lg font-medium w-full">Task completed by @user3</div>
    <div className="bg-primary/10 p-3 rounded-lg font-medium w-full">New version published</div>
  </>
);

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // FAQ items
  const faqItems = [
    {
      question: "How does the platform work?",
      answer: "Our platform provides a seamless integration of various tools and services, allowing you to manage your content efficiently. Simply sign up, set up your preferences, and start leveraging our powerful features."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with access to all features so you can experience the full potential of our platform before committing to a subscription."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Absolutely! You can easily switch between plans at any time. When upgrading, the new features will be immediately available. When downgrading, changes will take effect on your next billing cycle."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 customer support via chat, email, and phone for all paid plans. Our free plan includes email support with a 48-hour response time."
    },
    {
      question: "How secure is my data on your platform?",
      answer: "Security is our top priority. We use industry-standard encryption, regular security audits, and strict access controls to ensure your data remains safe and protected at all times."
    }
  ];

  // Pricing plans data
  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      yearlyPrice: "290",
      period: "month",
      features: [
        "5 team members",
        "10 projects",
        "5GB storage",
        "Basic analytics",
        "24/7 email support"
      ],
      description: "Perfect for small teams getting started",
      buttonText: "Get Started",
      href: "#",
      isPopular: false
    },
    {
      name: "Pro",
      price: "79",
      yearlyPrice: "790",
      period: "month",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "50GB storage",
        "Advanced analytics",
        "24/7 priority support",
        "Custom integrations",
        "Team collaboration tools"
      ],
      description: "Best for growing teams and businesses",
      buttonText: "Get Started",
      href: "#",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "199",
      yearlyPrice: "1990",
      period: "month",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Enterprise-grade security",
        "Custom reporting",
        "Dedicated account manager",
        "SLA guarantees",
        "Training sessions"
      ],
      description: "For large organizations with specific needs",
      buttonText: "Contact Sales",
      href: "#",
      isPopular: false
    }
  ];

  // Don't render UI until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar with Dark/Light Mode Toggle */}
      <header className="w-full border-b border-white/10 sticky top-0 z-50 bg-background/40 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/2">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between h-14">
            <div className="flex-1">
              <ShadcnBlocksComNavbar1 
                logo={{
                  url: "/",
                  src: "/logo.svg",
                  alt: "Logo",
                  title: ""
                }}
                menu={[
                  { title: "Home", url: "/" },
                  {
                    title: "Features",
                    url: "#features",
                    items: [
                      {
                        title: "AI Integration",
                        description: "Advanced AI capabilities for your business",
                        icon: <Zap className="size-5 shrink-0" />,
                        url: "#ai"
                      },
                      {
                        title: "Analytics",
                        description: "Comprehensive analytics and insights",
                        icon: <BarChart className="size-5 shrink-0" />,
                        url: "#analytics"
                      },
                      {
                        title: "Security",
                        description: "Enterprise-grade security features",
                        icon: <Shield className="size-5 shrink-0" />,
                        url: "#security"
                      },
                      {
                        title: "Collaboration",
                        description: "Real-time team collaboration tools",
                        icon: <Users className="size-5 shrink-0" />,
                        url: "#collaboration"
                      }
                    ]
                  },
                  { title: "Pricing", url: "#pricing" },
                  { title: "FAQ", url: "#faq" }
                ]}
                auth={{
                  login: { text: "Login", url: "#login" },
                  signup: { text: "Sign Up", url: "#signup" }
                }}
              />
            </div>
            <div className="flex items-center ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Full width */}
        <section className="w-full">
          <ShapeLandingHero 
            badge="Effortless, AI-Powered Marketing"
            title1="Unleash Your"
            title2="Potential With Qrea"
          />
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-6xl" id="features">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">Discover the tools that will transform your workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              title="Seamless Integrations" 
              description="Connect with your favorite tools and services without any friction."
            >
              <div className="scale-[1.2]">
                <OrbitingCircles />
              </div>
            </FeatureCard>
            
            <FeatureCard 
              title="Global Localization" 
              description="Reach your audience in their language with our advanced localization."
            >
              <div className="scale-[1.2]">
                <Globe />
              </div>
            </FeatureCard>
            
            <FeatureCard 
              title="Realtime Updates" 
              description="Stay in sync with the latest changes as they happen across your team."
            >
              <div className="scale-[1.2] flex items-center justify-center h-full">
                <AnimatedList>
                  <AnimatedListItems />
                </AnimatedList>
              </div>
            </FeatureCard>
            
            <FeatureCard 
              title="Increased Engagement" 
              description="Watch your metrics soar with our engagement-focused features."
            >
              <div className="flex items-center justify-center h-full p-8">
                <CounterAnimation />
              </div>
            </FeatureCard>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Step 
              number="1" 
              title="Sign Up" 
              description="Create your account in seconds and get immediate access to our platform."
            />
            <Step 
              number="2" 
              title="Configure" 
              description="Set up your preferences and integrate with your existing tools and workflows."
            />
            <Step 
              number="3" 
              title="Grow" 
              description="Leverage our powerful features to scale your operations and achieve your goals."
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-6xl" id="pricing">
          <Pricing plans={pricingPlans} />
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-6xl" id="faq">
          <div className="text-center space-y-4 mb-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about our platform and services</p>
          </div>
          <Faq3 heading="" description="" />
        </section>

        {/* Call to Action Section */}
        <section className="container mx-auto pb-8 px-4 md:px-6 lg:px-8 max-w-6xl">
          <CTA />
        </section>

        {/* Footer */}
        <FooterSection />
      </main>

      {/* Bottom Grid Animation - Full width */}
      <div className="relative w-full h-60 md:h-96 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
        <FlickeringGrid 
          squareSize={4} 
          gridGap={3} 
          flickerChance={0.2} 
          maxOpacity={0.2}
          color={mounted && resolvedTheme === "dark" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"} 
        />
        <div className="absolute inset-0 z-20">
          <TextGrid text="UNLEASH YOUR POTENTIAL" />
        </div>
      </div>
    </div>
  );
}
