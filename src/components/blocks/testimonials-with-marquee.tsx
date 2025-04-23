import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      "container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl",
      className
    )}>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Loved by thousands
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about their experience
          </p>
        </div>

        <style jsx global>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .testimonial-marquee {
            animation: marquee 40s linear infinite;
            display: flex;
            width: max-content;
            gap: 1rem;
          }
          .testimonial-container:hover .testimonial-marquee {
            animation-play-state: paused;
          }
          .testimonial-group {
            display: flex;
            gap: 1rem;
          }
        `}</style>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden testimonial-container">
          <div className="flex w-full overflow-hidden">
            <div className="testimonial-marquee">
              <div className="testimonial-group">
                {testimonials.map((testimonial, i) => (
                  <div key={`set1-${i}`} className="w-[320px] shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
              <div className="testimonial-group">
                {testimonials.map((testimonial, i) => (
                  <div key={`set2-${i}`} className="w-[320px] shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  )
}