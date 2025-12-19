"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { WalkthroughSlide } from "../WalkthroughSlide";
import { Button } from "@/components/ui/button";
import { NumberStream } from "@/components/shared/NumberStream";
import { cn } from "@/lib/utils";
import { formatWeightMatrix, TOY_MODEL_WEIGHTS } from "@/components/walkthrough/toyModelWeights";
import {
  formatToyEmbeddingInt,
  TOY_JOKE_RATING_PROMPT,
  TOY_JOKE_RATING_TOKENS,
  TOY_RESPONSE_TOKENS,
  type ToyToken,
} from "@/components/walkthrough/toyJokeRatingExample";

interface SlideProps {
  onNext: () => void;
}

type CarrierLocation = "input" | "weights" | "output";

const INPUT_TOKEN_COUNT = TOY_JOKE_RATING_TOKENS.length;
const OUTPUT_TOKEN_COUNT = 3;

const WEIGHTS_DISPLAY = TOY_MODEL_WEIGHTS.slice(0, 24).map((row) => row.slice(0, 24));
const FORMATTED_WEIGHTS = formatWeightMatrix(WEIGHTS_DISPLAY, 2);

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function EmbeddingMatrix({
  tokens,
  hoveredColumn,
  onHoverColumn,
  delimiterIndex,
  highlightFromIndex,
  autoScrollRight,
  className,
}: {
  tokens: Array<Pick<ToyToken, "text" | "embedding">>;
  hoveredColumn: number | null;
  onHoverColumn: (index: number | null) => void;
  delimiterIndex?: number;
  highlightFromIndex?: number;
  autoScrollRight?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoScrollRight) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [autoScrollRight, tokens.length, delimiterIndex, highlightFromIndex]);

  return (
    <div ref={containerRef} className={cn("overflow-auto rounded-md border bg-muted/10", className)}>
      <div className="flex min-w-max items-stretch gap-px p-2">
        {tokens.flatMap((token, columnIndex) => {
          const isResponseColumn = highlightFromIndex != null && columnIndex >= highlightFromIndex;
          const column = (
            <div
              key={`col-${columnIndex}`}
              className={cn(
                "w-[56px] shrink-0 rounded-sm px-1 py-1 transition-colors",
                hoveredColumn === columnIndex
                  ? "bg-blue-500/25"
                  : isResponseColumn
                  ? "bg-green-500/10 hover:bg-green-500/15 border border-green-500/20"
                  : "hover:bg-secondary/40"
              )}
              onMouseEnter={() => onHoverColumn(columnIndex)}
              onMouseLeave={() => onHoverColumn(null)}
            >
              <div className="flex flex-col gap-px">
                {token.embedding.map((value, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={cn(
                      "font-mono text-[10px] leading-tight tabular-nums text-right",
                      hoveredColumn === columnIndex
                        ? "text-blue-200"
                        : isResponseColumn
                        ? "text-green-100"
                        : "text-foreground/80"
                    )}
                  >
                    {formatToyEmbeddingInt(value)}
                  </div>
                ))}
              </div>
            </div>
          );

          if (delimiterIndex != null && columnIndex === delimiterIndex) {
            const separator = (
              <div key={`sep-${columnIndex}`} className="w-[18px] shrink-0 px-2 flex items-stretch">
                <div className="w-[4px] rounded-full bg-gradient-to-b from-transparent via-foreground/75 to-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
              </div>
            );
            return [separator, column];
          }

          return [column];
        })}
      </div>
    </div>
  );
}

function EmbeddingVector({
  token,
  hovered,
  onHover,
}: {
  token: { text: string; embedding: readonly number[] };
  hovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-muted/10 px-2 py-2 transition-colors",
        hovered ? "bg-green-500/15 border-green-500/30" : "hover:bg-secondary/40"
      )}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex flex-col gap-px">
        {token.embedding.map((value, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "font-mono text-[10px] leading-tight tabular-nums text-right",
              hovered ? "text-green-200" : "text-foreground/80"
            )}
          >
            {formatToyEmbeddingInt(value)}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixCarrier({
  tokens,
  pendingToken,
  pendingGlowNonce = 0,
  delimiterIndex,
  hoveredMatrixColumn,
  onHoverMatrixColumn,
  hoveredPending,
  onHoverPending,
}: {
  tokens: Array<Pick<ToyToken, "text" | "embedding">>;
  pendingToken: { text: string; embedding: readonly number[] } | null;
  pendingGlowNonce?: number;
  delimiterIndex?: number;
  hoveredMatrixColumn: number | null;
  onHoverMatrixColumn: (index: number | null) => void;
  hoveredPending: boolean;
  onHoverPending: (hovered: boolean) => void;
}) {
  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur-sm p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <EmbeddingMatrix
            tokens={tokens}
            hoveredColumn={hoveredMatrixColumn}
            onHoverColumn={onHoverMatrixColumn}
            delimiterIndex={delimiterIndex}
            highlightFromIndex={delimiterIndex}
            autoScrollRight={delimiterIndex != null}
            className="max-h-[260px]"
          />
        </div>

        <AnimatePresence mode="popLayout">
          {pendingToken && (
            <motion.div
              key={pendingToken.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 shrink-0"
            >
              <span className="font-mono text-xl text-muted-foreground">,</span>
              <motion.div
                key={`pending-glow-${pendingToken.text}-${pendingGlowNonce}`}
                initial={{ boxShadow: "0 0 0px rgba(34,197,94,0)" }}
                animate={
                  pendingGlowNonce > 0
                    ? {
                        boxShadow: [
                          "0 0 0px rgba(34,197,94,0)",
                          "0 0 26px rgba(34,197,94,0.35)",
                          "0 0 10px rgba(34,197,94,0.18)",
                        ],
                      }
                    : { boxShadow: "0 0 0px rgba(34,197,94,0)" }
                }
                transition={{ duration: 1.1, times: [0, 0.35, 1] }}
                className="rounded-md"
              >
                <EmbeddingVector token={pendingToken} hovered={hoveredPending} onHover={onHoverPending} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Slide3Point5Processing({ onNext }: SlideProps) {
  const [carrierLocation, setCarrierLocation] = useState<CarrierLocation>("input");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [pendingGlowNonce, setPendingGlowNonce] = useState(0);

  const [appendedCount, setAppendedCount] = useState(0);
  const [pendingTokenIndex, setPendingTokenIndex] = useState<number | null>(null);
  const [finalMode, setFinalMode] = useState(false);

  const appendedTokens = TOY_RESPONSE_TOKENS.slice(0, appendedCount).map((t) => ({
    text: t.text,
    embedding: t.embedding,
  }));
  const combinedTokens = [...TOY_JOKE_RATING_TOKENS, ...appendedTokens];

  const pendingToken = pendingTokenIndex != null ? TOY_RESPONSE_TOKENS[pendingTokenIndex] : null;
  const stopReady = pendingToken?.text === "STOP";

  const delimiterIndex = appendedCount > 0 ? INPUT_TOKEN_COUNT : undefined;

  const [hoveredInputColumn, setHoveredInputColumn] = useState<number | null>(null);
  const [hoveredOutputColumn, setHoveredOutputColumn] = useState<number | null>(null);
  const [hoveredPending, setHoveredPending] = useState(false);
  const [hoveredFinalColumn, setHoveredFinalColumn] = useState<number | null>(null);

  const inputHoverLabel =
    carrierLocation === "input"
      ? hoveredInputColumn != null
        ? combinedTokens[hoveredInputColumn]?.text
        : hoveredPending
        ? pendingToken?.text
        : null
      : null;

  const outputHoverLabel =
    carrierLocation === "output"
      ? hoveredOutputColumn != null
        ? combinedTokens[hoveredOutputColumn]?.text
        : hoveredPending
        ? pendingToken?.text
        : null
      : null;

  const generatedText = TOY_RESPONSE_TOKENS.slice(0, appendedCount)
    .map((t) => t.text)
    .join("");
  const previewText =
    pendingToken && pendingToken.text !== "STOP"
      ? `${generatedText}${pendingToken.text}`
      : generatedText;

  const handleGenerate = async () => {
    if (isBusy) return;

    if (finalMode) {
      onNext();
      return;
    }

    setIsBusy(true);

    // If STOP is showing, the next press collapses to "just the response tokens".
    if (carrierLocation === "output" && stopReady) {
      setFinalMode(true);
      setPendingTokenIndex(null);
      setCarrierLocation("input");
      await sleep(350);
      setIsBusy(false);
      return;
    }

    // If a response token is currently waiting in the output, bring it back, append it, pause, then run the next pass.
    if (carrierLocation === "output" && pendingToken && pendingToken.text !== "STOP") {
      const nextAppendedCount = Math.min(OUTPUT_TOKEN_COUNT, appendedCount + 1);

      setCarrierLocation("input");
      await sleep(650);
      setPendingTokenIndex(null);
      setAppendedCount(nextAppendedCount);
      await sleep(250);

      await sleep(3000);

      const nextIndex =
        nextAppendedCount >= OUTPUT_TOKEN_COUNT ? TOY_RESPONSE_TOKENS.length - 1 : nextAppendedCount;

      setCarrierLocation("weights");
      await sleep(550);

      setIsStreaming(true);
      await sleep(900);
      setIsStreaming(false);

      setPendingTokenIndex(nextIndex);
      setCarrierLocation("output");
      setPendingGlowNonce((n) => n + 1);
      await sleep(550);

      setIsBusy(false);
      return;
    }

    const nextIndex =
      appendedCount >= OUTPUT_TOKEN_COUNT ? TOY_RESPONSE_TOKENS.length - 1 : appendedCount;

    // Move matrix into weights
    setCarrierLocation("weights");
    await sleep(550);

    // Stream weights briefly
    setIsStreaming(true);
    await sleep(900);
    setIsStreaming(false);

    // Emit output (matrix + new response vector)
    setPendingTokenIndex(nextIndex);
    setCarrierLocation("output");
    setPendingGlowNonce((n) => n + 1);
    await sleep(550);

    setIsBusy(false);
  };

  return (
    <WalkthroughSlide className="justify-start pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center"
        >
          The model generates one token at a time.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-sm sm:text-base text-muted-foreground max-w-5xl mx-auto text-center leading-relaxed"
        >
          Once your query/question is in token form, the model processes it by adding one “response token” at a time.
          It takes in your list of tokens/words, then adds the token/word it thinks would be the best to the end of the list.
          Then, it processes this new list, and adds another token/word. Once it&apos;s generated a complete response, it
          returns just the new “response tokens”. It&apos;s easier to understand through a visual: check out the input tokens
          on the left, then click generate/process.
        </motion.p>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {finalMode ? (
              <motion.div
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 bg-card/40 border border-border rounded-2xl p-6 sm:p-8"
              >
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    The model internally uses the whole sequence (prompt tokens + generated tokens) to decide what comes next.
                  </div>
                  <div className="mt-2 text-sm text-foreground">
                    But in the final response, it returns only the new response tokens (highlighted).
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-xs text-muted-foreground">all_tokens =</div>
                      <div className="min-h-[18px] text-xs text-muted-foreground text-right">
                        {hoveredFinalColumn != null
                          ? `token: “${finalTokens[hoveredFinalColumn]?.text}”`
                          : "Hover a column to reveal the token"}
                      </div>
                    </div>
                    <EmbeddingMatrix
                      tokens={finalTokens}
                      hoveredColumn={hoveredFinalColumn}
                      onHoverColumn={setHoveredFinalColumn}
                      delimiterIndex={INPUT_TOKEN_COUNT}
                      highlightFromIndex={INPUT_TOKEN_COUNT}
                      autoScrollRight
                      className="max-h-[320px]"
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/30" />
                        response tokens (returned)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border bg-background/60 p-4">
                  <div className="text-xs text-muted-foreground">Prompt:</div>
                  <div className="mt-1 text-sm text-foreground">{TOY_JOKE_RATING_PROMPT}</div>
                  <div className="mt-3 text-xs text-muted-foreground">Output:</div>
                  <div className="mt-1 font-mono text-2xl tracking-tight">{TOY_RESPONSE_TOKENS.slice(0, 3).map((t) => t.text).join("")}</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 overflow-x-auto"
              >
                <div className="min-w-[980px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] gap-6 items-start">
                  {/* Input */}
                  <div className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6 flex flex-col min-h-[640px]">
                    <div className="text-xs text-muted-foreground mb-3">Input</div>

                    <div className="rounded-lg border bg-background/60 p-3">
                      <div className="font-mono text-sm text-foreground">{TOY_JOKE_RATING_PROMPT}</div>
                    </div>

                    <div className="text-center text-3xl font-mono text-muted-foreground my-3">=</div>

                    <div className="min-h-[18px] text-xs text-muted-foreground mb-2">
                      {inputHoverLabel ? `token: “${inputHoverLabel}”` : "Hover any token column to reveal the token"}
                    </div>

                    <div className="flex-1 min-h-0 flex items-start">
                      {carrierLocation === "input" ? (
                        <motion.div layoutId="matrix-carrier" className="w-full">
                          <MatrixCarrier
                            tokens={combinedTokens}
                            pendingToken={pendingToken && pendingToken.text !== "STOP" ? pendingToken : null}
                            delimiterIndex={delimiterIndex}
                            hoveredMatrixColumn={hoveredInputColumn}
                            onHoverMatrixColumn={setHoveredInputColumn}
                            hoveredPending={hoveredPending}
                            onHoverPending={setHoveredPending}
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-[320px]" />
                      )}
                    </div>
                  </div>

                  {/* Weights */}
                  <div className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col min-h-[640px]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-muted-foreground">Weights</div>
                      <div className="text-xs text-muted-foreground font-mono">W</div>
                    </div>

                    <div className="mt-3 relative rounded-xl border bg-background/60 overflow-hidden flex-1 min-h-0">
                      <div className="h-full overflow-auto p-4">
                        <pre
                          className={cn(
                            "font-mono text-[10px] leading-snug text-foreground/80",
                            isStreaming && "opacity-35 blur-[0.3px]"
                          )}
                        >
                          {FORMATTED_WEIGHTS}
                        </pre>
                      </div>

                      <AnimatePresence>
                        {carrierLocation === "weights" && (
                          <motion.div
                            layoutId="matrix-carrier"
                            className="absolute inset-0 flex items-center justify-center p-6"
                          >
                            <div className="w-full max-w-sm">
                              <MatrixCarrier
                                tokens={combinedTokens}
                                pendingToken={null}
                                delimiterIndex={delimiterIndex}
                                hoveredMatrixColumn={hoveredInputColumn}
                                onHoverMatrixColumn={setHoveredInputColumn}
                                hoveredPending={false}
                                onHoverPending={() => {}}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isStreaming && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 p-4 overflow-hidden pointer-events-none"
                          >
                            <div className="h-full w-full grid content-start gap-2">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <NumberStream key={i} count={26} className="text-[11px]" />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 text-center text-xs text-muted-foreground">
                      {isStreaming ? "Processing…" : "Stationary weights (toy example)"}
                    </div>
                  </div>

                  {/* Output */}
                  <div className="bg-card/40 border border-border rounded-2xl p-5 sm:p-6 flex flex-col min-h-[640px]">
                    <div className="text-xs text-muted-foreground mb-3">Output</div>

                    <div className="min-h-[18px] text-xs text-muted-foreground mb-2">
                      {outputHoverLabel
                        ? `token: “${outputHoverLabel}”`
                        : carrierLocation === "output"
                        ? "Hover over any output column (including the new vector)"
                        : "Output is currently empty"}
                    </div>

                    <div className="flex-1 min-h-0 flex items-start">
                      {carrierLocation === "output" && pendingToken ? (
                        <motion.div layoutId="matrix-carrier" className="w-full">
                          <MatrixCarrier
                            tokens={combinedTokens}
                            pendingToken={pendingToken}
                            pendingGlowNonce={pendingGlowNonce}
                            delimiterIndex={delimiterIndex}
                            hoveredMatrixColumn={hoveredOutputColumn}
                            onHoverMatrixColumn={setHoveredOutputColumn}
                            hoveredPending={hoveredPending}
                            onHoverPending={setHoveredPending}
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-[320px]" />
                      )}
                    </div>

                    <div className="mt-4 rounded-lg border bg-background/60 p-4">
                      <div className="text-xs text-muted-foreground">Prompt:</div>
                      <div className="mt-1 text-sm text-foreground">{TOY_JOKE_RATING_PROMPT}</div>
                      <div className="mt-3 text-xs text-muted-foreground">Generated tokens:</div>
                      <div className="mt-1 font-mono text-2xl tracking-tight">
                        {stopReady ? `${generatedText}⟂` : previewText || "—"}
                      </div>
                      {stopReady && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          STOP token generated (end of response).
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isBusy}
            className={cn(
              "shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-shadow duration-500",
              isBusy && "opacity-80 shadow-none"
            )}
          >
            {finalMode
              ? "Continue"
              : stopReady
              ? "Show final output"
              : isBusy
              ? "Processing…"
              : carrierLocation === "output" && pendingToken
              ? "Append token & continue"
              : "Generate / process"}
          </Button>
          {!isBusy && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>←</span>
              <span>Click to proceed</span>
            </div>
          )}
        </div>
      </div>
    </WalkthroughSlide>
  );
}
  const finalTokens = [...TOY_JOKE_RATING_TOKENS, ...TOY_RESPONSE_TOKENS.slice(0, OUTPUT_TOKEN_COUNT)];
