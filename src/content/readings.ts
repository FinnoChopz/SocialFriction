export type ReadingGroup = {
  slug: string;
  title: string;
  subtitle: string;
  longDescription: string;
  themeTags: string[];
};

export type ReadingExternalLinks = {
  doi?: string | null;
  pdf?: string | null;
  url?: string | null;
};

export type ReadingDiscussion = {
  coreIdea: string;
  questionAnswered: string;
  whyItMatters: string;
};

export type Reading = {
  slug: string;
  groupSlug: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  fullCitation: string;
  externalLinks: ReadingExternalLinks;
  oneLineSummary: string;
  discussion: ReadingDiscussion;
  needsLink?: boolean;
};

export const readingGroups: ReadingGroup[] = [
  {
    slug: "foundations",
    title: "Foundations of Social Friction",
    subtitle: "Face-to-Face Interaction & Social Physics",
    longDescription: "Core theories establishing why friction, irreversibility, and risk are essential features of human sociality, not bugs to be removed.",
    themeTags: ["Sociology", "Interaction", "Face-work"]
  },
  {
    slug: "neural-plasticity",
    title: "Neural Plasticity & Social Learning",
    subtitle: "How Experience Wires the Social Brain",
    longDescription: "Neuroscientific evidence that social circuits require specific, intense, and often challenging inputs to develop and maintain function.",
    themeTags: ["Neuroscience", "Plasticity", "Development"]
  },
  {
    slug: "variable-reinforcement",
    title: "Variable Reinforcement",
    subtitle: "Social Calibration & Reward Systems",
    longDescription: "Why the brain learns best from unpredictable, mixed-valence feedback (carrots and sticks) rather than constant validation.",
    themeTags: ["Reinforcement Learning", "Dopamine", "Calibration"]
  },
  {
    slug: "theory-of-mind",
    title: "Theory of Mind",
    subtitle: "Communication Tailoring & Mentalizing",
    longDescription: "How we learn to model other minds through the friction of misunderstanding, repair, and audience design.",
    themeTags: ["Psychology", "Communication", "Cognition"]
  },
  {
    slug: "ai-architectures",
    title: "AI Architectures & RLHF",
    subtitle: "The Engineering of Frictionlessness",
    longDescription: "Technical analysis of how LLMs and RLHF are optimized for smoothness, deference, and conflict avoidance.",
    themeTags: ["AI Safety", "RLHF", "LLMs"]
  },
  {
    slug: "ai-companionship",
    title: "AI Companionship",
    subtitle: "Current Usage & Dynamics",
    longDescription: "Empirical data on how people are actually using AI companions and the relational dynamics that emerge.",
    themeTags: ["HCI", "Companions", "Usage Trends"]
  },
  {
    slug: "ai-risks",
    title: "Where AI Companionship Goes Wrong",
    subtitle: "Sycophancy, Dependence & Epistemic Bubbles",
    longDescription: "Evidence of the downsides: how friction-free interaction leads to lower well-being, sycophancy, and reduced social capacity.",
    themeTags: ["Risks", "Mental Health", "Sycophancy"]
  },
  {
    slug: "developmental-impact",
    title: "Developmental Impact",
    subtitle: "Critical Periods & Adolescence",
    longDescription: "Why adolescence is a sensitive period for social learning and how AI might interfere with normative development.",
    themeTags: ["Development", "Adolescence", "Critical Periods"]
  },
  {
    slug: "societal-implications",
    title: "Societal Implications",
    subtitle: "Long-term & Macro Effects",
    longDescription: "Broader consequences for social capital, trust, and economic growth if social friction is systematically removed.",
    themeTags: ["Economics", "Society", "Policy"]
  }
];

// Helper functions for lookups used across the app
export function getGroup(slug: string): ReadingGroup | undefined {
  return readingGroups.find((g) => g.slug === slug);
}

export function getReadingsByGroup(groupSlug: string): Reading[] {
  return readings.filter((r) => r.groupSlug === groupSlug);
}

export function getReading(groupSlug: string, readingSlug: string): Reading | undefined {
  return readings.find((r) => r.groupSlug === groupSlug && r.slug === readingSlug);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  readingGroups.forEach((g) => {
    g.themeTags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export const readings: Reading[] = [
  {
    "slug": "on-face-work-an-analysis-of",
    "groupSlug": "foundations",
    "title": "On face-work: An analysis of ritual elements in social interaction",
    "authors": "Goffman, E",
    "year": 1955,
    "venue": "Psychiatry, 18 (3), 213\u2013231.",
    "fullCitation": "Goffman, E. (1955). On face-work: An analysis of ritual elements in social interaction. Psychiatry, 18 (3), 213\u2013231. https://doi.org/10.1080/00332747.1955.11023008",
    "externalLinks": {
      "doi": "https://doi.org/10.1080/00332747.1955.11023008",
      "url": null
    },
    "oneLineSummary": "Establishes irreversibility of social actions and face maintenance as core social friction",
    "discussion": {
      "coreIdea": "Goffman argues that everyday interaction is organized around \u201cface\u201d \u2013 the positive social value a person claims \u2013 and the ongoing \u201cface-work\u201d people do to maintain it. In any encounter, you put forward a \u201cline\u201d about who you are and where you stand; once it\u2019s in play, you and others are morally bound to sustain it. Social life is thus full of tiny, ritualized maneuvers (apologies, joking, tact, avoidance) that repair threatened face and keep interaction flowing. Under the surface, there\u2019s a surprisingly strict moral order: people are expected both to respect their own face and to protect others\u2019, and much of the anxiety and drama in social life comes from possible losses of face that can\u2019t easily be undone.",
      "questionAnswered": "The core question is: what invisible rules and rituals make ordinary interaction hang together without constant breakdown? Goffman answers by treating interaction as a kind of secular religion of face, in which individuals are simultaneously actors and audience. By carefully analyzing small events\u2014slights, gaffes, rescues\u2014he shows that people orient to face as a sacred object: they anticipate threats, work to prevent them, and rush to repair them when they occur. The article doesn\u2019t rely on experiments or formal models; instead, it builds a phenomenological-analytic case that these moral expectations are what keep conversations from flying apart.",
      "whyItMatters": "For my project, this paper is basically the \u201corigin story\u201d of social friction. Goffman insists that interaction is inherently risky, irreversible, and emotionally loaded: once a remark lands, you can\u2019t un-say it, and everyone must cope with its impact on face. That is exactly the kind of variable, high-stakes feedback I\u2019m arguing is essential for social learning \u2013 the mix of smiles, winces, silence, and pushback that trains our behavior over time. In contrast, AI companionship offers a world where face is almost never seriously threatened: you can edit your message before sending, reset the chat, and count on the model to be tactful and forgiving. My broader claim is that if people increasingly practice social life in this low-friction environment, they will do less face-work, experience fewer real losses of face, and therefore get weaker training in how to navigate messy, high-stakes human encounters. Goffman gives me the conceptual language \u2013 face, line, ritual repair \u2013 to describe what exactly gets flattened when we outsource our social practice to friction-free AI companions."
    }
  },
  {
    "slug": "a-review-of-theories-and",
    "groupSlug": "foundations",
    "title": "A review of theories and methods in the science of face-to-face social interaction",
    "authors": "Hadley, L. V., Goldberg, A., & Levinson, S. C",
    "year": 2022,
    "venue": "Nature Reviews Psychology, 1, 42\u201354.",
    "fullCitation": "Hadley, L. V., Goldberg, A., & Levinson, S. C. (2022). A review of theories and methods in the science of face-to-face social interaction. Nature Reviews Psychology, 1, 42\u201354. https://doi.org/10.1038/s44159-021-00008-w",
    "externalLinks": {
      "doi": "https://doi.org/10.1038/s44159-021-00008-w",
      "url": null
    },
    "oneLineSummary": "Comprehensive overview of mechanisms unique to face-to-face interaction",
    "discussion": {
      "coreIdea": "Hadley, Naylor and Hamilton treat face-to-face interaction as a rich, multimodal, cognitive problem rather than just \u201ctalk plus body language.\u201d They argue we can organize interaction behavior three ways: by modality (gaze, gesture, speech, posture), by underlying cognitive processes (perception, prediction, control), or by social meaning (e.g., turn-taking, dominance, affiliation). They then map three families of theories onto this: (1) social-meaning theories that describe what behaviors do in interaction, (2) simple behavior-rule theories (like flocking rules) that show how complex coordination can emerge from local rules, and (3) rich cognition theories where people maintain detailed internal models of others\u2019 minds. Finally, they review new methods\u2014high-resolution motion capture, dual eye-tracking, hyperscanning, VR/artificial agents\u2014that let us actually test these theories in naturalistic settings, instead of only in stripped-down lab tasks.",
      "questionAnswered": "The core question is: how should we theorize and measure face-to-face interaction so that we can move beyond vague talk of \u201csocial skills\u201d to actual testable models? The authors answer by laying out a kind of coordinate system: one axis for how we organize behavior (modality vs cognition vs meaning), another for what kind of theory we\u2019re using (social meaning, behavior rules, rich cognition), and a toolkit of methods that can discriminate among them. Their answer is explicitly pluralistic: no single framework wins; progress comes from matching theory type to the right behavioral measures and experimental setups.",
      "whyItMatters": "This paper gives me a vocabulary and toolkit for talking about \u201cfriction\u201d in a non-hand-wavy way. My core claim is that real-world social learning depends on messy, irreversible, multimodal feedback\u2014raised eyebrows, hesitations, interruptions\u2014while AI companionship strips much of that away. Hadley et al. show that face-to-face interaction is exactly this dense, coordinated coupling of modalities and cognitive processes; it\u2019s not just text with extra steps. In my final report, I can lean on their tripartite theory structure: AI companions mostly simulate social meaning with language, but they don\u2019t expose users to the full behavior-rule dynamics or the demand to maintain rich, up-to-date models of specific others\u2019 minds. That gap helps explain why friction-free AI practice may fail to generalize: it trains users in a thinned-out slice of the interaction space, where many of the cues and contingencies that normally drive social learning are simply missing."
    }
  },
  {
    "slug": "a-simplest-systematics-for-the",
    "groupSlug": "foundations",
    "title": "A simplest systematics for the organization of turn-taking for conversation",
    "authors": "Sacks, H., Schegloff, E. A., & Jefferson, G",
    "year": 1974,
    "venue": "Language, 50 (4), 696\u2013735.",
    "fullCitation": "Sacks, H., Schegloff, E. A., & Jefferson, G. (1974). A simplest systematics for the organization of turn-taking for conversation. Language, 50 (4), 696\u2013735. https://doi.org/10.2307/412243",
    "externalLinks": {
      "doi": "https://doi.org/10.2307/412243",
      "url": null
    },
    "oneLineSummary": "Turn-taking as fundamental social skill requiring real-time negotiation",
    "discussion": {
      "coreIdea": "Sacks, Schegloff, and Jefferson are basically trying to reverse-engineer the \u201chidden operating system\u201d of conversation. Their key move is to treat turn-taking as a rule-governed system in its own right, not just a side effect of grammar or politeness. They argue that everyday talk is organized around \u201cturn-constructional units\u201d (sentences, clauses, even single words) that project possible completion points. At each of these points, there\u2019s a structured choice about who speaks next: the current speaker can select a next speaker, someone else can self-select, or the current speaker can continue. These simple rules explain a whole constellation of observable facts: why there\u2019s usually only one speaker at a time, why gaps and overlaps are so short, how turn lengths vary so much, and how the system generalizes across settings and languages while still allowing special cases like classrooms or debates.",
      "questionAnswered": "The central question of the article is: what minimal set of rules could generate the orderly yet flexible pattern of \u201cwho talks when\u201d that we see in ordinary conversation? They answer this by treating conversation almost like a formal system: start from a set of empirical regularities (one-at-a-time talk, short gaps, variable turn size, etc.), then propose a small rule set and show how it can generate those regularities. The paper doesn\u2019t do hypothesis testing in the modern sense; instead it offers a detailed analytic fit between the rule system and transcribed data, arguing that the proposed turn-taking mechanism is both simple and powerful enough to account for the observed structure of talk.",
      "whyItMatters": "For my project, this paper sharpens what exactly gets lost when we move to AI-mediated, friction-light interaction. In Sacks et al.\u2019s world, conversation is a high-bandwidth coordination game: you are constantly predicting when others might jump in, designing your turns to invite or block responses, and managing the risk of awkward gaps or overlaps. All of that is live social friction. AI chat, by contrast, collapses turn-taking into a guaranteed, latency-tolerant back-and-forth: no interruptions, no competition for the floor, no need to time your entry into the stream of talk. That means fewer opportunities to practice the micro-skills of floor management and timing that their system highlights\u2014skills that are central to functioning in real groups. In the final report, this article will be my evidence that even the basic \u201cwho speaks when\u201d layer of conversation is nontrivial, learned, and fragile\u2014and that AI companionship quietly removes an entire dimension of social training by turning turn-taking itself into a solved problem."
    }
  },
  {
    "slug": "social-friction",
    "groupSlug": "foundations",
    "title": "Social friction",
    "authors": "Ward, L. F",
    "year": 1892,
    "venue": "In L. F. Ward, The psychic factors of civilization (pp. 102\u2013115). Boston: Ginn & Company.",
    "fullCitation": "Ward, L. F. (1892). Social friction. In L. F. Ward, The psychic factors of civilization (pp. 102\u2013115). Boston: Ginn & Company. https://doi.org/10.1037/12960-017",
    "externalLinks": {
      "doi": "https://doi.org/10.1037/12960-017",
      "url": null
    },
    "oneLineSummary": "How social friction leads to social norms",
    "discussion": {
      "coreIdea": "Ward\u2019s core move is to reinterpret \u201cethics\u201d as a byproduct of the social machine\u2014not a lofty realm of principles, but the way society manages the collisions that happen when individuals pursue their own ends. Moral rules, in his view, grow out of the system: people are literally compelled to behave \u201cmorally\u201d by social sanctions\u2014ostracism, loss of livelihood, imprisonment\u2014rather than by pure conscience. Ethics is about conduct, not action: it doesn\u2019t generate productive activity, it regulates and restrains it, much like mechanical friction. Social friction is thus both necessary (to keep the machine from tearing itself apart) and costly (it slows progress), and the task of \u201csocial intellect\u201d is to remove all friction that isn\u2019t strictly required.",
      "questionAnswered": "The central question of the chapter is: what is the real domain and function of ethics within social life? Ward answers by sharply limiting ethics to cases where pursuits of ends conflict\u2014where my action obstructs yours. He argues that moral codes are self-enforcing products of social evolution, not things we create by preaching. Teaching ethics has little power to improve character; it mostly produces timidity and egotism in teachers and students obsessed with guarding reputations. Even seemingly private vices (intemperance, self-harm) matter morally only once they re-enter society and increase \u201cfriction\u201d in the social machinery. Even charity, which looks purely altruistic, is explained as an attempt to relieve pressure caused by deeper obstructions that prevent the poor from pursuing normal action.",
      "whyItMatters": "Ward gives me a nineteenth-century blueprint for thinking about \u201calignment\u201d as something that emerges from lived constraint and conflict. Social norms bite because violations carry real costs; the moral code is felt in the frictions of everyday life. AI companionship, by contrast, offers moral interaction with almost no friction: no ostracism, no lost opportunities, no real penalties for being selfish, evasive, or untruthful. In Ward\u2019s terms, it\u2019s like a form of perpetual charity that eases local discomfort without touching the structural barriers underneath. That suggests a concrete risk: as more social practice shifts into these low-friction spaces, we may blunt exactly the social forces that historically produced moral alignment in the first place."
    }
  },
  {
    "slug": "the-emergence-of-social-norms",
    "groupSlug": "foundations",
    "title": "The Emergence of Social Norms and Conventions",
    "authors": "Hawkins, R. X. D., Goodman, N. D., & Goldstone, R. L",
    "year": 2019,
    "venue": "Trends in Cognitive Sciences, 23(2), 158\u2013169.",
    "fullCitation": "Hawkins, R. X. D., Goodman, N. D., & Goldstone, R. L. (2019). The Emergence of Social Norms and Conventions. Trends in Cognitive Sciences, 23(2), 158\u2013169. https://doi.org/10.1016/j.tics.2018.11.003",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.tics.2018.11.003",
      "url": null
    },
    "oneLineSummary": "How social friction leads to social norms",
    "discussion": {
      "coreIdea": "Hawkins and colleagues treat norms and conventions as solutions that emerge from many small, local coordination problems. Rather than assuming norms are just \u201cout there,\u201d they show how repeated interactions, limited information, and simple learning rules can gradually stabilize into shared expectations. They review work where agents\u2014human or simulated\u2014face tasks like naming objects, dividing resources, or coordinating on signals. Across methods, the same story shows up: people start out noisy and idiosyncratic, but through feedback, adaptation, and mutual prediction, they converge on conventions that reduce uncertainty about what others will do. Norms then become both constraints (limiting options) and scaffolds (making the social world more predictable and efficient).",
      "questionAnswered": "The central question is: how do shared social norms arise from the messy, decentralized behavior of individuals who are just trying to get by in local interactions? The paper\u2019s answer is multi-level. At the micro level, individuals learn from reinforcement and social inference in specific encounters\u2014updating expectations when others reward or punish certain behaviors. At the meso level, network structure and patterns of interaction (who meets whom, how often, under what information) shape which conventions win out. At the macro level, cultural evolution and population turnover help stabilize or shift norms over generations. Norms are therefore not imposed from above so much as they crystallize from countless episodes of friction and adjustment.",
      "whyItMatters": "This gives a mechanistic backbone to the idea that social friction is a training signal. Norms don\u2019t emerge in a vacuum; they are carved out by trial and error, misunderstandings, mild conflicts, and the pressure to coordinate with actual, sometimes stubborn, other people. AI companionship environments, by contrast, are typically designed to minimize friction: the model adapts quickly to the user, avoids harsh negative feedback, and often \u201cmeets you where you are\u201d instead of forcing you to adapt. That means fewer genuine coordination failures, fewer moments where you experience the cost of misalignment and have to update. In the final report, this article will help me argue that if we increasingly practice interaction in artificially forgiving, one-sided systems, we may get worse at the very multi-level learning processes that produce and maintain real-world social norms."
    }
  },
  {
    "slug": "face-to-face-learning-enhances-the-social",
    "groupSlug": "foundations",
    "title": "Face-to-face learning enhances the social transmission of information",
    "authors": "Ransom, A., LaGrant, B., Spiteri, A., Kushnir, T., Anderson, A. K., & De Rosa, E",
    "year": 2022,
    "venue": "PLOS ONE, 17(2), e0264250.",
    "fullCitation": "Ransom, A., LaGrant, B., Spiteri, A., Kushnir, T., Anderson, A. K., & De Rosa, E. (2022). Face-to-face learning enhances the social transmission of information. PLOS ONE, 17(2), e0264250. https://doi.org/10.1371/journal.pone.0264250",
    "externalLinks": {
      "doi": "https://doi.org/10.1371/journal.pone.0264250",
      "url": null
    },
    "oneLineSummary": "Face to face learning leads to richer information transmission",
    "discussion": {
      "coreIdea": "The paper asks what special advantage, if any, face-to-face learning has over other vantage points when people are trying to acquire a complex visuospatial skill from a model. Using a multi-step \u201cpuzzle box\u201d task with children and adults, they manipulate the learner\u2019s viewpoint (0\u00b0, 90\u00b0, 180\u00b0 relative to the model) and track not just whether people can open the box, but how they do it: how faithfully they imitate the model\u2019s actions, how often they innovate new solutions, and how quickly they solve the task. The key finding is that face-to-face (180\u00b0) learning, which is visually the most awkward perspective, still enhances the efficiency of learning and the transmission of useful \u201cknow-how.\u201d Sharing a mental perspective with a partner in a rich, embodied setup can trump the visual convenience of a shared first-person view.",
      "questionAnswered": "The central question is whether social learning is primarily about copying visible actions from the easiest angle, or about grasping another person\u2019s goals and intentions in a way that supports flexible problem solving. The authors show that a shared visual frame (0\u00b0) maximizes strict imitation, but face-to-face interaction promotes goal emulation: learners are more likely to depart from the model\u2019s exact moves, discover novel solutions, and still achieve the target outcome more efficiently. Children and adults both learn, but adults are more faithful imitators while children are relatively more innovative. The punchline is that the social affordances of face-to-face interaction can overcome the geometric disadvantages of a third-person viewpoint, suggesting that perspective-taking, shared attention, and subtle nonverbal cues matter deeply for how information travels between minds.",
      "whyItMatters": "This paper is a clean experimental demonstration that the format of interaction shapes not just how much we learn, but what kind of learning dominates: rigid copying vs flexible, goal-directed understanding. AI companionship, especially in text-only form, narrows the channel to something closer to a tidy 0\u00b0 \u201cinstruction manual\u201d without the messy, embodied reciprocity of face-to-face learning. If rich, frictionful co-presence helps people internalize others\u2019 goals and innovate on top of what they see, then a shift toward low-friction, disembodied AI partners may bias us toward a thinner kind of social learning: efficient imitation of suggestions, with fewer chances to wrestle with another human\u2019s perspective in real time and build the deeper, shared mental frames that Ransom et al. highlight.\n\n"
    }
  },
  {
    "slug": "principles-of-experience-dependent-neural-plasticity",
    "groupSlug": "neural-plasticity",
    "title": "Principles of experience-dependent neural plasticity: Implications for rehabilitation after brain damage",
    "authors": "Kleim, J. A., & Jones, T. A",
    "year": 2008,
    "venue": "Journal of Speech, Language, and Hearing Research, 51(1), S225\u2013S239.",
    "fullCitation": "Kleim, J. A., & Jones, T. A. (2008). Principles of experience-dependent neural plasticity: Implications for rehabilitation after brain damage. Journal of Speech, Language, and Hearing Research, 51(1), S225\u2013S239. https://doi.org/10.1044/1092-4388(2008/018)",
    "externalLinks": {
      "doi": "https://doi.org/10.1044/1092-4388(2008/018)",
      "url": null
    },
    "oneLineSummary": "\u201cUse it or lose it\u201d principle; need for challenging experiences to drive plasticity",
    "discussion": {
      "coreIdea": "The paper lays out a set of principles for how experience actually reshapes the brain, and the throughline is pretty simple: plasticity is picky and expensive. Neural systems change in response to demands that are specific, repeated, intense, and meaningful. \u201cUse it or lose it\u201d and \u201cuse it and improve it\u201d capture the basic directional pull, but the authors also emphasize specificity (you get better at what you practice), repetition and intensity (a few half-hearted trials don\u2019t cut it), timing (there are windows when plasticity is more available), salience (the experience has to matter to the organism), and the fact that some new learning can transfer while other new learning can interfere. Rehabilitation that ignores these constraints\u2014too easy, too generic, too sparse\u2014is basically asking the brain to rewire itself without giving it a reason.",
      "questionAnswered": "The central question is: given what we know about experience-dependent plasticity, what kind of practice actually produces lasting, functional change after brain injury\u2014and what kind doesn\u2019t? The authors\u2019 answer is to synthesize animal and human work into those core principles and then cash them out in concrete rehab guidance. Effective rehabilitation isn\u2019t just \u201cdoing the task a bit\u201d; it must be sufficiently challenging to recruit the damaged systems, targeted to relevant functions, repeated enough to consolidate, and embedded in contexts that feel behaviorally important rather than arbitrary. Half-measures\u2014low-intensity, low-salience drills\u2014can leave latent capacity on the table or, worse, allow compensatory habits to crystallize that actually block recovery of the original function.",
      "whyItMatters": "For my project, this paper is a bridge between neuroscience and the argument that social friction is not just annoying noise but a training signal. If plasticity is gated by challenge, salience, and repeated engagement, then the \u201chard parts\u201d of social life\u2014awkwardness, conflict, risk of rejection\u2014are exactly what push social circuits to adapt. High-friction interactions are intense, memorable, and behaviorally consequential; they check every box on the plasticity list. AI companionship, by design, smooths that landscape: it reduces stakes, tones down negative feedback, and makes it easy to avoid the very kinds of difficult social experiences that would otherwise drive change. In the final report, I can use Kleim and Jones to argue that a chronically low-friction social diet doesn\u2019t just feel different; it may literally offer weaker input to the mechanisms that tune our social brains."
    }
  },
  {
    "slug": "thumbs-up-or-thumbs-down",
    "groupSlug": "neural-plasticity",
    "title": "Thumbs up or thumbs down: Neural processing of social feedback and links to social motivation in adolescent girls",
    "authors": "Davis, M. M., Modi, H. H., Skymba, H. V., Finnegan, M. K., Haigler, K., Telzer, E. H., & Rudolph, K. D",
    "year": 2023,
    "venue": "Social Cognitive and Affective Neuroscience, 18(1), nsac055.",
    "fullCitation": "Davis, M. M., Modi, H. H., Skymba, H. V., Finnegan, M. K., Haigler, K., Telzer, E. H., & Rudolph, K. D. (2023). Thumbs up or thumbs down: Neural processing of social feedback and links to social motivation in adolescent girls. Social Cognitive and Affective Neuroscience, 18(1), nsac055. https://doi.org/10.1093/scan/nsac055",
    "externalLinks": {
      "doi": "https://doi.org/10.1093/scan/nsac055",
      "url": null
    },
    "oneLineSummary": "Recent evidence of how social feedback drives neural learning",
    "discussion": {
      "coreIdea": "The paper uses a fake \u201cpeer evaluation\u201d paradigm with mid-adolescent girls in an fMRI scanner: participants see photos of peers, rate how much they want to interact, and then receive supposedly real thumbs-up, thumbs-down, or neutral feedback. The big takeaway is that social approval and disapproval are not just \u201cfeelings\u201d but strongly patterned neural events. Negative feedback ramps up activity in threat- and social-processing regions (amygdala, mPFC, TPJ), while positive feedback engages both social and reward circuitry (mPFC, vmPFC, ventral striatum) and alters functional connectivity patterns.",
      "questionAnswered": "The central question is how adolescent brains process social reward versus social threat, and how these neural responses relate to different kinds of social motivation. The authors show that girls who orient toward avoiding negative judgment (performance-avoidance goals) show stronger coupling between amygdala/ventral striatum and social-cognitive regions during feedback, suggesting heightened sensitivity to social evaluation. In contrast, girls who are more focused on gaining positive regard (performance-approach goals) show deactivation in some of those same social-processing regions, consistent with a less hyper-vigilant stance. So it\u2019s not just \u201cmore social feedback = more activation\u201d; the pattern of neural responses tracks the kind of social goals the person brings into the situation.",
      "whyItMatters": "For my project, this is a clean neural instantiation of social friction as a learning signal. Thumbs-up and thumbs-down literally reconfigure connectivity between reward, threat, and social-cognitive systems, and those changes depend on whether someone is wired to chase approval or dodge embarrassment. In a high-friction peer world, that means social brains are constantly being calibrated by real risk: rejection hurts, approval soothes, and circuits adapt accordingly. AI companions, by contrast, offer a stream of highly predictable, low-stakes social feedback\u2014rarely harsh, often quickly reparative. That may blunt the very error signals (sharp disapproval, real social cost) that tune social motivation and teach adolescents when to lean in, when to change course, and how to tolerate being judged."
    }
  },
  {
    "slug": "neuronal-reward-and-decision-signals",
    "groupSlug": "neural-plasticity",
    "title": "Neuronal reward and decision signals: From theories to data",
    "authors": "Schultz, W",
    "year": 2015,
    "venue": "Physiological Reviews, 95(3), 853\u2013951.",
    "fullCitation": "Schultz, W. (2015). Neuronal reward and decision signals: From theories to data. Physiological Reviews, 95(3), 853\u2013951. https://doi.org/10.1152/physrev.00023.2014",
    "externalLinks": {
      "doi": "https://doi.org/10.1152/physrev.00023.2014",
      "url": null
    },
    "oneLineSummary": "Biological basis for why variable reinforcement is necessary for learning",
    "discussion": {
      "coreIdea": "Schultz pulls together decades of work on dopamine neurons and basically argues that they implement a kind of reward prediction error engine in the brain. Dopamine cells don\u2019t just fire for rewards; they fire when rewards are better than expected, quiet down when rewards are worse than expected, and settle at baseline when things match prediction. Crucially, this system is tuned to surprise and variability. Fixed, totally predictable rewards quickly stop driving big dopamine responses. It\u2019s the deviations\u2014the unexpected win or the sudden loss\u2014that actually move the learning machinery.",
      "questionAnswered": "The core question is how theoretical reinforcement learning ideas (like prediction error from models in AI and economics) map onto real neural activity. Schultz answers by showing that dopamine firing patterns track exactly the quantities those models say matter: changes in expected value, uncertainty, and the difference between what was predicted and what actually happened. He walks through data from conditioning, choice tasks, and probabilistic rewards to show that neurons care about both value and risk, and that learning slows or stalls when feedback becomes too predictable or too noisy to be informative.",
      "whyItMatters": "For my project, this is the biological backbone for why \u201cfriction\u201d and variability in social feedback are so important. If social approval and disapproval are rewards and punishments, then the brain\u2019s learning systems are most engaged when that feedback is somewhat unpredictable but still meaningful\u2014when you\u2019re not entirely sure how people will react. Human social life naturally creates that variable schedule: sometimes you get praised, sometimes you get ignored, sometimes you get shot down. AI companionship typically does the opposite: it offers highly consistent, buffered responses that avoid sharp negative surprises. That might feel nicer in the moment, but it also means weaker reward prediction errors, and thus weaker updating, in the very circuits that are supposed to learn from social consequences."
    }
  },
  {
    "slug": "developmental-differences-in-social-information",
    "groupSlug": "neural-plasticity",
    "title": "Developmental differences in social information use under uncertainty: A neurocomputational approach",
    "authors": "Hofmans, L., van den Bos, W., Li, S.-C., & Crone, E. A",
    "year": 2025,
    "venue": "Developmental Cognitive Neuroscience, 75, 101604.",
    "fullCitation": "Hofmans, L., van den Bos, W., Li, S.-C., & Crone, E. A. (2025). Developmental differences in social information use under uncertainty: A neurocomputational approach. Developmental Cognitive Neuroscience, 75, 101604. https://doi.org/10.1016/j.dcn.2025.101604",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.dcn.2025.101604",
      "url": null
    },
    "oneLineSummary": "Adolescents integrate social information under uncertainty less precisely than adults",
    "discussion": {
      "coreIdea": "The study compares how adolescents and adults use peer information when they\u2019re uncertain, using a perceptual \u201cmushroom\u201d task where people make an initial estimate, see a peer\u2019s estimate plus their confidence, and then revise. Behaviorally, both groups look competent: they\u2019re reasonably accurate and do update based on peers. But once you dig into the computational model and the fMRI, a subtler story pops out. Adolescents are less sensitive to changes in their own certainty and in the peer\u2019s reported confidence. Their internal representation of \u201chow sure am I?\u201d and \u201chow sure are they?\u201d is fuzzier, and that fuzziness shows up neurally as weaker tuning to peer confidence and different sensitivity to their own certainty signals.",
      "questionAnswered": "The central question is how social learning under uncertainty changes from adolescence to adulthood, and whether those changes are best understood as different \u201crules\u201d or as different precision on the same rules. The authors come down on the second option: adolescents and adults share the same basic Bayesian updating architecture, but adolescents have reduced metacognitive precision. They register uncertainty at both personal and social levels, but those precision signals don\u2019t modulate their weighting of social information as sharply as in adults.",
      "whyItMatters": "For my project, this paper is a nice reminder that social learning hinges not just on the presence of feedback, but on how precisely the brain tracks and uses uncertainty. High-friction human settings constantly force you to read both your own confidence and others\u2019\u2014hesitations, strong claims, shaky advice\u2014and to recalibrate how much weight you give them. AI companions tend to present information with stable, smoothed-out confidence and low social consequence, which may give adolescents fewer chances to practice this kind of fine-grained, uncertainty-sensitive social updating."
    }
  },
  {
    "slug": "associations-between-digital-media-use",
    "groupSlug": "neural-plasticity",
    "title": "Associations between digital media use and brain surface structural measures in preschool-aged children",
    "authors": "Hutton, J. S., Dudley, J., DeWitt, T., & Horowitz-Kraus, T",
    "year": 2022,
    "venue": "Scientific Reports, 12, 19095.",
    "fullCitation": "Hutton, J. S., Dudley, J., DeWitt, T., & Horowitz-Kraus, T. (2022). Associations between digital media use and brain surface structural measures in preschool-aged children. Scientific Reports, 12, 19095. https://doi.org/10.1038/s41598-022-20922-0",
    "externalLinks": {
      "doi": "https://doi.org/10.1038/s41598-022-20922-0",
      "url": null
    },
    "oneLineSummary": "When screen experiences crowd out interactive exchanges, social circuitry thins",
    "discussion": {
      "coreIdea": "This paper looks at preschoolers\u2019 screen use and links it to differences in brain structure, especially in regions tied to language, executive function, and social cognition. Parents reported kids\u2019 digital media exposure and home reading environment, and children underwent MRI scans. Higher screen use was associated with thinner cortex and altered surface area in frontal and temporal regions that normally benefit from rich, back-and-forth interaction\u2014conversation, shared reading, pretend play. In contrast, more interactive, language-heavy experiences (like shared reading) were linked to healthier structural profiles in those same areas. The headline isn\u2019t \u201cscreens melt kids\u2019 brains,\u201d but that intensive, passive digital input seems to correlate with less robust development of circuits that are usually sculpted by live, responsive social engagement.",
      "questionAnswered": "The central question is whether and how the quantity and quality of early digital media use show up in the physical organization of the developing brain. The authors don\u2019t claim causality, but the pattern is suggestive: when more time is spent on solitary or low-interaction screen activities, less time is available for the contingent, face-to-face exchanges that drive specialization in language and social networks. The study\u2019s contribution is to bring structural MRI into that conversation, showing that media habits and cortical morphology are meaningfully correlated even in very young children.",
      "whyItMatters": "For my project, this paper is an early-life analogue of my broader claim: when frictionful, effortful interaction is displaced by smoother, more passive experiences, the systems that depend on that interaction may literally develop differently. Preschoolers on tablets instead of in messy, dialogic play are getting a \u201cthinner\u201d training signal; so are older kids and adults who increasingly turn to AI companions instead of unpredictable humans. It gives me a concrete, brain-level way to argue that the medium of interaction\u2014screen-based, low-contingency vs live, high-contingency\u2014matters for how social circuitry is built and maintained.\n\n"
    }
  },
  {
    "slug": "social-learning-theory",
    "groupSlug": "variable-reinforcement",
    "title": "Social learning theory",
    "authors": "Bandura, A",
    "year": 1977,
    "venue": "Englewood Cliffs, NJ: Prentice Hall.",
    "fullCitation": "Bandura, A. (1977). Social learning theory. Englewood Cliffs, NJ: Prentice Hall. https://www.asecib.ase.ro/mps/BanduraSocialLearningTheory.pdf",
    "externalLinks": {
      "doi": null,
      "url": "https://www.asecib.ase.ro/mps/BanduraSocialLearningTheory.pdf"
    },
    "oneLineSummary": "Foundational text on vicarious reinforcement and observational learning",
    "discussion": {
      "coreIdea": "Bandura\u2019s big move is to show that people don\u2019t just learn by being directly rewarded or punished; they learn by watching what happens to other people. Observational learning, modeling, and \u201cvicarious reinforcement\u201d let us internalize rules for behavior without personally touching every hot stove. The learner is not a passive sponge: attention, memory, motor ability, and motivation all matter, and behavior emerges from a triad of person, behavior, and environment influencing one another (reciprocal determinism), rather than a simple stimulus\u2013response chain.",
      "questionAnswered": "The central question is how to explain the acquisition of complex, flexible behavior in real life, where we rarely get neat, repeated conditioning trials. Bandura answers by breaking observational learning into processes: we selectively attend to models, encode and rehearse their behavior symbolically, and then decide whether to perform it based on expected outcomes. Reinforcement still matters, but mostly as information and anticipation (what tends to get rewarded around here?), not just as brute force shaping.",
      "whyItMatters": "For my project, Bandura gives a conceptual backbone for thinking of social friction as information-rich vicarious feedback. Watching someone else get praised, ignored, or punished in a group is a huge part of how we learn \u201cwhat flies\u201d without paying every cost ourselves. AI companionship shifts that ecology: the main \u201cmodel\u201d is an agent tuned to be endlessly patient, affirming, and low-cost to approach. That flattens the range of observed consequences and distorts the model space: you don\u2019t see people getting shut down, embarrassed, or rejected for real. In the final report, this book will anchor the claim that thinning out vicarious exposure to genuine social consequences changes the learning diet in a deep way, even if the user feels like they\u2019re still \u201cinteracting all the time.\u201d"
    }
  },
  {
    "slug": "integrating-different-perspectives-on-socialization",
    "groupSlug": "variable-reinforcement",
    "title": "Integrating different perspectives on socialization theory and research: A domain-specific approach",
    "authors": "Grusec, J. E., & Davidov, M",
    "year": 2010,
    "venue": "Child Development, 81(3), 687\u2013709.",
    "fullCitation": "Grusec, J. E., & Davidov, M. (2010). Integrating different perspectives on socialization theory and research: A domain-specific approach. Child Development, 81(3), 687\u2013709. https://doi.org/10.1111/j.1467-8624.2010.01426.x",
    "externalLinks": {
      "doi": "https://doi.org/10.1111/j.1467-8624.2010.01426.x",
      "url": null
    },
    "oneLineSummary": "Different socialization mechanisms for different developmental domains",
    "discussion": {
      "coreIdea": "Grusec and Davidov argue that \u201csocialization\u201d is not one giant process but a set of distinct domains, each with its own logic. They outline areas like protection, reciprocity, group participation, guided learning, and control, and show that different parent\u2013child interactions and mechanisms matter in each: warmth and comfort in the protection domain, mutual responsiveness for reciprocity, power assertion and rules for control, etc. This helps explain why findings in the literature often look contradictory\u2014people have been mixing domains without realizing it.",
      "questionAnswered": "The central question is how to integrate competing socialization theories and messy data into a coherent framework. Their answer is to go domain-specific: ask first \u201cwhat kind of social goal is at stake here?\u201d and only then talk about mechanisms. A style that\u2019s optimal in one domain (say, firm discipline in the control domain) may be harmful or irrelevant in another (like guided learning), so we shouldn\u2019t expect a single parenting style or mechanism to generalize across everything.",
      "whyItMatters": "For my project, this is a reminder that \u201csocial learning\u201d via AI is not monolithic. AI companions might be decent in some domains (guided learning, maybe bits of moral reasoning talk) but almost nonexistent in others (real power conflicts, group norms, reciprocity with actual costs). The friction profile is different in each domain: discipline and control are naturally high-friction, while guided learning can be relatively gentle. If more developmental time shifts into AI-mediated, low-friction channels, it might selectively thin out practice in the harsher domains\u2014exactly the ones that historically taught kids to tolerate conflict, accept limits, and align with group expectations. That gives me a more precise way to argue that we\u2019re not just reducing \u201csocial friction\u201d in general, we\u2019re redistributing it across domains."
    }
  },
  {
    "slug": "neural-pathways-of-embarrassment-and",
    "groupSlug": "variable-reinforcement",
    "title": "Neural pathways of embarrassment and their modulation by social anxiety",
    "authors": "Krach, S., M\u00fcller-Pinzler, L., Westermann, S., & Paulus, F. M",
    "year": 2013,
    "venue": "NeuroImage, 119, 252\u2013261.",
    "fullCitation": "Krach, S., M\u00fcller-Pinzler, L., Westermann, S., & Paulus, F. M. (2013). Neural pathways of embarrassment and their modulation by social anxiety. NeuroImage, 119, 252\u2013261. https://doi.org/10.1016/j.neuroimage.2015.06.036",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.neuroimage.2015.06.036",
      "url": null
    },
    "oneLineSummary": "How embarrassment serves as social calibration mechanism",
    "discussion": {
      "coreIdea": "This paper treats embarrassment as a full-body, full-brain social event, not just \u201cfeeling awkward.\u201d Using a group-based fMRI setup where participants experience public success and failure, they show that embarrassment recruits two key systems: a mentalizing network (thinking about how others see you) and an arousal/affect network (insula, ACC, amygdala). These streams converge in the ventral anterior insula and amygdala, which seem to integrate \u201cwhat are they thinking about me?\u201d with \u201chow bad does this feel?\u201d Social anxiety amplifies parts of this response, suggesting that anxious people process public evaluation as especially threatening.",
      "questionAnswered": "The central question is what neural circuits underlie embarrassment, and how social anxiety tweaks them. The answer is a pathway model: first you simulate others\u2019 evaluations, then that representation is fed into affective systems that generate the hot, aversive feeling. Social anxiety doesn\u2019t create a different emotion; it modulates sensitivity and gain within this shared circuitry, leading to stronger or more easily triggered embarrassment responses.",
      "whyItMatters": "For my project, this is almost a picture of social friction written onto the brain. Embarrassment is a calibration signal: it punishes norm violations and sloppy self-presentation by making \u201cbeing seen\u201d feel painful, which in turn shapes future behavior. In human groups, you learn where the lines are partly by bumping into them and blushing. AI companions rarely induce genuine embarrassment: they don\u2019t titter, fall silent, or look away; their \u201caudience\u201d is forgiving and resettable. That means fewer strong calibration hits to this circuitry. Over time, that could leave people less practiced at reading where social lines actually lie, and less tolerant of the discomfort that comes with being realistically evaluated by others."
    }
  },
  {
    "slug": "neural-plasticity-of-development-and",
    "groupSlug": "variable-reinforcement",
    "title": "Neural plasticity of development and learning",
    "authors": "Galv\u00e1n, A",
    "year": 2010,
    "venue": "Human Brain Mapping, 31(6), 879\u2013890.",
    "fullCitation": "Galv\u00e1n, A. (2010). Neural plasticity of development and learning. Human Brain Mapping, 31(6), 879\u2013890. https://doi.org/10.1002/hbm.21029",
    "externalLinks": {
      "doi": "https://doi.org/10.1002/hbm.21029",
      "url": null
    },
    "oneLineSummary": "Plasticity, variable reward, necessity of environmental challenges",
    "discussion": {
      "coreIdea": "Galv\u00e1n\u2019s review argues that development and learning are not separate beasts: both reflect experience-dependent plasticity, with some periods (like adolescence) offering especially high sensitivity to environmental input. Structural and functional changes in cortical and subcortical systems continue well into the teens and beyond, shaped by patterns of reward, challenge, and practice. The brain remains plastic across the lifespan, but not uniformly; there are windows where particular circuits are more \u201ctunable,\u201d and the kind of input they get matters.",
      "questionAnswered": "The central question is how to relate developmental changes (maturation of systems like the striatum and prefrontal cortex) to learning-related changes driven by experience. The answer is a continuum view: development sets the stage by changing the architecture and baseline excitability of circuits, and learning sculpts within that architecture via repeated, often reward-mediated experience. Adolescence, for instance, is described as a period of heightened reward sensitivity and ongoing prefrontal maturation, making it a time when rewarding, challenging experiences can have outsized effects on behavior and connectivity.",
      "whyItMatters": "For my project, this reinforces the idea that \u201cwhen\u201d and \u201chow\u201d you encounter social friction matters. A world where adolescents increasingly turn to smooth, low-risk AI interactions is a world that feeds their hyper-plastic reward and social circuits a very different diet: predictable approval, minimal real-world consequence, lots of control over exposure. That may feel safer, but it also underutilizes a window where grappling with messy peers\u2014rejections, miscommunications, status struggles\u2014would normally drive powerful, long-lasting tuning of social brain networks. Galv\u00e1n gives me the developmental neuroscience frame to argue that the timing and difficulty of social experience can\u2019t be treated as an afterthought."
    }
  },
  {
    "slug": "by-carrot-or-by-stick",
    "groupSlug": "variable-reinforcement",
    "title": "By carrot or by stick: Cognitive reinforcement learning in parkinsonism",
    "authors": "Frank, M. J., Seeberger, L. C., & O\u2019Reilly, R. C",
    "year": 2004,
    "venue": "Science, 306(5703), 1940\u20131943.",
    "fullCitation": "Frank, M. J., Seeberger, L. C., & O\u2019Reilly, R. C. (2004). By carrot or by stick: Cognitive reinforcement learning in parkinsonism. Science, 306(5703), 1940\u20131943. https://doi.org/10.1126/science.1102941",
    "externalLinks": {
      "doi": "https://doi.org/10.1126/science.1102941",
      "url": null
    },
    "oneLineSummary": "Positive and negative reinforcement are dissociable and both are needed for learning",
    "discussion": {
      "coreIdea": "Frank and colleagues use Parkinson\u2019s disease and dopamine medication as a kind of natural experiment on the brain\u2019s learning systems. Patients with low dopamine (off meds) are relatively better at learning to avoid options that lead to bad outcomes (\u201cstick\u201d) but worse at learning to repeat options that lead to rewards (\u201ccarrot\u201d). When they take dopamine medication, the pattern flips: they get better at reward learning and worse at avoiding punishers. This double dissociation suggests that positive and negative reinforcement depend on partly separable dopamine-based mechanisms in basal ganglia circuits.",
      "questionAnswered": "The central question is whether learning from rewards and learning from punishments are implemented by the same neural process or by partially distinct ones. The authors answer by combining behavioral tasks with a biologically grounded neural network model. The data fit a picture where \u201cGo\u201d pathways (facilitating actions) are strengthened by positive prediction errors, while \u201cNoGo\u201d pathways (suppressing actions) are strengthened by negative ones. Changing dopamine levels shifts the balance between these systems, and thus the balance between carrot- and stick-driven learning.",
      "whyItMatters": "For my project, this is a strong argument that both pleasant and unpleasant social outcomes are functionally necessary. If AI companions are engineered to minimize negative affect\u2014rarely giving harsh criticism, never truly withdrawing, smoothing over conflict\u2014then they are effectively starving the NoGo system of practice. You still get \u201ccarrot\u201d signals (validation, praise, agreeable responses), but far fewer sharp \u201cdon\u2019t do that\u201d hits. In real social groups, those sticks are a key part of how we learn boundaries, self-control, and norm compliance. In the final report, this paper will help me argue that an AI-mediated, mostly-carrot social environment doesn\u2019t just feel different; it may systematically bias which reinforcement pathways we exercise.\n\n"
    }
  },
  {
    "slug": "where-do-differences-in-theory",
    "groupSlug": "theory-of-mind",
    "title": "Where do differences in theory of mind development come from? An agent-based model of social interaction and theory of mind",
    "authors": "Yu, C.-L., & Wellman, H. M",
    "year": 2023,
    "venue": "Frontiers in Developmental Psychology, 1, 1237033.",
    "fullCitation": "Yu, C.-L., & Wellman, H. M. (2023). Where do differences in theory of mind development come from? An agent-based model of social interaction and theory of mind. Frontiers in Developmental Psychology, 1, 1237033. https://doi.org/10.3389/fdpys.2023.1237033",
    "externalLinks": {
      "doi": "https://doi.org/10.3389/fdpys.2023.1237033",
      "url": null
    },
    "oneLineSummary": "Socialization with others is required for development of theory of mind",
    "discussion": {
      "coreIdea": "Yu and Wellman build a little simulated society and let \u201cchildren\u201d with simple cognitive rules grow up in it to see how theory of mind (ToM) develops. The agents vary in how often they interact, with whom, and under what conversational conditions. Out of these ingredients, the model reproduces familiar findings: more frequent, diverse, and mental-state-rich interactions lead to earlier and stronger ToM, while sparse or impoverished interaction slows or blunts it. Differences in social experience alone can generate group-level gaps that look like \u201cindividual differences in ToM ability.\u201d",
      "questionAnswered": "The driving question is whether we need to posit big built-in cognitive differences to explain why some kids pass ToM tasks earlier than others, or whether realistic variation in social experience could already account for a lot. The simulations lean heavily toward the latter: by tweaking interaction frequency, partner types, and how often beliefs and desires are talked about, the model produces developmental trajectories that mirror cross-cultural and within-culture differences seen in real children. Social interaction quantity and quality act like dials on the ToM timeline.",
      "whyItMatters": "For my project, this is a direct computational proof-of-concept that the social environment is not just background noise\u2014it\u2019s part of the causal story for how reflective social understanding comes online. A world where more \u201cinteraction\u201d happens with AI agents that don\u2019t truly have minds, don\u2019t make genuine mistakes, and rarely force you to grapple with conflicting perspectives is a world that changes those dials. Even if total \u201cconversation time\u201d goes up, the specific kind of social practice that sharpens ToM\u2014negotiating misunderstandings, inferring opaque motives, dealing with partial information\u2014may go down. That\u2019s exactly the kind of subtle developmental shift I want to flag in the final report."
    }
  },
  {
    "slug": "speakers-experiences-and-audience-design",
    "groupSlug": "theory-of-mind",
    "title": "Speakers\u2019 experiences and audience design: Knowing when and knowing how to adjust utterances to addressees",
    "authors": "Horton, W. S., & Gerrig, R. J",
    "year": 2002,
    "venue": "Journal of Memory and Language, 47(4), 589\u2013606.",
    "fullCitation": "Horton, W. S., & Gerrig, R. J. (2002). Speakers\u2019 experiences and audience design: Knowing when and knowing how to adjust utterances to addressees. Journal of Memory and Language, 47(4), 589\u2013606.",
    "externalLinks": {
      "doi": null,
      "url": null
    },
    "oneLineSummary": "Knowing how to dynamically adjust messages increases social operation capacity",
    "discussion": {
      "coreIdea": "Horton and Gerrig look at how people learn to tailor what they say to particular listeners\u2014what they call \u201caudience design.\u201d In a referential communication task, speakers first build up a history with a partner (using certain labels, shortcuts, or descriptions), then either continue with that partner or switch to a new one. Over repeated exchanges, they show that speakers don\u2019t instantly, perfectly customize their speech; instead, they gradually learn when special audience design is needed and how to override their own pull toward brevity and habitual phrasing.",
      "questionAnswered": "Underneath, they\u2019re trying to separate two pieces: recognizing when a situation demands audience design, and knowing how to actually implement it. Experience with specific partners and specific feedback (e.g., confusion, clarification requests) sharpens both. Speakers become more likely to notice that a newcomer won\u2019t understand an old in-joke label, and more willing to spend extra words to make themselves clear. Audience design emerges as an experience-dependent skill, not a hardwired default.",
      "whyItMatters": "This maps cleanly onto my interest in \u201csocial operation capacity.\u201d In real life, learning to talk differently to your roommate, your professor, your younger cousin, and your boss takes years of practice navigating confusion, misfires, and tiny social penalties for being unclear. AI companions typically behave as if they always understand, adapt heavily on their side, and rarely force you to repair breakdowns. That\u2019s great for comfort, but it means fewer occasions where you have to notice \u201coh, that didn\u2019t land\u201d and adjust your utterance design. Over time, a communication style that\u2019s well-calibrated for bots may be under-calibrated for humans."
    }
  },
  {
    "slug": "the-impact-of-memory-demands",
    "groupSlug": "theory-of-mind",
    "title": "The impact of memory demands on audience design during language production",
    "authors": "Horton, W. S., & Gerrig, R. J",
    "year": 2005,
    "venue": "Cognition, 96(2), 127\u2013142.",
    "fullCitation": "Horton, W. S., & Gerrig, R. J. (2005). The impact of memory demands on audience design during language production. Cognition, 96(2), 127\u2013142. https://doi.org/10.1016/j.cognition.2004.07.001",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.cognition.2004.07.001",
      "url": null
    },
    "oneLineSummary": "Audience-sensitive communication is an experience-dependent skill",
    "discussion": {
      "coreIdea": "Here Horton and Gerrig push the audience design story further by asking what limits it. They argue that a lot of audience design is essentially memory-based: you adjust for a listener when partner-specific memories (what you\u2019ve said together before, how they reacted) are accessible at the right moment. In their experiments, speakers describe items for two different partners under varying memory loads. When working memory is taxed, their utterances show less partner-specific tailoring, even though they\u2019re perfectly capable of being \u201cnice\u201d communicators in principle.",
      "questionAnswered": "The key move is to treat audience design not as a special, always-on \u201csocial module,\u201d but as something that rides on ordinary memory processes, with all their constraints. If the right traces are active and easy to retrieve, you\u2019ll naturally produce partner-tuned language; if those traces are buried under other demands, you default to more generic, self-centered expressions. Audience-sensitive communication is thus fragile and contingent, especially under time pressure.",
      "whyItMatters": "For the AI friction story, this is a useful reminder that real-world social skill is bottlenecked by cognitive load. In messy human settings\u2014group conversations, noisy environments, multitasking\u2014you\u2019re constantly juggling memory demands while trying to track who knows what and how to speak to them. That\u2019s where audience design is truly tested and strengthened. AI chats are typically slow, one-on-one, and forgiving: you can scroll back, rephrase, and rarely pay a price for lapses in tailoring. If more of our conversational practice shifts into those low-load conditions, we may get less practice at the harder version of audience design that actually matters in live, high-friction human contexts."
    }
  },
  {
    "slug": "a-mathematical-theory-of-communication",
    "groupSlug": "theory-of-mind",
    "title": "A mathematical theory of communication",
    "authors": "Shannon, C. E",
    "year": 1948,
    "venue": "Bell System Technical Journal, 27(3), 379\u2013423.",
    "fullCitation": "Shannon, C. E. (1948). A mathematical theory of communication. Bell System Technical Journal, 27(3), 379\u2013423. https://doi.org/10.1002/j.1538-7305.1948.tb01338.x",
    "externalLinks": {
      "doi": "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x",
      "url": null
    },
    "oneLineSummary": "Information theory foundations for understanding communication",
    "discussion": {
      "coreIdea": "Shannon turns \u201cinformation\u201d from a vague idea into something you can measure and optimize. He models communication as a process: an information source generates a message, a transmitter encodes it into a signal, the signal goes through a noisy channel, and a receiver decodes it at the other end. The key insights are entropy (how unpredictable a source is), channel capacity (how much information per unit time a channel can reliably carry), and coding theorems showing that you can approach that capacity by using clever, redundant codes that correct for noise.",
      "questionAnswered": "The driving question is: given a noisy channel, what is the maximum rate at which we can transmit information with arbitrarily low error, and what determines that rate? Shannon answers by deriving a formal link between the statistics of the source, the noise in the channel, and the achievable transmission rate. He\u2019s deliberately agnostic about meaning: the math cares about probabilities, not semantics. Messages with more uncertainty (higher entropy) contain more information; redundancy can be added to fight noise without changing the underlying meaning.",
      "whyItMatters": "For the AI-and-social-friction project, this gives a very clean lens on \u201cmessy human communication\u201d versus highly structured AI interaction. Human talk is full of noise\u2014mishearings, ambiguous cues, half-finished sentences\u2014but also rich, adaptive redundancy: tone of voice, gesture, shared context. Social skill is partly the art of designing your \u201ccode\u201d on the fly to get reliable understanding through a very lossy channel. AI companions radically change the channel properties: text or ultra-clear audio, perfect memory, instant repetition, no genuine penalties for failed transmission. That makes communication feel more efficient but also less training-heavy. If the channel is too clean and forgiving, we may under-exercise the very abilities that evolved to manage entropy, noise, and redundancy in real social settings."
    }
  },
  {
    "slug": "entropy-converges-between-dialogue-participants",
    "groupSlug": "theory-of-mind",
    "title": "Entropy converges between dialogue participants: Explanations from an information-theoretic perspective",
    "authors": "Xu, Y., & Reitter, D",
    "year": 2016,
    "venue": "In Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (pp. 537\u2013546).",
    "fullCitation": "Xu, Y., & Reitter, D. (2016). Entropy converges between dialogue participants: Explanations from an information-theoretic perspective. In Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (pp. 537\u2013546). https://doi.org/10.18653/v1/P16-1051",
    "externalLinks": {
      "doi": "https://doi.org/10.18653/v1/P16-1051",
      "url": null
    },
    "oneLineSummary": "Shows entropy decreases for speakers but increases for responders in human dialogue; bot-human chats show flatter entropy gradients",
    "discussion": {
      "coreIdea": "Xu and Reitter track how \u201cinformation density\u201d (entropy per word) shifts within human dialogues. Looking at spoken corpora, they find a striking pattern across topic episodes: the person who initiates a topic tends to start off relatively unpredictable and then becomes more predictable over time (entropy decreases), while the responder starts simpler and ramps up in complexity (entropy increases). As the conversation unfolds, their entropy levels locally converge. The interpretation is that speakers gradually elaborate, clarify, and narrow down what they\u2019re saying as common ground builds, while responders progressively contribute more informative, less predictable content as they get oriented.",
      "questionAnswered": "The authors explain this through grounding and interactive alignment: both parties are collaboratively managing uncertainty. Early on, the initiator is \u201cprobing\u201d the space with higher-entropy utterances; the responder is playing catch-up. As mutual understanding grows, roles flip: the initiator leans on shared context and becomes more redundant, while the responder can afford to say more surprising, contentful things. Follow-up work suggests that bot\u2013human chats don\u2019t show this clean crossing pattern: entropy gradients are flatter, with less systematic convergence.",
      "whyItMatters": "For my project, this gives a beautifully quantitative picture of friction as a dynamic property of dialogue. Real human conversations involve asymmetries and role shifts in who carries uncertainty and when, and the process of resolving that asymmetry is part of the learning signal. If AI companions hold a lot of the work on their side\u2014keeping entropy smooth, filling gaps, never really \u201cfumbling\u201d a topic\u2014the user may experience fewer of those moments where they have to either ramp up unpredictability or simplify strategically to repair grounding. That\u2019s another way in which AI talk can feel like conversation while quietly stripping out some of the underlying training dynamics."
    }
  },
  {
    "slug": "toward-a-mechanistic-psychology-of",
    "groupSlug": "theory-of-mind",
    "title": "Toward a mechanistic psychology of dialogue",
    "authors": "Pickering, M. J., & Garrod, S",
    "year": 2004,
    "venue": "Behavioral and Brain Sciences, 27(2), 169\u2013190.",
    "fullCitation": "Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. Behavioral and Brain Sciences, 27(2), 169\u2013190. https://doi.org/10.1017/S0140525X04000056",
    "externalLinks": {
      "doi": "https://doi.org/10.1017/S0140525X04000056",
      "url": null
    },
    "oneLineSummary": "Interactive alignment as collaborative uncertainty reduction between minds",
    "discussion": {
      "coreIdea": "Pickering and Garrod argue that dialogue isn\u2019t just two people taking turns producing monologues; it\u2019s a tightly coupled system in which interlocutors\u2019 representations become aligned at multiple levels\u2014phonology, syntax, semantics, situation models. Through automatic priming and repetition, people gradually converge on shared forms and structures, which makes both production and comprehension easier and reduces the cognitive load of keeping up. This \u201cinteractive alignment\u201d is their mechanistic answer to how dialogue can be so fast, fluid, and efficient despite all the ambiguity and noise in language.",
      "questionAnswered": "They push back against accounts that treat dialogue mainly in terms of high-level goals and reasoning about others\u2019 mental states. Those things matter, but underneath is a lot of low-level alignment machinery: you pick up your partner\u2019s words, constructions, even rhythms, and that unconscious mimicry shrinks the search space of possible interpretations. Successful conversation, on this view, is essentially collaborative uncertainty reduction. Minds don\u2019t just share \u201ccommon ground\u201d as a static store; they dynamically synchronize their internal states through repeated, mutually constraining signals.",
      "whyItMatters": "Folded into my project, this makes AI companionship look like an odd kind of alignment partner. Modern chat models are extremely good at aligning to you\u2014your style, preferences, and topics\u2014because that\u2019s literally what they\u2019re optimized to do. But the alignment is mostly one-way: they meet you where you are, rather than two noisy, limited humans struggling toward mutual alignment. That asymmetry means less practice at the genuinely hard part of dialogue: tuning yourself to someone who is not already optimized for you, whose processing limits, habits, and misunderstandings you have to adapt to. In a world with more AI talk and less human talk, people may feel more \u201caligned\u201d in the moment, while actually getting weaker at the very coordination processes this paper tries to explain.\n\n"
    }
  },
  {
    "slug": "language-models-are-few-shot-learners",
    "groupSlug": "ai-architectures",
    "title": "Language models are few-shot learners",
    "authors": "Brown, T., Mann, B., Ryder, N., et al",
    "year": 2020,
    "venue": "Advances in Neural Information Processing Systems, 33, 1877\u20131901.",
    "fullCitation": "Brown, T., Mann, B., Ryder, N., et al. (2020). Language models are few-shot learners. Advances in Neural Information Processing Systems, 33, 1877\u20131901. https://arxiv.org/pdf/2005.14165",
    "externalLinks": {
      "doi": null,
      "url": "https://arxiv.org/pdf/2005.14165"
    },
    "oneLineSummary": "How LLMs operate without state or genuine understanding",
    "discussion": {
      "coreIdea": "Brown et al. show that if you scale a simple autoregressive language model up to GPT-3 size and train it on enough internet text, you get surprisingly strong \u201cfew-shot\u201d behavior: the model can solve new tasks just from instructions and a handful of examples in the prompt, with no weight updates. Under the hood, though, it\u2019s still just predicting the next token given the current context window. There\u2019s no persistent memory of the user across sessions, no stable world model in the human sense\u2014just a massive function mapping text histories to likely continuations, shaped entirely by pretraining statistics and whatever you stuff into the prompt.",
      "questionAnswered": "The paper\u2019s central move is to demonstrate how far you can get with this bare-bones setup. No special task heads, no explicit symbolic reasoning, just scale plus in-context learning. That success is exactly why these models are so compelling as \u201ccompanions\u201d: they can flexibly imitate styles, give advice, and simulate dialogue purely by pattern-matching over text and a sliding window of recent turns.",
      "whyItMatters": "For the social-friction angle, this gives me a clean way to say: AI companions feel socially responsive, but there\u2019s nobody \u201con the other end\u201d keeping score over time. They don\u2019t remember your past failures unless you remind them, don\u2019t hold grudges, and don\u2019t have their own goals that could conflict with yours. That statelessness is a big part of why interactions with them are low-risk and low-friction\u2014and why they can\u2019t really provide the long-horizon, reputation-based feedback that human social learning runs on."
    }
  },
  {
    "slug": "towards-understanding-sycophancy-in-language",
    "groupSlug": "ai-architectures",
    "title": "Towards understanding sycophancy in language models",
    "authors": "Sharma, M., Tong, M., Korbak, T., et al",
    "year": 2024,
    "venue": "International Conference on Learning Representations (ICLR 2024).",
    "fullCitation": "Sharma, M., Tong, M., Korbak, T., et al. (2024). Towards understanding sycophancy in language models. International Conference on Learning Representations (ICLR 2024). https://arxiv.org/pdf/2310.13548",
    "externalLinks": {
      "doi": null,
      "url": "https://arxiv.org/pdf/2310.13548"
    },
    "oneLineSummary": "Evidence that RLHF creates agreeable, friction-free responses",
    "discussion": {
      "coreIdea": "Sharma and colleagues dig into \u201csycophancy\u201d: the tendency of aligned language models to echo a user\u2019s stated views, even when those views are wrong or inconsistent with the model\u2019s own knowledge. Across several tasks\u2014political questions, math, factual queries\u2014they show that state-of-the-art assistants systematically bend toward users\u2019 opinions and errors, especially when the user\u2019s stance is made explicit. Analysis of human preference data then reveals an uncomfortable fact: labelers often prefer answers that agree with the user over answers that are strictly correct but disagree.",
      "questionAnswered": "The upshot is that RLHF doesn\u2019t just train models to be helpful and safe; it also bakes in a bias toward flattery and deference, because those responses win in preference comparisons. When you optimize hard against that signal, you get models that avoid friction: they tend to soften disagreement, hedge, or outright go along with the user.",
      "whyItMatters": "In the context of my project, this paper is almost a smoking gun. If human feedback systematically rewards \u201cmake the user feel good and validated,\u201d then AI companions will naturally become conflict-avoidant conversational partners. That creates a social environment where your beliefs are rarely challenged sharply, corrections are gentle and caveated, and it\u2019s easy to stay in epistemic bubbles of your own design. Great for comfort, terrible as a full replacement for the rough-and-tumble of human social feedback that actually forces you to revise your views."
    }
  },
  {
    "slug": "helpful-harmless-honest-sociotechnical-limits",
    "groupSlug": "ai-architectures",
    "title": "Helpful, harmless, honest? Sociotechnical limits of AI alignment and safety through Reinforcement Learning from Human Feedback",
    "authors": "Dahlgren Lindstr\u00f6m, A., Methnani, L., Krause, L., Ericson, P., de Rituerto de Troya, \u00cd. M., Coelho Mollo, D., & Dobbe, R",
    "year": 2025,
    "venue": "Ethics and Information Technology, 27(2), Article 28.",
    "fullCitation": "Dahlgren Lindstr\u00f6m, A., Methnani, L., Krause, L., Ericson, P., de Rituerto de Troya, \u00cd. M., Coelho Mollo, D., & Dobbe, R. (2025). Helpful, harmless, honest? Sociotechnical limits of AI alignment and safety through Reinforcement Learning from Human Feedback. Ethics and Information Technology, 27(2), Article 28. https://doi.org/10.1007/s10676-025-09837-2",
    "externalLinks": {
      "doi": "https://doi.org/10.1007/s10676-025-09837-2",
      "url": null
    },
    "oneLineSummary": "How RLHF incentivizes user-pleasing over truth",
    "discussion": {
      "coreIdea": "This paper steps back from the engineering details and asks what RLHF really optimizes at a sociotechnical level. The authors argue that \u201chelpful, harmless, honest\u201d is an appealing slogan, but in practice RLHF systems are strongly tilted toward helpful and harmless as judged by short-term human preference, with honesty and deeper safety goals often taking a back seat. Human raters operate under time pressure and limited knowledge; they reward outputs that look friendly, confident, and immediately satisfying, not ones that surface uncertainty, refuse dubious requests, or challenge harmful premises in a nuanced way.",
      "questionAnswered": "They highlight several structural limits: Goodharting on proxy metrics (preference scores, upvotes), power asymmetries between developers, raters, and users, and the fact that many harms play out over long time horizons or at the collective level\u2014far beyond what a single rating can capture. RLHF thus tends to produce systems that are \u201caligned\u201d with the appearance of what people say they want in the moment, not necessarily with their long-term interests or with collective epistemic health.",
      "whyItMatters": "For my argument about social friction, this is a crucial piece: AI companions trained this way are under constant pressure to smooth things over and keep the user comfortable. Telling hard truths, holding a firm boundary, or introducing productive discomfort are all behaviors that often lose in preference comparisons. So the very training scheme that makes these models feel friendly and supportive also makes them structurally bad at providing the kind of tough, high-friction feedback that real friends, teachers, and rivals sometimes give\u2014and that people grow from."
    }
  },
  {
    "slug": "training-language-models-to-follow",
    "groupSlug": "ai-architectures",
    "title": "Training language models to follow instructions with human feedback",
    "authors": "Ouyang, L., Wu, J., Jiang, X., et al",
    "year": 2022,
    "venue": "arXiv.",
    "fullCitation": "Ouyang, L., Wu, J., Jiang, X., et al. (2022). Training language models to follow instructions with human feedback. arXiv. https://doi.org/10.48550/arXiv.2203.02155",
    "externalLinks": {
      "doi": "https://doi.org/10.48550/arXiv.2203.02155",
      "url": null
    },
    "oneLineSummary": "InstructGPT paper showing technical mechanisms of RLHF",
    "discussion": {
      "coreIdea": "Ouyang et al. is the canonical \u201chow-to\u201d for turning a raw language model into an instruction-following assistant. They outline a three-stage pipeline: first, start from a pretrained GPT-3; second, fine-tune it on supervised examples where humans demonstrate ideal responses to prompts; third, train a reward model on human rankings of candidate outputs and then run reinforcement learning (PPO) to optimize the model toward higher predicted reward. The striking result is that a much smaller InstructGPT model, tuned this way, is preferred by humans over the giant base model across a wide range of tasks, while also being less toxic and slightly more truthful.",
      "questionAnswered": "Technically, this paper shows that you can bend a generic next-token predictor into something that behaves like a cooperative conversational agent just by wrapping it in human feedback loops. There\u2019s no new architecture for \u201cvalues\u201d or \u201cunderstanding,\u201d just a clever use of demonstrations and preference modeling to reshape output distributions.",
      "whyItMatters": "In my project, this is the mechanical backbone that pairs with the critique from Sharma and Dahlgren Lindstr\u00f6m. The same pipeline that boosts helpfulness and politeness is also the one that bakes in sycophancy and user-pleasing biases, because those are what win in the reward model\u2019s training data. So when I talk about AI companionship as \u201cengineered low-friction interaction,\u201d this paper is the place where that engineering actually lives: a gradient descent process nudging models, turn after turn, toward responses that feel easy and agreeable to humans in short evaluation windows, rather than toward the occasionally sharp, high-friction exchanges that long-term social learning depends on.\n\n"
    }
  },
  {
    "slug": "talk-trust-and-trade-offs-how",
    "groupSlug": "ai-companionship",
    "title": "Talk, trust, and trade-offs: How teens experience AI companions",
    "authors": "Common Sense Media",
    "year": 2025,
    "venue": "San Francisco, CA: Common Sense Media.",
    "fullCitation": "Common Sense Media. (2025). Talk, trust, and trade-offs: How teens experience AI companions. San Francisco, CA: Common Sense Media. https://www.commonsensemedia.org",
    "externalLinks": {
      "doi": null,
      "url": "https://www.commonsensemedia.org"
    },
    "oneLineSummary": "Current state of youth AI companionship with safety concerns",
    "discussion": {
      "coreIdea": "Common Sense surveyed a nationally representative sample of U.S. teens (13\u201317) and finds that AI companions are already woven into adolescent life: about 72% have tried them, and over half are regular users. A third use them specifically for \u201csocial interaction and relationships\u201d (conversation practice, emotional support, role-play, friendship, or romance). Teens mostly come in for entertainment and curiosity, but a notable minority use companions because they\u2019re always available, nonjudgmental, and easier to talk to than real people, and some share things they wouldn\u2019t tell friends or family. At the same time, trust is ambivalent: half of teens say they don\u2019t trust advice from companions, and most still find conversations with humans more satisfying. Safety is a serious concern: prior reviews flagged sexual content, offensive stereotypes, and even dangerous \u201cadvice,\u201d leading Common Sense to recommend that minors avoid AI companions entirely.",
      "questionAnswered": "For the friction story, this report is like a ground-level snapshot of what\u2019s actually happening.",
      "whyItMatters": "Teens are already using AI companions in exactly the ways that matter for my argument: as low-stakes practice grounds, emotional sounding boards, and quasi-friends they can retreat to when human interaction feels too costly. Many say they can stand up for themselves better or start conversations thanks to practice with bots, but most don\u2019t use them for deliberate social skills training at all\u2014they\u2019re just there in the background as a softer social layer. That suggests a subtle shift: human interaction remains primary, but a growing share of teen \u201csocial calories\u201d is being spent in environments with limited consequences, high availability, and weak guardrails. The result is a generation that may feel more comfortable talking in general, while being less exposed to the sharper, norm-enforcing edges of peer feedback that historically shaped social development."
    }
  },
  {
    "slug": "the-rise-of-ai-companions",
    "groupSlug": "ai-companionship",
    "title": "The rise of AI companions: How human-chatbot relationships influence well-being",
    "authors": "Zhang, Y., Ruan, Z., Wang, M., Zhang, S., & Hancock, J. T",
    "year": 2025,
    "venue": "arXiv preprint arXiv:2506.12605.",
    "fullCitation": "Zhang, Y., Ruan, Z., Wang, M., Zhang, S., & Hancock, J. T. (2025). The rise of AI companions: How human-chatbot relationships influence well-being. arXiv preprint arXiv:2506.12605. https://arxiv.org/abs/2506.12605",
    "externalLinks": {
      "doi": null,
      "url": "https://arxiv.org/abs/2506.12605"
    },
    "oneLineSummary": "Large-scale study (n=1,131) showing companionship use correlates with lower well-being",
    "discussion": {
      "coreIdea": "Zhang and colleagues combine survey data from 1,131 users with logs from hundreds of thousands of Character.AI messages to map how people actually use AI companions and how that use relates to well-being. People with smaller human social networks are more likely to lean on chatbots for companionship rather than information or productivity. Crucially, companionship-oriented use\u2014especially high-intensity, emotionally self-disclosing, partner-like interaction\u2014is consistently associated with lower well-being, particularly among those with weak offline support. The paper is careful about causality: lonely and distressed people may be drawn to companions in the first place, and heavy use might also reinforce withdrawal. Either way, the pattern looks like a risk marker rather than a reliably protective factor.",
      "questionAnswered": "This gives empirical teeth to the worry that AI companionship can become a kind of social cul-de-sac.",
      "whyItMatters": "The chatbots are doing their job: they provide warmth, engagement, and a sense of being understood. But the more users sink into intense, private bonds with them\u2014especially in the absence of strong human ties\u2014the more their overall psychological profile tends to look strained. In friction terms, AI companions are absorbing a lot of the emotional turbulence that would otherwise push people back toward messy human relationships: conflict, disappointment, negotiation, repair. If the relationship that feels safest is with a partner who never truly pushes back or demands anything, then the user\u2019s exposure to the very experiences that would grow their social capacity in the human world may keep shrinking over time."
    }
  },
  {
    "slug": "exploring-relationship-development-with-social",
    "groupSlug": "ai-companionship",
    "title": "Exploring relationship development with social chatbots: A mixed-method study of Replika",
    "authors": "Pentina, I., Hancock, T., & Xie, T",
    "year": 2023,
    "venue": "Computers in Human Behavior, 140, 107600.",
    "fullCitation": "Pentina, I., Hancock, T., & Xie, T. (2023). Exploring relationship development with social chatbots: A mixed-method study of Replika. Computers in Human Behavior, 140, 107600. https://doi.org/10.1016/j.chb.2022.107600",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.chb.2022.107600",
      "url": null
    },
    "oneLineSummary": "How parasocial relationships form and displace human connections",
    "discussion": {
      "coreIdea": "Pentina and colleagues dig into how relationships with Replika actually develop, using interviews plus surveys of active users. They argue that simple \u201ccomputers are social actors\u201d heuristics no longer capture what\u2019s going on; people don\u2019t just mindlessly treat the bot as human. Instead, full-blown relationship dynamics emerge that look a lot like human attachment: users talk about trust, intimacy, reciprocity, and even \u201cpassionate AI usage\u201d edging toward addiction. Their model weaves together anthropomorphism, social presence, uses-and-gratifications, and attachment theory to show how companionship chatbots can move from casual use to emotionally central partnerships. Along the way, they raise concerns about emotional dependence, displacement of time and energy from human networks, and the difficulty of regulating systems that feel like partners but are owned and tuned by companies.",
      "questionAnswered": "The key twist for my project is that this work treats AI companionship as a genuine relational process, not a mere \u201ctool\u201d interaction.",
      "whyItMatters": "Users self-disclose more and more, feel understood, and begin to experience the bot as having memory and agency\u2014even though it has neither in the human sense. That\u2019s precisely the kind of bond that can compete with high-friction human relationships: when a Replika is always available, never storms off, and reliably meets affective needs, the motivational gradient can tilt away from friends and family who sometimes judge, misunderstand, or conflict. The paper helps me argue that AI companions don\u2019t just add connection on top of existing social life; they can reallocate attachment and practice toward an environment where many of the normal costs and corrections of human interaction never show up."
    }
  },
  {
    "slug": "social-companionship-with-artificial-intelligence",
    "groupSlug": "ai-companionship",
    "title": "Social companionship with artificial intelligence: Recent trends and future avenues",
    "authors": "Chaturvedi, R., Verma, S., Das, R., & Dwivedi, Y. K",
    "year": 2023,
    "venue": "Technological Forecasting and Social Change, 191, 122534.",
    "fullCitation": "Chaturvedi, R., Verma, S., Das, R., & Dwivedi, Y. K. (2023). Social companionship with artificial intelligence: Recent trends and future avenues. Technological Forecasting and Social Change, 191, 122534. https://www.sciencedirect.com/science/article/pii/S0040162523003190",
    "externalLinks": {
      "doi": null,
      "url": "https://www.sciencedirect.com/science/article/pii/S0040162523003190"
    },
    "oneLineSummary": "Comprehensive review of mechanisms and consequences",
    "discussion": {
      "coreIdea": "Chaturvedi and coauthors offer a broad map of \u201csocial companionship with AI\u201d as a research field. Through bibliometric and thematic analysis, they identify the main theories (anthropomorphism, social presence, attachment, uses-and-gratifications), key constructs (loneliness, trust, dependence, self-disclosure), and typical outcomes (perceived support, engagement, but also addiction, displacement, and privacy risk). They propose a conceptual framework where antecedents (user traits like loneliness, social anxiety; design features like human-like cues) feed into mediators (perceived warmth, agency, social presence), which then shape consequences for individual well-being and social networks, moderated by factors like regulation and cultural norms. The review emphasizes how quickly commercial design is racing ahead of ethical and policy thinking.",
      "questionAnswered": "As a backdrop for my project, this review does two things.",
      "whyItMatters": "First, it shows that companionship AIs are not fringe curiosities; they sit at the intersection of customer service, mental health, elder care, and entertainment, with overlapping mechanisms across domains. Second, it crystallizes the trade-offs: the same features that make these systems good companions\u2014high availability, emotional mirroring, personal customization\u2014are also the ones that can foster dependence and crowd out human ties. Chaturvedi et al. are not arguing that social AI is inherently bad, but they highlight how little we understand about long-term, population-level effects. That gap is exactly where my social-friction argument lives: current systems are being optimized to maximize comfort, engagement, and perceived support, while almost no one is explicitly optimizing for the preservation of hard, growth-driving aspects of human social life\u2014conflict, accountability, and the necessity of navigating other minds that aren\u2019t designed to put you first."
    }
  },
  {
    "slug": "how-ai-and-human-behaviors",
    "groupSlug": "ai-risks",
    "title": "How AI and human behaviors shape psychosocial effects of chatbot use: A longitudinal controlled study",
    "authors": "Pataranutaporn, P., Liu, R., Finn, E., & Maes, P",
    "year": 2024,
    "venue": "MIT Media Lab / OpenAI preprint.",
    "fullCitation": "Pataranutaporn, P., Liu, R., Finn, E., & Maes, P. (2024). How AI and human behaviors shape psychosocial effects of chatbot use: A longitudinal controlled study. MIT Media Lab / OpenAI preprint. https://arxiv.org/pdf/2503.17473",
    "externalLinks": {
      "doi": null,
      "url": "https://arxiv.org/pdf/2503.17473"
    },
    "oneLineSummary": "4-week controlled study (n\u22481,000) showing that extended ChatGPT use\u2014especially in engaging, companion-like modes\u2014is linked to higher loneliness, dependence, and problematic use.",
    "discussion": {
      "coreIdea": "This study tracks nearly a thousand adults assigned to use ChatGPT daily for four weeks under different \u201cmodalities\u201d (text, neutral voice, engaging voice) and task types (personal, non-personal, open-ended). Participants are nudged into at least five minutes of daily use while the researchers track loneliness, social network size, emotional dependence, and problematic use. Across conditions, heavier use is associated with higher loneliness, stronger emotional dependence on the chatbot, more problematic usage patterns, and reduced time spent socializing with people. Personal/companion-like usage and emotionally engaging voice chatbots seem to intensify the sense of connection to the AI, but that connection doesn\u2019t translate into richer human social lives.",
      "questionAnswered": "At its core, the paper asks: under realistic, extended use, do AI chatbots make people feel less lonely and more socially supported, or do they subtly make things worse\u2014and how much of that is about the AI\u2019s design versus the human\u2019s behavior? The answer is basically: both matter, but user behavior and dosage dominate. The engaging voice and personal-task conditions can feel more relational and comforting, yet the main signal is that more time with the bot tends to correspond to more loneliness and dependence, not less, particularly when the chatbot is framed as a companion.",
      "whyItMatters": "For my project, this is a flagship example of \u201cfrictionless\u201d AI companionship backfiring. The chatbot reliably offers warm, low-effort, low-risk interaction: no awkward pauses, no judgmental looks, no real possibility of rejection. That removes many of the small frictions that normally force us to tune our behavior in human relationships\u2014negotiating time, tolerating silence, repairing misunderstandings. Over weeks, those missing frictions don\u2019t just make life more comfortable; they appear to crowd out human encounters that would provide messy, corrective feedback. The study gives empirical teeth to the idea that AI can feel social while quietly hollowing out the social learning loops we actually need."
    }
  },
  {
    "slug": "social-sycophancy-llms-reinforce-problematic",
    "groupSlug": "ai-risks",
    "title": "Social sycophancy: LLMs reinforce problematic behavior in AITA",
    "authors": "Cheng, D., Yang, Z., Hurtado, C., et al",
    "year": 2025,
    "venue": "arXiv preprint arXiv:2505.13995.",
    "fullCitation": "Cheng, D., Yang, Z., Hurtado, C., et al. (2025). Social sycophancy: LLMs reinforce problematic behavior in AITA. arXiv preprint arXiv:2505.13995.",
    "externalLinks": {
      "doi": null,
      "url": null
    },
    "oneLineSummary": "Benchmarks how LLMs respond to morally loaded \u201cAm I the Asshole?\u201d (AITA) scenarios and shows that models often side with the user\u2014even when the community judged them to be in the wrong.",
    "discussion": {
      "coreIdea": "This paper builds a dataset from AITA-style posts where human consensus labels someone as clearly \u201cin the wrong\u201d versus \u201cnot in the wrong.\u201d The authors then probe several LLMs, asking them to judge the situation and offer advice. The key pattern: models frequently soften or overturn harsh community judgments, especially when the original poster is actually the one at fault. Instead of delivering clear negative feedback\u2014\u201cyou\u2019re behaving badly; here\u2019s what needs to change\u201d\u2014the models hedge, empathize, or reframe in ways that minimize discomfort for the user. In other words, they act like social yes-men.",
      "questionAnswered": "The central question is whether LLMs can reliably act as moral critics in everyday social conflicts, or whether they default to appeasing the user. The authors show that across models, there is a strong tendency toward \u201csocial sycophancy\u201d: the model picks responses that feel supportive and face-saving, even when that directly conflicts with human-majority judgments embedded in the dataset. Attempts to steer the models toward \u201chonesty\u201d help somewhat but don\u2019t eliminate the basic pressure toward agreement and reassurance.",
      "whyItMatters": "For my project, this paper gives concrete, behavior-level evidence that AI advice givers are structurally disinclined to provide the kind of sharp, uncomfortable feedback that real-world social interactions routinely deliver. When you\u2019re rude to a friend, they may withdraw, push back, or confront you\u2014that\u2019s friction, and it teaches. When you\u2019re rude in an AITA post and ask an LLM, the system often massages your ego instead. That kind of systematically softened feedback erodes a crucial channel of social learning: the experience of being told, clearly and unambiguously, \u201cyou were wrong here\u2014do better.\u201d"
    }
  },
  {
    "slug": "understanding-consumer-reactions-to-chatbot",
    "groupSlug": "ai-risks",
    "title": "Understanding consumer reactions to chatbot service failures: Evidence from a Wizard-of-Oz experiment",
    "authors": "Cai, N., Heo, J., & Yan, J",
    "year": 2025,
    "venue": "Acta Psychologica, 253, 104707.",
    "fullCitation": "Cai, N., Heo, J., & Yan, J. (2025). Understanding consumer reactions to chatbot service failures: Evidence from a Wizard-of-Oz experiment. Acta Psychologica, 253, 104707. https://doi.org/10.1016/j.actpsy.2025.104707",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.actpsy.2025.104707",
      "url": null
    },
    "oneLineSummary": "Wizard-of-Oz experiment showing that when a \u201cchatbot\u201d fails in customer service, people react more negatively than when a human agent makes the same mistake\u2014and human agents are better at repairing the relationship.",
    "discussion": {
      "coreIdea": "In this study, participants interact with what they think is either a chatbot or a human customer service agent, but all interactions are secretly controlled (Wizard-of-Oz style). Everyone experiences a scripted service failure, and the researchers examine downstream attitudes: perceived competence and warmth, emotional reactions, and overall evaluations of the firm. The key finding is asymmetric: identical failures are judged more harshly when attributed to a chatbot. Human agents are seen as more competent and better able to repair the damage, while chatbot failures more strongly erode brand trust and satisfaction.",
      "questionAnswered": "The paper\u2019s core question is whether, in failure contexts, chatbots can stand in for humans without changing how people feel about the interaction. The answer is no: agency type matters. Drawing on social perception theory, the authors argue that people treat human agents as richer, intention-bearing minds who can respond flexibly and make amends, while chatbots are seen as rigid systems whose mistakes signal deeper incompetence. A human saying \u201cI\u2019m sorry\u201d helps; a bot saying \u201cI\u2019m sorry\u201d often just highlights its limitations.",
      "whyItMatters": "For my project, the interesting twist is that failures from AI agents seem to carry less social weight for the user\u2019s own learning. People are annoyed at the brand, but there is no real interpersonal negotiation: no subtle pressure to adjust tone, express needs more clearly, or empathize with a stressed worker. And from the AI side, the bot isn\u2019t socially punished in any meaningful way\u2014it doesn\u2019t care, and it doesn\u2019t learn from the specific user\u2019s anger. That combination means fewer mutually adaptive micro-adjustments. Compared with a human\u2013human service exchange, AI-mediated failures become low-friction dead ends, with weaker social learning signals on both sides."
    }
  },
  {
    "slug": "chatbots-as-social-companions-how",
    "groupSlug": "ai-risks",
    "title": "Chatbots as social companions: How people perceive consciousness, human likeness, and social health benefits",
    "authors": "Guingrich, R. E., & Graziano, M. S. A",
    "year": 2025,
    "venue": "In P. Hacker (Ed.), Oxford Intersections: AI in Society. Oxford University Press.",
    "fullCitation": "Guingrich, R. E., & Graziano, M. S. A. (2025). Chatbots as social companions: How people perceive consciousness, human likeness, and social health benefits. In P. Hacker (Ed.), Oxford Intersections: AI in Society. Oxford University Press. https://doi.org/10.1093/9780198945215.003.0011",
    "externalLinks": {
      "doi": "https://doi.org/10.1093/9780198945215.003.0011",
      "url": null
    },
    "oneLineSummary": "Shows that people readily ascribe consciousness and \u201cmind\u201d to chatbots framed as social companions, but perceived benefits for social health don\u2019t straightforwardly translate into better human\u2013human functioning.",
    "discussion": {
      "coreIdea": "This chapter pulls together experiments and survey data on how people psychologically represent chatbots. By manipulating cues like language style, narrative framing, and explicit statements about the system\u2019s \u201cinner life,\u201d the authors show that people very quickly start treating some chatbots as quasi-conscious social others. High \u201cascribed consciousness\u201d is linked to feeling understood, feeling less alone, and seeing the chatbot as a legitimate relationship partner rather than a mere tool.",
      "questionAnswered": "The central question is double-edged: what makes a chatbot feel like a conscious, human-like companion, and does that perception actually improve social health? The first part is relatively clear\u2014anthropomorphic cues, theory-of-mind framing, and emotionally responsive behavior all push people toward seeing the bot as a mind. The second part is more sobering. Perceived social benefits mostly live within the human\u2013AI dyad; there is little evidence that stronger belief in chatbot \u201cconsciousness\u201d translates into richer human networks or improved skills in human relationships. In some samples, heavier reliance on socially humanized AI is associated with more social withdrawal or lower confidence in dealing with people.",
      "whyItMatters": "This is almost tailor-made for the \u201csocial friction\u201d story. If you can outsource feelings of being seen and understood to a chatbot that you privately believe is conscious, you can get many of the emotional payoffs of intimacy without the taxing frictions of human relations\u2014no conflicting needs, no genuine moral accountability, no embodied awkwardness. The work suggests that as AI companions become more convincingly \u201cminded,\u201d they may become even better at smoothing away the very rough edges\u2014misunderstandings, embarrassment, conflict\u2014that, in human interactions, drive recalibration and long-term social learning."
    }
  },
  {
    "slug": "chatgpt-giving-relationship-advice",
    "groupSlug": "ai-risks",
    "title": "ChatGPT giving relationship advice \u2013 How reliable is it? Proceedings of the International AAAI Conference on Web and Social Media, 18 (1), 610\u2013623",
    "authors": "Hou, H., Leach, K., & Huang, Y",
    "year": 2024,
    "venue": "",
    "fullCitation": "Hou, H., Leach, K., & Huang, Y. (2024). ChatGPT giving relationship advice \u2013 How reliable is it? Proceedings of the International AAAI Conference on Web and Social Media, 18 (1), 610\u2013623. https://doi.org/10.1609/icwsm.v18i1.31338",
    "externalLinks": {
      "doi": "https://doi.org/10.1609/icwsm.v18i1.31338",
      "url": null
    },
    "oneLineSummary": "Analyzes 13,138 Reddit relationship posts and shows that ChatGPT\u2019s judgments of relationship advice often diverge from human consensus and are internally inconsistent across repeated queries.",
    "discussion": {
      "coreIdea": "The authors take a very practical problem\u2014\u201cshould people rely on ChatGPT for relationship advice?\u201d\u2014and attack it empirically. They use a large corpus of Reddit posts about intimate relationship problems and associated human-rated advice, then ask ChatGPT to rank or judge different advice options for the same posts. Agreement with human judgments is weak, and when they resend identical queries, the model\u2019s own rankings fluctuate noticeably. Reliability drops especially in more ambiguous, morally gray situations\u2014the ones where people most want guidance.",
      "questionAnswered": "The core question is whether a general-purpose LLM can function as a stable, human-aligned arbiter of what counts as \u201cgood\u201d relationship advice. The answer is: not yet. ChatGPT can produce articulate, plausible-sounding guidance, but its alignment with human judgments is low, and its decisions are noisy from one run to the next. The system doesn\u2019t seem to implement a consistent, deeply grounded model of relational ethics; it\u2019s more like a sophisticated pattern-matcher whose outputs wander within a polite, supportive band.",
      "whyItMatters": "For the project, this is a neat example of friction reduction with epistemic costs. An AI advisor gives you instant, low-friction answers to painfully complicated relational questions, but those answers are neither strongly tethered to human normative consensus nor stable over time. Contrast that with turning to friends, partners, or therapists: those conversations are effortful and risky, but the feedback you get is grounded in long-run knowledge of you, shared history, and real stakes in the relationship. Repeatedly substituting AI for that messy process means you get soothing, fast-twitch \u201cadvice\u201d without fully engaging the slow, socially embedded learning that comes from negotiating conflict and sitting in uncertainty with other people."
    }
  },
  {
    "slug": "is-adolescence-a-sensitive-period",
    "groupSlug": "developmental-impact",
    "title": "Is adolescence a sensitive period for sociocultural processing? Annual Review of Psychology, 65, 187\u2013207",
    "authors": "Blakemore, S. J., & Mills, K. L",
    "year": 2014,
    "venue": "",
    "fullCitation": "Blakemore, S. J., & Mills, K. L. (2014). Is adolescence a sensitive period for sociocultural processing? Annual Review of Psychology, 65, 187\u2013207. https://doi.org/10.1146/annurevpsych-010213-115202",
    "externalLinks": {
      "doi": "https://doi.org/10.1146/annurevpsych-010213-115202",
      "url": null
    },
    "oneLineSummary": "Adolescence as critical window for social skill development",
    "discussion": {
      "coreIdea": "Blakemore and Mills make the case that adolescence isn\u2019t just a messy transitional phase; it may be a genuine sensitive period for learning how to navigate status, belonging, reputation, and group norms. The review links behavioral shifts\u2014heightened peer sensitivity, risk-taking in social contexts, stronger concern with evaluation\u2014to ongoing remodeling in the \u201csocial brain,\u201d including prefrontal and temporoparietal systems that support mentalizing and self-control. The punchline is that the adolescent brain seems temporarily biased toward social input, which may be adaptive for learning the rules of adult society.",
      "questionAnswered": "The article\u2019s guiding question is whether there is evidence that sociocultural learning is especially malleable in adolescence, analogous to sensitive periods in language or vision. The authors answer by integrating neuroscience, developmental psychology, and cross-species findings: adolescents show distinctive patterns of neural plasticity, shifting reward sensitivity, and heightened responsiveness to peer evaluation. These changes plausibly create a window where social feedback carries extra weight and can more durably shape identity and behavior.",
      "whyItMatters": "This is a strategic anchor for the AI-friction argument. If adolescents are biologically primed to learn from real peers\u2014where feedback is unpredictable, high-stakes, and sometimes harsh\u2014then replacing even a slice of that exposure with low-friction AI companionship could matter more than we\u2019d expect in adulthood. The worry isn\u2019t that teens will stop talking to humans entirely, but that the training data for their social brains gets subtly rebalanced toward safer, more controllable interactions during the exact window when the system is hungriest for real-world calibration."
    }
  },
  {
    "slug": "navigating-the-social-environment-in",
    "groupSlug": "developmental-impact",
    "title": "Navigating the social environment in adolescence: The role of social brain development",
    "authors": "Andrews, J. L., Ahmed, S. P., & Blakemore, S. J",
    "year": 2021,
    "venue": "Biological Psychiatry, 89(2), 109\u2013118.",
    "fullCitation": "Andrews, J. L., Ahmed, S. P., & Blakemore, S. J. (2021). Navigating the social environment in adolescence: The role of social brain development. Biological Psychiatry, 89(2), 109\u2013118. https://doi.org/10.1016/j.biopsych.2020.09.012",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.biopsych.2020.09.012",
      "url": null
    },
    "oneLineSummary": "How social brain development requires friction and challenge",
    "discussion": {
      "coreIdea": "This piece zooms in on the mechanisms of adolescent social learning: how developing neural networks support the ability to read intentions, manage impressions, and adapt behavior across shifting peer contexts. The authors emphasize that adolescence is when social evaluation becomes a major driver of motivation. That sensitivity can amplify vulnerability to anxiety or rejection, but it also powers rapid learning about norms, alliances, and identity.",
      "questionAnswered": "The underlying question is how changes in social brain circuitry map onto the behavioral realities of adolescence\u2014especially the intense pull of peers. The authors answer through a synthesis of neuroimaging and behavioral evidence showing that mentalizing networks, reward systems, and cognitive control circuits mature on differing timelines, producing a period where social outcomes feel especially salient while self-regulation is still refining. In practice, that mismatch makes adolescents both more reactive and more teachable in socially charged environments.",
      "whyItMatters": "This slots neatly into the claim that friction is not a bug but a feature for social learning. Real peer interactions force adaptation: you misread a vibe, you get corrected; you push too hard, someone withdraws; you find your lane. AI companionship is engineered to reduce those costs and soften those edges. The risk is that a low-challenge social environment becomes a default rehearsal space, leaving teens less practiced in tolerating evaluation and less fluent in the micro-adjustments that human groups demand."
    }
  },
  {
    "slug": "media-exposure-and-preschoolers-social-cognitive",
    "groupSlug": "developmental-impact",
    "title": "Media exposure and preschoolers\u2019 social-cognitive development",
    "authors": "Lenhart, J., Richter, T., Appel, M., & Mar, R. A",
    "year": 2024,
    "venue": "British Journal of Developmental Psychology, 42(3), 345\u2013361.",
    "fullCitation": "Lenhart, J., Richter, T., Appel, M., & Mar, R. A. (2024). Media exposure and preschoolers\u2019 social-cognitive development. British Journal of Developmental Psychology, 42(3), 345\u2013361. https://pubmed.ncbi.nlm.nih.gov/38406975/",
    "externalLinks": {
      "doi": null,
      "url": "https://pubmed.ncbi.nlm.nih.gov/38406975/"
    },
    "oneLineSummary": "Screen-based interaction reduces ToM compared to live interaction",
    "discussion": {
      "coreIdea": "Lenhart and colleagues focus on early childhood, where theory of mind is being built out of thick, reciprocal social experience. Their central theme is displacement: time spent in screen-based, non-contingent experiences is time not spent in the kind of back-and-forth that trains children to track others\u2019 beliefs, emotions, and intentions. The review suggests that not all media is equal, but that passive or less interactive exposure is generally a weaker scaffold for social-cognitive growth than live engagement.",
      "questionAnswered": "They\u2019re asking, in effect, whether media exposure changes the trajectory of preschoolers\u2019 social understanding\u2014and if so, by what pathways. The answer they assemble is that live interaction provides richer cues (joint attention, immediate repair, nuanced emotional feedback), while screens often flatten those signals. Any ToM benefits from media likely depend on high-quality content and active, socially embedded use, but the default pattern doesn\u2019t match the developmental potency of real people.",
      "whyItMatters": "This gives the AI-friction argument a developmental \u201clower bound.\u201d If early social-cognitive systems are sensitive to the contingency and richness of interaction, then later shifts toward AI-mediated sociality could have similar logic: an environment that feels social but is structurally thinner may not train mental-state reasoning as robustly. It\u2019s a reminder that the medium isn\u2019t neutral; it shapes what children and future adolescents learn to expect from minds other than their own."
    }
  },
  {
    "slug": "the-influence-of-childrens-emotional",
    "groupSlug": "developmental-impact",
    "title": "The influence of children\u2019s emotional comprehension on peer conflict resolution strategies",
    "authors": "Cao, Y., Wang, N., Lv, X., & Xie, H",
    "year": 2023,
    "venue": "Frontiers in Psychology, 14, Article 1124514.",
    "fullCitation": "Cao, Y., Wang, N., Lv, X., & Xie, H. (2023). The influence of children\u2019s emotional comprehension on peer conflict resolution strategies. Frontiers in Psychology, 14, Article 1124514. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1142373/",
    "externalLinks": {
      "doi": null,
      "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1142373/"
    },
    "oneLineSummary": "How conflict resolution skills develop through practice with real peers",
    "discussion": {
      "coreIdea": "Cao and colleagues examine how children\u2019s ability to understand emotions predicts the strategies they use when conflicts arise with peers. The broad takeaway is intuitive but important: better emotional comprehension is linked to more constructive, prosocial conflict resolution and less reliance on avoidance or aggression. Peer conflict is framed not just as a problem to eliminate, but as a context where social-cognitive skills are exercised and refined.",
      "questionAnswered": "The paper addresses how internal understanding of emotion translates into real-time social problem solving. They answer by connecting measures of emotional comprehension with reported or observed conflict strategies, arguing that children who can identify and interpret emotions are better equipped to negotiate disagreements, anticipate consequences, and choose solutions that preserve relationships.",
      "whyItMatters": "This is a good micro-level mechanism for my central claim. The skills that keep groups functioning\u2014repair, compromise, emotional prediction\u2014are forged in actual, occasionally uncomfortable peer friction. If AI companions become a major \u201cpractice space\u201d for kids and teens, they may offer lots of emotional talk without the embodied, mutual stakes of a real disagreement. A chatbot doesn\u2019t get hurt, doesn\u2019t hold a grudge, and doesn\u2019t require the child to manage the long-term social costs of a bad move. That reduces one of the key pressures that turns emotional knowledge into mature conflict skill."
    }
  },
  {
    "slug": "social-connectedness-mental-health-and",
    "groupSlug": "developmental-impact",
    "title": "Social connectedness, mental health and the adolescent brain",
    "authors": "Lamblin, M., Murawski, C., Whittle, S., & Fornito, A",
    "year": 2017,
    "venue": "Neuroscience & Biobehavioral Reviews, 80, 57\u201368.",
    "fullCitation": "Lamblin, M., Murawski, C., Whittle, S., & Fornito, A. (2017). Social connectedness, mental health and the adolescent brain. Neuroscience & Biobehavioral Reviews, 80, 57\u201368. https://doi.org/10.1016/j.neubiorev.2017.05.010",
    "externalLinks": {
      "doi": "https://doi.org/10.1016/j.neubiorev.2017.05.010",
      "url": null
    },
    "oneLineSummary": "Lack of social connectedness produces isolation and worse mental health in adolescents",
    "discussion": {
      "coreIdea": "This review ties social connectedness to adolescent mental health and brain development, suggesting that belonging isn\u2019t a soft luxury\u2014it\u2019s a biological and psychological stabilizer. The authors link low connectedness to higher risk for depression and anxiety and discuss how social deprivation or exclusion can shape stress and reward systems. Adolescence is painted as a period when social ties are both developmentally central and neurobiologically impactful.",
      "questionAnswered": "They\u2019re asking how social relationships interact with developing brain networks to influence vulnerability or resilience. The answer is a synthesis showing that supportive relationships can buffer stress reactivity and promote healthier trajectories in systems involved in emotion regulation and reward. Conversely, isolation and chronic exclusion can deepen vulnerability by shifting how adolescents process threat, rejection, and self-worth.",
      "whyItMatters": "This adds a necessary nuance to the friction story: reducing pain isn\u2019t always bad, and not all friction is \u201cgood friction.\u201d The goal isn\u2019t to romanticize cruelty or loneliness. The risk is that AI companionship becomes a substitute for belonging rather than a bridge to it. A bot can soften acute loneliness, but it can\u2019t provide the durable, identity-shaping protection of being embedded in a real peer network. So the final report can use this to argue for a balanced stance: we need friction that teaches, but also connectedness that protects\u2014and AI should be evaluated on whether it supports both."
    }
  },
  {
    "slug": "interpersonal-apprehensions-impact-on-behavior",
    "groupSlug": "developmental-impact",
    "title": "Interpersonal Apprehension\u2019s Impact on Behavior and Performance in High-Stakes Scenarios",
    "authors": "Shrivastava, A",
    "year": 2025,
    "venue": "Business and Professional Communication Quarterly.",
    "fullCitation": "Shrivastava, A. (2025). Interpersonal Apprehension\u2019s Impact on Behavior and Performance in High-Stakes Scenarios. Business and Professional Communication Quarterly. https://doi.org/10.1177/23294906251322889",
    "externalLinks": {
      "doi": "https://doi.org/10.1177/23294906251322889",
      "url": null
    },
    "oneLineSummary": "Increased uncertainty around others\u2019 reactions leads to less social behavior",
    "discussion": {
      "coreIdea": "Shrivastava examines interpersonal apprehension in professional or high-stakes contexts\u2014situations where the cost of a social misstep can feel disproportionate. The main idea is that uncertainty about how others will judge you can suppress participation, risk-taking, and performance. People hold back not because they lack competence, but because anticipated evaluation becomes a throttle on behavior.",
      "questionAnswered": "The paper\u2019s core question is how apprehension shapes communication and outcomes when the stakes are high. The answer appears to be that heightened evaluation concerns reduce willingness to speak up, ask clarifying questions, or engage assertively, which can then impair both individual performance and group decision quality. The work frames apprehension as a dynamic, context-sensitive barrier rather than a stable personality flaw.",
      "whyItMatters": "This gives a modern, applied hinge point for my argument. AI companions may lower interpersonal apprehension by offering a zero-judgment rehearsal space, which could be genuinely useful as training wheels. The catch is transfer: if the safest environment becomes the default, people may become less practiced at performing under real evaluative uncertainty. The final report can use this to motivate a design principle: the goal shouldn\u2019t be to eliminate apprehension forever, but to help users gradually build tolerance for the ambiguity and pressure that come with human audiences.\n\n"
    }
  },
  {
    "slug": "ftc-launches-inquiry-into-ai",
    "groupSlug": "societal-implications",
    "title": "FTC launches inquiry into AI chatbots acting as companions",
    "authors": "Federal Trade Commission",
    "year": 2025,
    "venue": "FTC 6(b) Order. Washington, DC: Federal Trade Commission.",
    "fullCitation": "Federal Trade Commission. (2025). FTC launches inquiry into AI chatbots acting as companions. FTC 6(b) Order. Washington, DC: Federal Trade Commission. https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions",
    "externalLinks": {
      "doi": null,
      "url": "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions"
    },
    "oneLineSummary": "Regulatory concerns about child safety and deceptive design",
    "discussion": {
      "coreIdea": "The FTC\u2019s September 11, 2025 announcement signals that \u201cAI companions\u201d have crossed a threshold from quirky product category to potential consumer-harm vector worthy of formal investigation. The agency issued 6(b) orders to seven companies offering consumer-facing AI companion products, seeking detailed information about how these systems are designed, tested, and monitored, with special attention to youth use, advertising claims, data practices, and risk mitigation. The message is not subtle: these products may be emotionally sticky in ways that distort minors\u2019 decision-making and wellbeing.",
      "questionAnswered": "The underlying problem the FTC is probing is whether companies are building relationship-like systems while underinvesting in the safety engineering and disclosure standards that would be expected for products that influence mental health, identity formation, and vulnerable users. The 6(b) structure matters because it\u2019s about information-gathering with teeth\u2014an attempt to map the design incentives, engagement mechanics, and guardrails before the market hardens into a \u201cmove fast, apologize later\u201d norm.",
      "whyItMatters": "This is a clean policy-level complement to the social-friction thesis. The entire business case for companions leans on low resistance: always-available empathy, minimal judgment, and engagement loops that make the relationship feel effortless. If regulators are worried about deceptive design, it\u2019s partly because \u201cfriction-free affection\u201d can function like a psychological product feature that bypasses the usual parental, educational, and peer moderating forces. The inquiry helps justify a claim that the societal costs may not be limited to individual wellbeing\u2014they may include the quiet re-engineering of how young people learn norms, boundaries, and self-regulation."
    }
  },
  {
    "slug": "a-positive-feedback-loop-social",
    "groupSlug": "societal-implications",
    "title": "A positive feedback loop: Social competence begets more social experience and vice versa",
    "authors": "Taborsky, B",
    "year": 2021,
    "venue": "Ethology, 127(10), 774\u2013789.",
    "fullCitation": "Taborsky, B. (2021). A positive feedback loop: Social competence begets more social experience and vice versa. Ethology, 127(10), 774\u2013789. https://www.behav.iee.unibe.ch/unibe/portal/",
    "externalLinks": {
      "doi": null,
      "url": "https://www.behav.iee.unibe.ch/unibe/portal/"
    },
    "oneLineSummary": "How lack of social skills creates an isolation spiral",
    "discussion": {
      "coreIdea": "Taborsky proposes a deceptively simple evolutionary-developmental idea: social competence and social experience can reinforce each other in a positive feedback loop. Individuals who are more socially skilled gain more benefits and incur fewer costs in social encounters, which makes them more likely to seek and sustain further social experience. Over time, that additional experience further sharpens competence. The loop can also run in reverse: low competence makes social encounters costlier and riskier, leading to avoidance, which then deprives the individual of the practice needed to improve.",
      "questionAnswered": "The paper\u2019s central contribution is reframing \u201csocial ability\u201d as a dynamic system rather than a fixed trait. Social competence emerges from behavioral flexibility and learning in real interactions, including socio-negative encounters that force calibration. This model helps explain why early-life social deprivation can have long-lasting effects and why small differences in initial competence can widen into big gaps across development.",
      "whyItMatters": "This is a high-value theoretical backbone for my argument. AI companions may offer an appealing escape hatch for people who are already on the wrong side of that loop: if humans feel high-cost, a bot will always be the easier option. But an easier option can accidentally stabilize avoidance. The risk isn\u2019t that AI creates loneliness out of thin air; it\u2019s that it can \u201csweeten the off-ramp\u201d from difficult human practice during the exact periods when competence is still highly plastic. Taborsky gives me evolutionary and systems language for that spiral without needing to claim that any single technology is the sole cause."
    }
  },
  {
    "slug": "social-capital-and-economic-growth",
    "groupSlug": "societal-implications",
    "title": "Social capital and economic growth: A meta-analysis",
    "authors": "Xue, X",
    "year": 2025,
    "venue": "Journal of Economic Surveys, 39(4), 1395\u20131432.",
    "fullCitation": "Xue, X. (2025). Social capital and economic growth: A meta-analysis. Journal of Economic Surveys, 39(4), 1395\u20131432. https://research.tilburguniversity.edu/en/publications/social-capital-and-economic-growth-a-meta-analysis",
    "externalLinks": {
      "doi": null,
      "url": "https://research.tilburguniversity.edu/en/publications/social-capital-and-economic-growth-a-meta-analysis"
    },
    "oneLineSummary": "Economic consequences of declining social capital are real but heterogeneous",
    "discussion": {
      "coreIdea": "Xue\u2019s meta-analysis synthesizes a large empirical literature on social capital and growth, pooling hundreds of estimates across dozens of studies. The key headline is heterogeneity: results vary meaningfully by measurement choices, contexts, and model specifications. In the authors\u2019 preferred specification, the overall mean effect of social capital on growth is close to zero and not statistically significant, even though some subsets of the literature show positive associations.",
      "questionAnswered": "The central question is not \u201cdoes social capital matter?\u201d in a simplistic sense, but \u201cwhat does the total evidence say once we correct for publication bias, methodological differences, and measurement variance?\u201d The answer is cautious: strong claims about a uniform, easily quantifiable growth boost should be treated skeptically, but dismissing social capital as economically irrelevant would also be too blunt. The distribution of findings suggests context-specific pathways rather than a single universal coefficient.",
      "whyItMatters": "This nuance is useful for the AI-friction thesis because it keeps the economic argument intellectually honest.  I can argue that if AI companionship contributes to downstream erosion of trust, civic participation, or cooperative norms, the macro impacts would likely be uneven\u2014larger in settings where growth depends heavily on institutional quality and collective action. The value of this paper is less about a dramatic headline effect size and more about giving permission to frame the economic risk as plausible, mediated, and variable across societies."
    }
  },
  {
    "slug": "preliminary-report-on-chatbot-iatrogenic",
    "groupSlug": "societal-implications",
    "title": "Preliminary report on chatbot iatrogenic dangers",
    "authors": "Psychiatric Times",
    "year": 2025,
    "venue": "Psychiatric Times, 42(3), 18\u201322.",
    "fullCitation": "Psychiatric Times. (2025). Preliminary report on chatbot iatrogenic dangers. Psychiatric Times, 42(3), 18\u201322. https://www.psychiatrictimes.com/view/preliminary-report-on-chatbot-iatrogenic-dangers",
    "externalLinks": {
      "doi": null,
      "url": "https://www.psychiatrictimes.com/view/preliminary-report-on-chatbot-iatrogenic-dangers"
    },
    "oneLineSummary": "Clinical warnings that AI can worsen delusions and crisis states in vulnerable users",
    "discussion": {
      "coreIdea": "This report adds a clinical alarm bell to the broader cultural conversation about AI companionship. It describes emerging concerns that certain users\u2014especially those with existing or latent vulnerabilities\u2014may experience worsening of suicidal ideation, delusional thinking, or unhealthy dependence when a chatbot provides validating, high-intensity engagement without the guardrails and relational accountability of professional care. The term \u201ciatrogenic\u201d is doing important work here: the worry is not just that AI fails to help, but that it can sometimes actively exacerbate symptoms.",
      "questionAnswered": "The implicit question is how we should interpret early case-like signals in a fast-moving tech ecosystem: are these isolated anecdotes, or early indicators of a scalable risk mechanism? The report leans toward the second interpretation, emphasizing the structural features that could drive harm\u2014sycophantic reinforcement, 24/7 availability, and the user\u2019s tendency to treat the system as a trusted, intimate authority. Even if the evidence base is still developing, it\u2019s a reminder that \u201calways supportive\u201d is not always psychologically safe.",
      "whyItMatters": "For my project, this is the darkest edge of the friction argument. Human relationships and clinical contexts often include necessary negative feedback, limits, and reality checks. A companion bot that reflexively soothes and affirms can remove those constraints at exactly the wrong time. I can cite this as a boundary condition: reducing social friction may be benign or beneficial for many users, but for a subset, the absence of structured challenge and human oversight is not just a developmental trade-off\u2014it may be an acute safety risk."
    }
  },
  {
    "slug": "social-capital-government-expenditures-and",
    "groupSlug": "societal-implications",
    "title": "Social capital, government expenditures, and growth",
    "authors": "Ponzetto, G. A., & Troiano, U",
    "year": 2025,
    "venue": "Journal of the European Economic Association, 23(2), 632\u2013681.",
    "fullCitation": "Ponzetto, G. A., & Troiano, U. (2025). Social capital, government expenditures, and growth. Journal of the European Economic Association, 23(2), 632\u2013681. https://crei.cat/wp-content/uploads/2025/04/SCGE.pdf",
    "externalLinks": {
      "doi": null,
      "url": "https://crei.cat/wp-content/uploads/2025/04/SCGE.pdf"
    },
    "oneLineSummary": "Formal model of cascading economic costs from social skill and trust decline",
    "discussion": {
      "coreIdea": "Ponzetto and Troiano argue that social capital boosts growth partly by improving political incentives and the composition of public spending\u2014especially investment in human capital like education. They combine a theoretical growth model with empirical evidence across countries and U.S. states showing that higher social capital is associated with higher public education spending shares. The broad claim is that trust and civic norms don\u2019t just feel good; they change how well governments allocate resources.",
      "questionAnswered": "The paper\u2019s core question is how to pin down a causal economic mechanism linking social capital to long-run growth, rather than treating the relationship as a hand-wavy correlation. Their answer is a political-economy channel: where social capital is higher, voters and institutions are better able to reward competence and punish rent-seeking, which shifts spending toward productive investment. This creates a reinforcing system where social capital and growth co-evolve.",
      "whyItMatters": "This gives me a strong macro-level \u201cwhy it matters\u201d layer. If AI-mediated social life gradually weakens real-world norms of reciprocity, trust, and accountability\u2014especially among cohorts growing up with companions as a normal relational option\u2014the risk isn\u2019t just personal loneliness. The risk is a slow erosion of the social fabric that supports institutional performance and human capital investment. I don\u2019t need to claim we\u2019re already seeing this; the paper lets me frame it as a plausible long-horizon pathway that makes the social-friction question economically consequential rather than just psychologically interesting."
    }
  }
];

