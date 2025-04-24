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
import { Zap, BarChart, Shield, Users, Code, Sparkles, Lightbulb, Wand2, Camera, BarChart2, Image as ImageIcon, Users2, Palette, TrendingUp } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ConversionScoreChart } from "@/components/ui/conversion-score-chart";
import { GridPattern } from "@/components/ui/grid-pattern";
import { RadialScoreChart } from "@/components/ui/radial-score-chart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PartnerLogos } from "@/components/ui/partner-logos";
import { Ripple } from "@/components/magicui/ripple";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { SimpleBackgroundPaths } from "@/components/ui/background-paths";
import Image from "next/image";

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
      question: "What is a \"Download\" on Qrea?",
      answer: "A download is used when you save a generated creative (image, video, or text) to your device. Each plan includes a set number of download credits, which refresh monthly."
    },
    {
      question: "What are \"Brands\" in Qrea?",
      answer: "Brands let you save your brand details and assets — such as descriptions, target audience, brand logo and colours — so that every creative you generate is automatically tailored to your brand identity."
    },
    {
      question: "What does \"Unlimited Generations\" mean?",
      answer: "You can generate as many creatives as you want, anytime. Downloads are only used when you choose to export a creative."
    },
    {
      question: "What are \"Unlimited Free Stock Images\"?",
      answer: "With Qrea, you get access to over 100 million royalty-free stock images — included in every plan, at no extra cost."
    },
    {
      question: "What is \"AI Prediction\"?",
      answer: "Each creative you generate comes with a real-time Conversion Score, predicting its performance before you publish — powered by Qrea's AI models trained on real campaign data."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan anytime. Your new billing cycle will begin immediately, and any unused download credits will carry over."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer refunds within 7 days (monthly plans) or 30 days (annual plans), as long as no creatives have been generated or downloaded. Contact us at support@qrea.ai to request a refund."
    },
    {
      question: "Can I use Qrea-generated content for commercial purposes?",
      answer: "Absolutely. All creatives generated through Qrea — including AI visuals, stock images, and text — are commercially safe and ready to use in your marketing campaigns."
    }
  ];

  // Pricing plans data
  const pricingPlans = [
    {
      name: "Starter",
      price: "25",
      yearlyPrice: "20",
      period: "month",
      features: [
        "10 Downloads",
        "1 Brand",
        "Limited Qrea AI Tools",
        "Unlimited Generation",
        "Unlimited Stock Photos",
        "2 Team Members"
      ],
      description: "Perfect for small teams getting started",
      buttonText: "Try For Free Now",
      href: "#",
      isPopular: false
    },
    {
      name: "Pro",
      price: "240",
      yearlyPrice: "200",
      period: "month",
      features: [
        "100 Downloads",
        "3 Brands",
        "Unlimited Generation",
        "Unlimited Stock Photos",
        "All Qrea AI Tools",
        "5 Team Members",
        "Pro Features",
        "Premium Support"
      ],
      description: "Best for growing teams and businesses",
      buttonText: "Try For Free Now",
      href: "#",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "840",
      yearlyPrice: "700",
      period: "month",
      features: [
        "Unlimited Downloads",
        "Unlimited Brands",
        "Unlimited Generation",
        "Unlimited Stock Photos",
        "All Qrea AI Tools",
        "All features in Pro Package",
        "Unlimited Team Members",
        "Done-for-You Creative Service"
      ],
      description: "For large organizations with specific needs",
      buttonText: "Contact Sales",
      href: "#",
      isPopular: false,
      pricePrefix: "Starts from"
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

        {/* Partner Logos Section */}
        <PartnerLogos />

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
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-[75%] h-[85%]">
                      <Image
                        src="/cardbg.webp"
                        alt="Card Background"
                        fill
                        className="object-contain opacity-70"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                }
                Icon={ImageIcon}
                description="Find or generate premium, commercially-safe stock images and videos with a prompt."
                href="#"
                cta="Try image generator"
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
                background={
                  <div className="absolute inset-0">
                    <Ripple
                      mainCircleSize={150}
                      mainCircleOpacity={0.35}
                      numCircles={6}
                    />
                  </div>
                }
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
                  <div className="absolute right-[-10%] top-[-0%] w-[80%] h-[80%] opacity-40 dark:opacity-15">
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
                Icon={ImageIcon}
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
                background={
                  <div className="absolute inset-0 opacity-20">
                    <SimpleBackgroundPaths />
                  </div>
                }
                Icon={Palette}
                description="The all-in-one AI toolkit for every creative need"
                href="#"
                cta="Explore toolkit"
              />
            </BentoGrid>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">How it works?</h2>
            <p className="text-lg text-muted-foreground">
              Let AI do the heavy lifting — so you can focus on results.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="space-y-8 lg:w-1/2">
              <p className="text-lg text-muted-foreground">
                Create scroll-stopping banners, videos, texts, and product visuals in seconds. Boost conversions by up to 20x with AI-optimized, on-brand ad content.
              </p>

              <div className="space-y-4">
                <div className="text-lg text-muted-foreground flex items-center">
                  <span className="mr-2 text-xl">•</span>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="border-b border-dashed border-muted-foreground cursor-help">Conversion Score</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>AI predicts your creative's performance before you publish, helping you make data-driven decisions.</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>: AI predicts your creative's impact
                </div>
                <div className="text-lg text-muted-foreground flex items-center">
                  <span className="mr-2 text-xl">•</span>
                  <div className="flex items-center gap-1">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="border-b border-dashed border-muted-foreground cursor-help">High-ROI</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Our AI optimizes your creatives for maximum return on investment, based on real campaign data.</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span>creatives in seconds</span>
                  </div>
                </div>
                <div className="text-lg text-muted-foreground flex items-center">
                  <span className="mr-2 text-xl">•</span>
                  <div className="flex items-center gap-1">
                    <span>Fully customizable &</span>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="border-b border-dashed border-muted-foreground cursor-help">platform-ready</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Your creatives are automatically formatted for all major platforms, ready to publish instantly.</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="text-lg text-muted-foreground flex items-center">
                  <span className="mr-2 text-xl">•</span>
                  Built to scale with your team
                </div>
              </div>
            </div>

            <div className="relative lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={resolvedTheme === "dark" ? "/black.png" : "/white2.png"}
                  alt="AI-powered marketing platform"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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
          <Faq3 
            heading="" 
            description="" 
            items={faqItems.map((item, index) => ({
              id: `faq-${index + 1}`,
              question: item.question,
              answer: item.answer
            }))}
          />
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
