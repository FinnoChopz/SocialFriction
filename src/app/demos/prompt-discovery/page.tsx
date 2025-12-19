"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WriteupEmbed } from "@/components/shared/WriteupEmbed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink, Loader2, Maximize2 } from "lucide-react";

export default function PromptDiscoveryDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Navigation />
      <main className="bg-transparent min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back link */}
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All demos
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Prompt Discovery</h1>
                  <p className="text-sm text-muted-foreground">
                    Watch hidden instructions reshape model behavior
                  </p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Large language models don&apos;t have a single &quot;personality&quot;—they have many, depending
                  on how they&apos;re prompted. Whenever you ask a question to ChatGPT or any other frontier
                  model*, the model isn’t just seeing the question you ask–it’s also seeing a system
                  prompt, created by OpenAI, that gets appended at the top of your message. So if you’re
                  asking the model:
                </p>
                <p className="text-muted-foreground">
                  “Rate this joke 1-10: Why did the chicken cross the road? To get to the other side!”
                </p>
                <p className="text-muted-foreground">What the model actually sees would be something like:</p>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {`“System:  You are a friendly chatbot assistant, helping users with their requests.  You are warm and agreeable.
User: Rate this joke 1-10: Why did the chicken cross the road? To get to the other side!”`}
                </p>
                <p className="text-muted-foreground">
                  System prompts help the model understand how its supposed to respond to the user’s
                  query–they are very powerful tools. Issues arise, however, due to the fact that AI
                  companies are, at the end of the day, companies. They exist in a fiercely competitive
                  market, and must cater to user preferences/requests. Many users prefer models that are
                  warm, kind, and supportive–so companies are inclined to, partially through system
                  prompting, align their models with user desires**.
                </p>
                <p className="text-muted-foreground">
                  These market pressures make AI more fun to interact with, but less capable as an honest
                  critic/judge. I like having my ideas validated as much as the next guy, but there are
                  times when I’d rather just hear, point blank, if an idea is good/worthwhile.
                </p>
              </div>

              <Card className="p-6 bg-card/50 border-border mb-6">
                <h3 className="font-semibold mb-4">This project:</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    I wanted to see if I could fight fire with fire, and counteract this issue with system prompting.
                    I cultivated a dataset of human-rated jokes from reddit, and tried to see if through prompting
                    alone, we could get a model’s rating of the jokes to align more with the human ratings. I made a
                    prompt discovery pipeline: I had a system-prompted model, Model 1, rate the dataset, then
                    compared its ratings with the “real” human ratings to calculate error (i.e, the model was
                    overrating jokes that were 3s, underrating jokes that were 10s, etc.), then fed a separate model,
                    Model 2, the previous model’s system prompt, and its error profile, and had it create a new system
                    prompt. Then, the new system prompt would go back to the first model and the process would repeat
                    itself. Ideally, as the script ran, the system prompt would get better–the data was cumulative***,
                    meaning that Model 11 would be able to see all the system prompts for Models 1-10, and their
                    respective error profiles, and use that data to inform its creation of the next system prompt.
                  </p>
                  <p>
                    I ran 50 iterations, and over time the system prompt became more specific, and marginally improved
                    at accurately rating jokes. For a deeper look at my results, see the pdf below.
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 border-border mb-8">
                <h3 className="font-semibold mb-4">The Demo:</h3>
                <p className="text-sm text-muted-foreground">
                  You can feel the power of system prompting in the demo below. Type a joke into the box in the top
                  left, and request a rating 1/10. Then, select which iteration of the system prompt you’d like to
                  apply to your joke. Click run comparison, and GPT-5 will rate your joke–the left box will be the
                  output with a baseline, “You are a friendly assistant” style system prompt, and the right box will
                  be the output with your selected iteration’s system prompt. Scroll down and click the dropdowns to
                  see the wording of your selected system prompt, or its error/metrics on the actual dataset. Play
                  around with a few different iterations, to see if the model gets better at rating humor as the
                  iteration number increases.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* Demo Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Dialog onOpenChange={(open) => { if (open) setLoaded(false); }}>
              <div className="flex flex-col items-center justify-center py-20 bg-card/30 border border-border rounded-xl">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                <p className="text-muted-foreground mb-8 text-center max-w-md">
                  Launch the interactive Hugging Face Space to explore prompt discovery.
                </p>
                
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Launch Demo
                  </Button>
                </DialogTrigger>
              </div>

              <DialogContent className="sm:max-w-[90vw] w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                  <DialogTitle>Prompt Discovery Demo</DialogTitle>
                  <a
                    href="https://huggingface.co/spaces/Theoretical-Paladin/PromptDiscover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                      Open on Hugging Face
                    </Button>
                  </a>
                </div>
                
                <div className="relative w-full flex-1 min-h-0 bg-black/5">
                  {!loaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Loading Hugging Face Space...</p>
                    </div>
                  )}
                  <iframe
                    src="https://theoretical-paladin-promptdiscover.hf.space/?__theme=dark"
                    className={`w-full h-full border-0 ${!loaded ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => setLoaded(true)}
                    title="Prompt Discovery Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator />

        {/* Writeup Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <WriteupEmbed
              title="Companion writeup"
              description="Want the full story behind this Hugging Face Space? Preview or open the PDF writeup."
              pdfHref="/writeups/bad_joke_writeup.pdf"
              accent="blue"
            />
          </div>
        </section>

        <Separator />

        {/* Explainer Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">Numbers View: What&apos;s Happening Inside</h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                When you change the system prompt, you&apos;re not changing the model&apos;s weights—you&apos;re
                changing the <em>context</em> that shapes how it interprets your request. Think of
                it as activating different &quot;modes&quot; that were learned during training.
              </p>

              <p className="text-muted-foreground">
                RLHF-tuned models have learned that certain prompts correlate with certain expected
                behaviors. A prompt mentioning &quot;helpful assistant&quot; activates different response
                patterns than one mentioning &quot;critical reviewer.&quot;
              </p>
            </div>

            <Card className="p-6 bg-card/50 border-border mt-6">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">
                Conceptual representation:
              </h3>
              <div className="font-mono text-sm space-y-2">
                <div className="text-blue-400">
                  P(rating | content, supportive_prompt) ≠ P(rating | content, critical_prompt)
                </div>
                <div className="text-muted-foreground text-xs mt-2">
                  The same content produces different probability distributions depending on the prompt context.
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Footnotes */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs text-muted-foreground space-y-2">
              <p>*assuming the query is not through an api.</p>
              <p>
                ** see OpenAI’s shift from 4o to GPT-5 as a case study on the market pressures towards agreeable AI.{" "}
                <a
                  href="https://www.nytimes.com/2025/08/19/business/chatgpt-gpt-5-backlash-openai.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  https://www.nytimes.com/2025/08/19/business/chatgpt-gpt-5-backlash-openai.html
                </a>
              </p>
              <p>
                *** for compute/time purposes I set the data cumulation to 10-15, but this was purposefully done
                through a single variable in my configs script, so if one wanted to, they could run it with full
                accumulation.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
