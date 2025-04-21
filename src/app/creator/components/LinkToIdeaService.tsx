import * as React from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
  Link,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  TableIcon,
  Star,
} from "lucide-react"

// Import CopyButton
import { CopyButton } from "../utils/CopyButton"

interface LinkToIdeaServiceProps {
  // Props
}

export default function LinkToIdeaService({}: LinkToIdeaServiceProps) {
  const [linkStepActive, setLinkStepActive] = React.useState(1);
  const [linkInputValue, setLinkInputValue] = React.useState("");
  const [isGeneratingTranscript, setIsGeneratingTranscript] = React.useState(false);
  const [isGeneratingIdea, setIsGeneratingIdea] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [aiIdea, setAiIdea] = React.useState("");
  
  // Function to handle URL submission
  const handleLinkSubmit = () => {
    if (!linkInputValue) return;
    setIsGeneratingTranscript(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setTranscript("This is a sample transcript of the video. It would contain the actual content from the video, including all spoken words, key phrases, and important points discussed. The transcript helps in understanding the main topics covered in the video and provides a text-based representation of the audio content. By analyzing this transcript, our AI can identify trends, topics, and opportunities that might be relevant to your brand.\n\nIn a real implementation, this would be the actual transcript extracted from the video URL you provided, processed through speech recognition and text analysis tools to ensure accuracy and completeness.");
      setIsGeneratingTranscript(false);
      setLinkStepActive(2);
    }, 3000);
  };

  // Function to handle idea generation
  const handleGenerateIdea = () => {
    setIsGeneratingIdea(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setAiIdea("Based on the content analysis, here's a tailored content idea for your brand:\n\n\"Innovative Product Showcase Series: Weekly 60-second demonstrations highlighting a single feature of your product in a problem-solution format. Each video addresses a specific pain point mentioned by your customers, shows how your product solves it, and ends with a customer testimonial. This format has been performing exceptionally well in your industry, with 43% higher engagement rates compared to standard promotional content.\"\n\nThis approach leverages the trending short-form educational content style while maintaining your brand's professional tone and focusing on customer-centric messaging that resonates with your target audience.");
      setIsGeneratingIdea(false);
      setLinkStepActive(3);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Step 1: URL Input */}
      <Collapsible
        open={linkStepActive === 1}
        onOpenChange={(open: boolean) => open && setLinkStepActive(1)}
        className="border rounded-lg"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
              <Link className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Enter Social Media Link</h3>
          </div>
          {linkStepActive === 1 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 pt-0 transition-transform duration-200 ease-out data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
              Enter a YouTube, Instagram, or TikTok video URL to transform into content ideas for your brand
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={linkInputValue}
                onChange={(e) => setLinkInputValue(e.target.value)}
              />
              <Button 
                onClick={handleLinkSubmit}
                disabled={!linkInputValue || isGeneratingTranscript}
                className="cursor-pointer group"
              >
                {isGeneratingTranscript ? (
                  <>
                    Generating
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  </>
                ) : (
                  <>
                    Generate
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Step 2: Transcript */}
      <Collapsible
        open={linkStepActive === 2}
        onOpenChange={(open: boolean) => open && linkStepActive >= 2 && setLinkStepActive(2)}
        className="border rounded-lg"
        disabled={linkStepActive < 2}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 cursor-pointer" disabled={linkStepActive < 2}>
          <div className="flex items-center gap-2">
            <div className={cn(
              "rounded-full h-6 w-6 flex items-center justify-center text-sm",
              linkStepActive >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <FileText className="h-4 w-4" />
            </div>
            <h3 className={cn(
              "font-medium",
              linkStepActive < 2 && "text-muted-foreground"
            )}>Video Transcript</h3>
          </div>
          {linkStepActive === 2 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 pt-0 transition-transform duration-200 ease-out data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
          <div className="space-y-4">
            <div className="relative">
              <div className="rounded-md border border-input bg-background p-4 text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
                {transcript}
              </div>
              <CopyButton text={transcript} />
            </div>
            <Button 
              onClick={handleGenerateIdea}
              disabled={isGeneratingIdea}
              className="w-full cursor-pointer group"
            >
              {isGeneratingIdea ? (
                <>
                  Generating idea
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                </>
              ) : (
                <>
                  Generate Idea with AI
                  <Sparkles className="ml-2 h-4 w-4 transition-all duration-200 group-hover:rotate-12 group-hover:scale-110" />
                </>
              )}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Step 3: AI-Generated Idea */}
      <Collapsible
        open={linkStepActive === 3}
        onOpenChange={(open: boolean) => open && linkStepActive === 3 && setLinkStepActive(3)}
        className="border rounded-lg"
        disabled={linkStepActive < 3}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 cursor-pointer" disabled={linkStepActive < 3}>
          <div className="flex items-center gap-2">
            <div className={cn(
              "rounded-full h-6 w-6 flex items-center justify-center text-sm",
              linkStepActive >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className={cn(
              "font-medium",
              linkStepActive < 3 && "text-muted-foreground"
            )}>Your Custom Idea</h3>
          </div>
          {linkStepActive === 3 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 pt-0 transition-transform duration-200 ease-out data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
          <div className="space-y-4">
            <div className="relative">
              <div className="rounded-md border border-input bg-background p-4 text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
                {aiIdea}
              </div>
              <CopyButton text={aiIdea} />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 cursor-pointer"
              >
                <Star className="h-4 w-4 mr-2" />
                Add to Favorites
              </Button>
              <Button 
                className="flex-1 cursor-pointer"
              >
                <TableIcon className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
} 