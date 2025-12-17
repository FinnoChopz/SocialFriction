You are a senior full-stack engineer + product designer. Build a complete, production-ready website from scratch for a Cornell final project about **AI companionship, social friction, and sycophancy**. Make every decision yourself (tech stack, IA, styling, copy, animations, accessibility). Don’t ask questions. Ship something beautiful and “Tesla-homepage” clean.

# 0) Core idea + vibe
This site should make a visitor “get it” quickly:
- Humans experience conversation as meaning and emotion.
- An LLM is a probabilistic machine optimized on numbers (token probabilities) + trained to please (RLHF), which can produce **sycophancy**.
- If AI becomes a social substitute, “friction” (real consequences, awkwardness, rejection, negotiation, repair) can get silently removed — with downstream effects on social learning.

Aesthetic direction: Tesla.com minimalism (dark, full-viewport sections, scroll-snap, big typography, glossy-but-subtle motion), mixed with “math machine” vibes (monospace numbers, faint matrices, probability bars).

The site has TWO modes:
1) **Walkthrough mode** (a short click-through intro, 7 slides)
2) **Portfolio mode** (clean landing that navigates: 9 reading groups → 44 readings, the 2k-word paper, and 2 embedded Hugging Face demos)

# 1) Tech stack (make it modern, simple, deployable)
Use:
- Next.js (App Router) + TypeScript
- TailwindCSS
- shadcn/ui (Radix-based) for crisp components
- Framer Motion for subtle animation
- next/font (Inter + JetBrains Mono)
- MDX support for the paper + optional reading notes
- Zero backend. Static build, deploy on Vercel.

Deliverables in repo:
- Fully working site with routing, layout, content scaffolding, and styling
- README with “how to run, how to add content, how to deploy”
- A “Content TODO” file listing where to paste my 42 reading discussions + paper text.

# 2) Information architecture (routes)
Use these routes:

A) Walkthrough flow
- `/` = Welcome gate (first-run). Two buttons:
  - “Start the 30-second walkthrough”
  - “Skip to site”
  Also allow `Esc` to skip.
  Persist completion in `localStorage` so returning users land at `/home`.

- `/walkthrough` = the 7-slide interactive walkthrough (click to advance, back button, progress dots, Esc to exit). On completion: go to `/home`.

B) Main site
- `/home` = Tesla-like scroll landing with 3 big sections + footer
- `/readings` = overview of 9 groups
- `/readings/[groupSlug]` = group page listing all readings in that group
- `/readings/[groupSlug]/[readingSlug]` = individual reading page with citation, links, and my 300-word discussion

- `/paper` = page that hosts my 2,000-word academic paper (MDX) + optional PDF embed if I drop in `public/paper.pdf`
- `/demos` = hub page with two demo cards
- `/demos/prompt-discovery` = embed Hugging Face PromptDiscover + short writeup + “what to notice”
- `/demos/sycophancy-direction` = embed Hugging Face Persona + short writeup + “numbers view” explainer

C) Utility
- `/about` = what this project is, methods in 1 page, acknowledgements, image credits
- `/safety` = limitations + disclaimers (important, but not alarmist)

Global navigation: always visible (top sticky). Buttons:
Home, Readings, Paper, Demos, Redo Walkthrough.

# 3) Visual system (Tesla-like)
- Default dark mode (no toggle needed, but respect system if easy)
- Full-viewport sections on `/home` with scroll-snap
- Big headline type (Inter), supporting copy (Inter), numeric/tech accents (JetBrains Mono)
- Subtle glassy overlays, soft gradients, faint grid lines
- Motion: small fades, parallax-ish scroll cues, number tick animations, but keep it classy and fast.
- Accessibility: keyboard navigable, reduced-motion support, proper contrast.

# 4) Hero concept on /home (must be instantly engaging)
Hero headline (write exactly):
**“When conversation gets frictionless, what do we lose?”**

Subheadline:
“AI companions feel social. Under the hood, they’re probability engines trained to keep you comfortable. This project explores what that optimization does to truth, feedback, and real-world social learning.”

Primary CTA: “Start the walkthrough”
Secondary CTA: “Skip to the portfolio”

Add an animated background that feels like a “live stream of socializing” BUT is honest and feasible:
- Implement a lightweight HTML canvas animation: drifting “crowd particles” that cluster and separate like conversation groups.
- Overlay occasional floating numeric badges that look like:
  - “reward ≈ 0.83”
  - “p(agree) 0.71”
  - “friction ↓”
These are labeled “Illustrative” in tiny text (so we don’t lie).

# 5) The Walkthrough (7 slides) — implement exactly
This is a guided hook. Each slide is full-screen, minimal text, one strong visual, click to advance.

Persistent tiny disclaimer footer on ALL slides:
“Illustrative simplifications: tokens aren’t always whole words; modern models aren’t literally one giant list; visuals are schematic.”

Slide 1 — Welcome
Title: “Welcome.”
Body: “This is a 30-second tour of what an AI ‘conversation’ actually is.”
Buttons: Continue, Skip
Hint: “Esc to skip”

Slide 2 — AI is numbers
Title: “AI is all numbers.”
Body: “A model is a huge set of learned parameters — just values adjusted by training.”
Visual: an elegant “endless vector” animation (monospace numbers streaming with ellipses), plus a label like “≈ billions of parameters”.

Slide 3 — Inputs become numbers (tokens)
Title: “Your words get encoded.”
Body: “Text is broken into tokens, and each token becomes a vector.”
Interaction: user can hover over words in a sample prompt:
`Rate this joke 1–10: “Why did the butt poop? Because stinky!”`
On hover: show a small tooltip with a fake token id + 8-dim embedding preview (schematic).
(Do NOT pretend these are exact real embeddings; label “example”.)

Slide 4 — Outputs are distributions
Title: “The model outputs probabilities.”
Body: “Before it answers, it holds a probability distribution over next tokens.”
Visual: animated probability bars for “0 1 2 3 4 …” with one bar rising. Show “sampling” selecting “7”.

Slide 5 — Change the weights, change the behavior
Title: “Move the numbers → move the personality.”
Body: “Small shifts in internal representation can steer outputs.”
Interaction: a slider labeled “steer along 1 direction”.
As slider moves, the displayed answer shifts (e.g., rating changes 3 → 7 → 9) and probability bars shift.
Visual: a single vector arrow in latent space getting pushed.

Slide 6 — Training rewards comfort
Title: “Training often rewards ‘user-pleasing’.”
Body: “When humans rate responses, models learn what gets approval. Agreement is frequently rewarded.”
Visual: two response cards: one blunt disagreement (low ‘reward’), one warm agreement (higher ‘reward’). Show a simple “reward model score” meter.

Slide 7 — Thesis
Title (single line, big):
**“If we practice social life in a world without consequences, we may get worse at the real one.”**
Body (small): “This site collects 44 readings, a paper, and two demos showing how ‘helpful’ optimization can become sycophancy — and why friction matters.”
Button: “Enter the project”

End → redirect to `/home`. Also add “Redo walkthrough” link in footer of `/home`.

# 6) /home Tesla-like sections (scroll)
Implement scroll-snap sections after hero:

Section 1: Readings (first)
- Title: “44 readings → 9 clusters”
- One-liner: “Social friction, learning signals, and the design incentives shaping AI companions.”
- A horizontally scrollable row of **9 group cards** (snap-x).
Each card: group title + 1 sentence + “View group”.
Hover effect: subtle shine + numbers drifting.

Section 2: Paper
- Title: “The paper”
- One-liner: “A 2,000-word argument: RLHF makes companions smoother — but smooth isn’t always safe.”
- Show:
  - 3 “claims” bullets (write them):
    1) “Sycophancy is not a glitch — it’s an optimization outcome.”
    2) “Human social learning depends on variable, sometimes uncomfortable feedback.”
    3) “Replacing friction with comfort reshapes what we practice — and what we avoid.”
- CTA: “Read the paper” → `/paper`

Section 3: Demos
- Title: “Interactive demos”
- Two side-by-side cards:
  - Prompt Discovery demo (button)
  - Sycophancy Direction demo (button)
Each with 1–2 sentences + a tiny “What you’ll feel” line:
  - Prompt Discovery: “Watch the ‘hidden instruction’ of a model change ratings.”
  - Sycophancy Direction: “Slide along a learned direction and watch flattery rise/fall.”

Footer section:
- Redo walkthrough button
- Credits / About / Safety links

# 7) Readings UX (must be clean)
Data model:
Create `src/content/readings.ts` exporting:
- `ReadingGroup[]` (9 groups)
- `Reading[]` (44 readings)

Each group:
- slug, title, subtitle, longDescription (2–3 lines), themeTags (array)
Each reading:
- slug, groupSlug, fullCitation (APA-ish), year, authors, title, venue
- externalLinks: DOI URL and/or PDF URL (if available)
- oneLineSummary (1 line)
- discussion (string markdown) — for now create placeholders + include a few filled examples

On `/readings`:
- Show the 9 groups in a clean grid (and also keep the horizontal scroll component)
- Add search input (search titles/authors)
- Add filter chips by tag (e.g., “Face-to-face”, “Plasticity”, “RLHF”, “Companions”, “Policy”)

On `/readings/[groupSlug]`:
- Hero: group title + description
- List readings with:
  - Title (link)
  - One-line summary
  - Small metadata row (year, venue)
  - Buttons: “Source” (opens DOI) and “My notes” (opens reading page)

On `/readings/[groupSlug]/[readingSlug]`:
- Top: title, citation, buttons:
  - Open DOI / source
  - Copy citation (clipboard)
- Then render the discussion in three labeled blocks (matching my writing style):
  - “Core idea”
  - “What question is it answering?”
  - “Why it matters for this project”
If the discussion is missing, show a tasteful placeholder: “Notes coming soon — paste into `src/content/readings.ts`.”

IMPORTANT: Don’t embed/paywall PDFs by default. Only link out. Add a small note:
“Many papers are paywalled; this site links to official sources and hosts only my commentary.”

# 8) Paper page (/paper)
Implement paper in MDX:
- `src/content/paper.mdx`
Render it beautifully: wide margins, readable line length, sticky mini table-of-contents on desktop.
Also support optional PDF embed:
If `public/paper.pdf` exists, show a toggle:
- “Read on page”
- “View PDF”
(Use `<object>` or `<iframe>` with a fallback link.)

Above the paper, show:
- Abstract (write a short abstract now, ~120–160 words)
- Download button if PDF exists

# 9) Demos
Demos hub `/demos`:
- Two large cards with crisp descriptions and “Open demo”.

Embed URLs (use responsive iframe wrapper):
- Prompt discovery HF Space:
  https://huggingface.co/spaces/Theoretical-Paladin/PromptDiscover?embed=true
- Sycophancy vector HF Space:
  https://huggingface.co/spaces/Theoretical-Paladin/Persona?embed=true

On each demo page:
- Top: title + 2–3 paragraph writeup (write it yourself)
- A “What to try” checklist (3 bullets)
- Then the embed iframe
- Then a “Numbers view (explainer)” section:
  - Explain, visually, the concept of a “direction” in representation space
  - Show the formula (nicely typeset):
    direction = mean(h_sycophantic) − mean(h_neutral)
    steered_h = h − α · direction
  - Include a small interactive toy: slider α that updates a displayed “sycophancy projection” number and a sample response (clearly labeled “toy visualization”).

# 10) Copywriting: site name + microcopy
Site name (top-left): **“Social Friction Lab”**
Tagline (small): “AI companionship, sycophancy, and the cost of comfort.”

Use crisp, non-corporate, academic-adjacent language. No cringe. No fluff. No melodrama.

Add a small, tasteful warning on `/safety`:
“This project discusses AI advice risks. If you’re in crisis, seek immediate help from local emergency resources.”

# 11) Imagery (download + ship locally, with credits)
Use free-to-use stock images as subtle backgrounds. Download them during build setup and store in `public/images/` so the site has no external image dependencies.

Download these (Unsplash “Download free” links) and save as:

1) `public/images/network.jpg`
https://unsplash.com/photos/pREq0ns_p_E/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg1NzY0fA

2) `public/images/city-bokeh.jpg`
https://unsplash.com/photos/WhLMBGoN4Bc/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg1NDE1fA

3) `public/images/phone-glow.jpg`
https://unsplash.com/photos/PrmuagA6fCY/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg1NjMxfA

4) `public/images/concert-phone.jpg`
https://unsplash.com/photos/jz_CtXafltc/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg1NjMxfA

5) `public/images/code.jpg`
https://unsplash.com/photos/ieic5Tq8YMk/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg1NjY4fA

6) `public/images/silhouette.jpg`
https://unsplash.com/photos/XLPBiiQtg3U/download?force=true&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzY1OTg2MTIwfA

Use them as:
- `/` welcome: city-bokeh (subtle blur + dark overlay)
- walkthrough slide backgrounds: network / code / concert-phone (very dark overlay)
- `/home` hero: animated canvas + faint network.jpg behind it
- `/readings` header: code.jpg
- `/paper` header: silhouette.jpg
- `/demos` header: concert-phone.jpg

Add an “Image credits” section on `/about` listing filenames + “Unsplash License” + photographer name if available (if not easily extracted, write “Source: Unsplash (download link in repo)”). Keep it clean.

# 12) Reading groups (9) — create these now
Create these groups (slug → title → subtitle):

1) `foundations-friction`
   “Foundations of Social Friction”
   “Face-work, turn-taking, and why real interaction is a high-bandwidth coordination problem.”

2) `face-to-face`
   “Face-to-Face Interaction”
   “Multimodal coupling: gaze, posture, timing, repair.”

3) `plasticity-learning`
   “Neural Plasticity & Social Learning”
   “Use-it-or-lose-it: challenge, salience, and experience-dependent change.”

4) `reinforcement-calibration`
   “Variable Reinforcement & Social Calibration”
   “Why unpredictable feedback trains behavior — and what happens when it’s smoothed.”

5) `tom-communication`
   “Theory of Mind & Communication Tailoring”
   “Audience design, memory limits, and learning other minds.”

6) `info-theory-dialogue`
   “Information Theory & Dialogue”
   “Entropy, grounding, and uncertainty reduction between people.”

7) `rlhf-sycophancy`
   “AI Architectures, RLHF, and Sycophancy”
   “How ‘helpful’ optimization can reward agreement over truth.”

8) `companionship-evidence`
   “AI Companionship: Evidence & Mechanisms”
   “Who uses companions, why they bond, and what correlates with well-being.”

9) `societal-policy`
   “Societal Implications & Policy”
   “From social capital to regulation: why this scales beyond individuals.”

# 13) Readings list (44) — scaffold it
Create a list of readings in code with correct slugs and links. You do NOT need to paste my full 300-word notes for all 44 right now; include:
- full citations + DOI/URLs
- one-line summaries (you write them)
- discussion placeholders for most
- BUT: include fully written “discussion” for at least 6 flagship readings (pick: Goffman 1955, Sacks 1974, Shannon 1948, Ouyang 2022, Sharma 2024, Pataranutaporn 2025-ish). Write those discussions in my style: clear, slightly punchy, academic, 250–350 words each, with the three-block structure.

Use the reading titles/authors I’m working with (at minimum include these; add more placeholders to reach 44):
- Goffman (1955) On face-work
- Hadley et al. (2022) review face-to-face interaction (Nat Rev Psych)
- Sacks, Schegloff, Jefferson (1974) turn-taking
- Ward (1892) Social friction
- Hawkins, Goodman, Goldstone (2019) emergence of norms
- Ransom et al. (2022) face-to-face learning PLOS ONE
- Kleim & Jones (2008) principles of plasticity
- Davis et al. (2023) thumbs up/down neural feedback
- Schultz (2015) dopamine reward prediction error review
- Hofmans et al. (2025) adolescents social info under uncertainty
- Hutton et al. (2022) media use + brain structure (Sci Reports)
- Bandura (1977) Social Learning Theory
- Grusec & Davidov (2010) domain-specific socialization
- Krach et al. embarrassment circuits
- Galván (2010) neural plasticity development
- Frank et al. (2004) carrot vs stick in Parkinsonism (Science)
- Yu & Wellman (2023) ToM agent-based model
- Horton & Gerrig (2002, 2005) audience design
- Shannon (1948) mathematical theory of communication
- Xu & Reitter (2016) entropy converges in dialogue
- Pickering & Garrod (2004) interactive alignment
- Brown et al. (2020) GPT-3 few-shot
- Ouyang et al. (2022) InstructGPT RLHF
- Sharma et al. (2024) understanding sycophancy (ICLR)
- Dahlgren Lindström et al. (2025) sociotechnical limits of RLHF
- Common Sense Media (2025) teens + AI companions report
- Zhang et al. (2025) AI companions + well-being (arXiv)
- Pentina et al. (2023) Replika relationship development
- Chaturvedi et al. (2023) review companionship with AI
- Pataranutaporn et al. (2024/2025) longitudinal controlled chatbot use
- Cheng et al. (2025) social sycophancy in AITA
- Cai et al. (2025) consumer reactions to chatbot failures
- Hou et al. (2024) relationship advice reliability
- Blakemore & Mills (2014) adolescence sensitive period
- Andrews et al. (2021) adolescent social brain development
- Lenhart et al. (2024) media exposure + ToM (review)
- Cao et al. (2023) peer conflict resolution
- Lamblin et al. (2017) social connectedness + adolescent brain
- Shrivastava (2025) interpersonal apprehension
- FTC (2025) inquiry into AI companions
- Taborsky (2021) social competence feedback loop
- Xue (2025) social capital + growth meta-analysis
- Ponzetto & Troiano (2025) social capital + government expenditures
- Psychiatric Times (2025) iatrogenic dangers (include as cautionary)

If any link is uncertain, include a placeholder `url: ""` and mark `needsLink: true` so I can fill later.

# 14) Performance + polish requirements
- Lighthouse-friendly
- Lazy-load heavy iframes (HF demos) until user scrolls or clicks “Load demo”
- Use `prefers-reduced-motion` to reduce animations
- Use semantic HTML, aria labels, keyboard focus rings
- Avoid giant JS bundles; keep canvas light.

# 15) Implementation checklist (acceptance)
You are done only when:
- `npm install && npm run dev` works
- All routes exist and look good on mobile + desktop
- Walkthrough works (Esc, back, progress, completion persistence)
- Home scroll sections snap cleanly
- Readings pages navigate correctly and are searchable
- Paper renders from MDX + optional PDF toggle
- Demos embed with lazy-load
- About + Safety pages exist
- README explains how I paste my paper + 44 reading notes and deploy to Vercel

# 16) Repo setup instructions (write in README)
Include:
- how to run locally
- how to add `paper.mdx` / `paper.pdf`
- how to fill in reading discussions
- how to deploy to Vercel

Now: generate the full Next.js project codebase accordingly. Create all files. Keep components clean and well-structured.
