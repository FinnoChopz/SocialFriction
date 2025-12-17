# Social Friction Lab

A research final project website exploring AI companionship, sycophancy, and the cost of comfort. Created by Finn McCooe and advised by Dr. Anthony Ong.

## Overview

This project examines how AI companions optimized for user satisfaction might reshape social learning. It includes:

- **6 readings** organized into 9 thematic clusters
- **A 2,000-word research paper** on RLHF-driven sycophancy
- **2 interactive demos** powered by Hugging Face Spaces
- **A 7-slide walkthrough** explaining AI as probability engines

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix-based)
- **Animation:** Framer Motion
- **Content:** MDX for the paper
- **Fonts:** Inter + JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Welcome gate (/)
│   ├── home/              # Main landing page (/home)
│   ├── walkthrough/       # 7-slide walkthrough (/walkthrough)
│   ├── readings/          # Reading library (/readings)
│   │   └── [groupSlug]/   # Group pages
│   │       └── [readingSlug]/  # Individual reading pages
│   ├── paper/             # Research paper (/paper)
│   ├── demos/             # Demo hub (/demos)
│   │   ├── prompt-discovery/
│   │   └── sycophancy-direction/
│   ├── about/             # About page (/about)
│   └── safety/            # Limitations & disclaimers (/safety)
├── components/
│   ├── layout/            # Navigation, Footer
│   ├── walkthrough/       # Slide components
│   ├── shared/            # Reusable components
│   └── ui/                # shadcn/ui components
├── content/
│   ├── readings.ts        # Reading data (46 readings, 9 groups)
│   └── paper.mdx          # Research paper content
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## Customizing Content

### Adding Your Paper Content

1. Edit `src/content/paper.mdx` with your paper text
2. Optionally add a PDF to `public/paper.pdf` for download/embed

### Adding Reading Discussions

Edit `src/content/readings.ts`:

```typescript
{
  slug: "reading-slug",
  groupSlug: "group-slug",
  title: "Paper Title",
  authors: "Author Names",
  year: 2024,
  venue: "Journal Name",
  fullCitation: "Full APA citation",
  externalLinks: {
    doi: "https://doi.org/...",
    pdf: "https://...",
  },
  oneLineSummary: "One sentence summary",
  discussion: {
    coreIdea: "250-350 words on the core idea...",
    questionAnswered: "What question does this answer?",
    whyItMatters: "Why it matters for this project...",
  },
}
```

Set `discussion: null` for readings without notes yet.

### Updating Reading Groups

Groups are defined at the top of `src/content/readings.ts`:

```typescript
{
  slug: "group-slug",
  title: "Group Title",
  subtitle: "Short description",
  longDescription: "2-3 sentence description",
  themeTags: ["Tag1", "Tag2"],
}
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

Or use the CLI:

```bash
npm i -g vercel
vercel
```

### Environment Variables

No environment variables required for basic deployment.

## Features

### Walkthrough

The 7-slide walkthrough introduces visitors to:
1. AI as numbers (parameters)
2. Tokenization and embeddings
3. Probability distributions over outputs
4. Representation steering
5. RLHF and reward models
6. The sycophancy problem

Progress is saved in localStorage so returning visitors skip to `/home`.

### Interactive Demos

Two Hugging Face Space embeds:
- **Prompt Discovery:** Shows how system prompts shift model behavior
- **Sycophancy Direction:** Interactive steering along learned vectors

Demos lazy-load to improve initial page performance.

#### Embedding Hugging Face Spaces

This project embeds Spaces via an `<iframe>` on the demo routes:

- `src/app/demos/prompt-discovery/page.tsx` → `https://huggingface.co/spaces/Theoretical-Paladin/PromptDiscover?embed=true`
- `src/app/demos/sycophancy-direction/page.tsx` → `https://huggingface.co/spaces/Theoretical-Paladin/Persona?embed=true`

To embed another Space, create a new route folder under `src/app/demos/<your-slug>/page.tsx`, add an `<iframe>` like:

```tsx
<iframe
  src="https://huggingface.co/spaces/<user>/<space>?embed=true"
  className="w-full h-[700px] rounded-lg border border-border"
  title="My Hugging Face Demo"
/>
```

Then add it to the cards list in `src/app/demos/page.tsx` so it appears on the demo hub.

### Readings Library

- Search across titles and authors
- Filter by theme tags
- Organized into 9 clusters
- Individual pages with citations and discussion

## Accessibility

- Keyboard navigable throughout
- `prefers-reduced-motion` support
- Proper heading hierarchy
- Focus rings on interactive elements
- High contrast dark theme

## Image Credits

Background images from Unsplash (free license):
- `network.jpg`
- `city-bokeh.jpg`
- `phone-glow.jpg`
- `concert-phone.jpg`
- `code.jpg`
- `silhouette.jpg`

See `/about` page for full credits.

## License

Academic project - contact author for permissions.

---

Built with Next.js, Tailwind CSS, and Framer Motion.
