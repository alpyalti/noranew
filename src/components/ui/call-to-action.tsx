import { MoveRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

function CTA() {
  return (
    <div className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative flex flex-col text-center p-4 lg:p-12 gap-8 items-center overflow-hidden border-2 border-gray-200/70 dark:border-gray-700/70 rounded-xl">
          {/* Grid Pattern */}
          <GridPattern
            strokeDasharray="2"
            width={100}
            height={10}
            className="absolute inset-0 h-full w-full fill-gray-400/40 stroke-gray-400/40 dark:fill-white/[0.1] dark:stroke-white/[0.1]"
          />
          
          {/* Content */}
          <div className="relative flex flex-col gap-6">
            <h3 className="text-4xl md:text-5xl tracking-tighter max-w-3xl font-bold">
              Try Qrea today!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-3xl">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal
              is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="relative flex flex-row gap-4">
            <Button className="gap-4 cursor-pointer" variant="outline">
              Schedule meeting <Calendar className="w-4 h-4" />
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
