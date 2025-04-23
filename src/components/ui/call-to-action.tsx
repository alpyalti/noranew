import { MoveRight, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { useTheme } from "next-themes";

function CTA() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative flex flex-col text-center p-4 lg:p-12 gap-8 items-center overflow-hidden rounded-xl bg-background/50">
          {/* Grid Pattern */}
          <GridPattern
            size={32}
            color={resolvedTheme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}
            opacity={resolvedTheme === 'dark' ? 0.5 : 0.3}
            className="absolute inset-0 h-full w-full [mask-image:radial-gradient(white,transparent_85%)] dark:[mask-image:radial-gradient(white,transparent_70%)]"
          />
          
          {/* Content */}
          <div className="relative flex flex-col gap-6">
            <h3 className="text-4xl md:text-5xl tracking-tighter max-w-3xl font-bold">
              Try Qrea today!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-3xl">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal
              is to streamline marketing, making it easier and faster than ever.
            </p>
          </div>
          <div className="relative flex flex-row gap-4">
            <Button className="gap-4 cursor-pointer" variant="outline">
              Contact Us
            </Button>
            <Button className="group gap-4 cursor-pointer">
              Try For Free Now <MoveRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
