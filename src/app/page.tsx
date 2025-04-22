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
import { Zap, BarChart, Shield, Users, Code, Sparkles, Lightbulb, Wand2, Camera, BarChart2, Image, Users2, Palette } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";

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

// Sample testimonials data
const testimonials = [
  {
    text: "Qrea has transformed our marketing strategy. The AI-powered tools are incredibly intuitive and save us hours of work every day.",
    author: {
      name: "Sarah Johnson",
      handle: "Marketing Director at TechCorp",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    text: "The creative assets we generate with Qrea consistently outperform our previous campaigns. It's like having a design team in your pocket.",
    author: {
      name: "Michael Chen",
      handle: "Digital Marketing Lead",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  },
  {
    text: "As a small business owner, Qrea has been a game-changer. We now create professional marketing materials in minutes instead of days.",
    author: {
      name: "Emma Davis",
      handle: "Founder, Bloom Boutique",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    text: "The localization feature is brilliant. We've expanded into new markets with perfectly adapted content, all thanks to Qrea.",
    author: {
      name: "Carlos Rodriguez",
      handle: "Global Marketing Manager",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  },
  {
    text: "Our team's productivity has skyrocketed since we started using Qrea. The collaborative features are especially impressive.",
    author: {
      name: "Lisa Zhang",
      handle: "Creative Director",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  }
];

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
      buttonText: "Try For Free Now",
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
      buttonText: "Try For Free Now",
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
                  title: "Qrea"
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

        {/* Powerful Features Section */}
        <section className="container mx-auto px-4 py-35 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Powerful Features
            </h2>
            <p className="text-muted-foreground">
              Discover the tools and features that make our platform stand out
            </p>
          </div>
          <div className="mt-16">
            <BentoGrid className="mx-auto max-w-5xl">
              {/* Row 1: big - small */}
              <BentoCard
                name="One-Click Ad Creation"
                className="col-span-3 md:col-span-2"
                background={<div />}
                Icon={Wand2}
                description="Launch scroll-stopping ad creatives in seconds — no design skills needed."
                href="#"
                cta="Try ad creator"
              />
              <BentoCard
                name="Product Photo & Video Shoots"
                className="col-span-3 md:col-span-1"
                background={<div />}
                Icon={Camera}
                description="Turn basic product shots into professional photos and videos, effortlessly."
                href="#"
                cta="Start shooting"
              />

              {/* Row 2: small - big */}
              <BentoCard
                name="Creative Insights"
                className="col-span-3 md:col-span-1"
                background={<div />}
                Icon={BarChart2}
                description="Track your top-performing creatives and monitor your competitors' moves."
                href="#"
                cta="View analytics"
              />
              <BentoCard
                name="AI-Powered Daily Pulse"
                className="col-span-3 md:col-span-2"
                background={<div />}
                Icon={Sparkles}
                description="Get fresh content ideas daily — AI scans the internet so you don't have to."
                href="#"
                cta="Get insights"
              />

              {/* Row 3: big - small */}
              <BentoCard
                name="Localization"
                className="col-span-3 md:col-span-2"
                background={
                  <div className="absolute right-[-20%] bottom-[-30%] w-[80%] h-[80%] opacity-20">
                    <Globe />
                  </div>
                }
                Icon={() => null}
                description="Automatically convert any webpage or social media link into region-specific marketing assets."
                href="#"
                cta="Start localizing"
              />
              <BentoCard
                name="Smart Stock Generator"
                className="col-span-3 md:col-span-1"
                background={<div />}
                Icon={Image}
                description="Find or generate premium, commercially-safe stock images and videos with a prompt."
                href="#"
                cta="Generate assets"
              />

              {/* Row 4: small - big */}
              <BentoCard
                name="Collaborative Content Planning"
                className="col-span-3 md:col-span-1"
                background={<div />}
                Icon={Users2}
                description="Plan, schedule, and manage content together — built for teams."
                href="#"
                cta="Start planning"
              />
              <BentoCard
                name="Creative Utility Suite"
                className="col-span-3 md:col-span-2"
                background={<div />}
                Icon={Palette}
                description="The all-in-one AI toolkit for every creative need"
                href="#"
                cta="Explore toolkit"
              />
            </BentoGrid>
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

        {/* Testimonials Section */}
        <TestimonialsSection
          title="Loved by marketing teams worldwide"
          description="See what our customers have to say about their experience with Qrea"
          testimonials={testimonials}
        />

        {/* Pricing Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-6xl" id="pricing">
          <Pricing plans={pricingPlans} />
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-6xl" id="faq">
          <div className="text-center space-y-4 mb-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about our platform and services</p>
          </div>
          <Faq3 heading="" description="" />
        </section>

        {/* Call to Action Section */}
        <section className="container mx-auto py-4 px-4 md:px-6 lg:px-8 max-w-6xl">
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
