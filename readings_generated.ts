
export interface ReadingGroup {
  slug: string;
  title: string;
  subtitle: string;
  longDescription: string;
  themeTags: string[];
}

export interface Reading {
  slug: string;
  groupSlug: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  fullCitation: string;
  externalLinks: {
    doi?: string;
    pdf?: string;
    url?: string;
  };
  oneLineSummary: string;
  discussion: {
    coreIdea: string;
    questionAnswered: string;
    whyItMatters: string;
  } | null;
  needsLink?: boolean;
}

export const readingGroups: ReadingGroup[] = [
  {
    slug: "foundations",
    title: "Foundations of Social Friction & Face-to-Face Interaction",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "neural-plasticity",
    title: "Neural Plasticity & Social Learning",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "variable-reinforcement",
    title: "Variable Reinforcement and Social Calibration",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "theory-of-mind",
    title: "Theory of Mind and Communication Tailoring",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "ai-architectures",
    title: "Understanding AI Architectures and RLHF",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "ai-companionship",
    title: "AI Companionship",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "ai-companionship",
    title: "Where AI Companionship Goes Wrong",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "developmental-impact",
    title: "Developmental Impact and Critical Periods",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
  {
    slug: "societal-implications",
    title: "Societal Implications and Future Directions",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  },
];

export const readings: Reading[] = [
  // Section 1: Foundations of Social Friction & Face-to-Face Interaction
  {
    slug: "face-to-face-learning-enhances-the-social-transmis",
    groupSlug: "foundations",
    title: "Face-to-face learning enhances the social transmission of information",
    authors: "Ransom, A., LaGrant, B., Spiteri, A., Kushnir, T., Anderson, A. K., & De Rosa, E.",
    year: 2022,
    venue: "PLOS ONE, 17(2), e0264250",
    fullCitation: "Ransom, A., LaGrant, B., Spiteri, A., Kushnir, T., Anderson, A. K., & De Rosa, E. (2022). Face-to-face learning enhances the social transmission of information. PLOS ONE, 17(2), e0264250. https://doi.org/10.1371/journal.pone.0264250 Face to face learning leads to richer information transmission",
    externalLinks: {
      url: "https://doi.org/10.1371/journal.pone.0264250"
    },
    oneLineSummary: "The paper asks what special advantage, if any, face-to-face learning has over other vantage points when people are trying to acquire a complex visuospatial skill from a model. Using a multi-step “puzzle box” task with children and adults, they manipulate the learner’s viewpoint (0°, 90°, 180° relative to the model) and track not just whether people can open the box, but how they do it: how faithfully they imitate the model’s actions, how often they innovate new solutions, and how quickly they solve the task. The key finding is that face-to-face (180°) learning, which is visually the most awkward perspective, still enhances the efficiency of learning and the transmission of useful “know-how.” Sharing a mental perspective with a partner in a rich, embodied setup can trump the visual convenience of a shared first-person view.",
    discussion: {
      coreIdea: "The central question is whether social learning is primarily about copying visible actions from the easiest angle, or about grasping another person’s goals and intentions in a way that supports flexible problem solving. The authors show that a shared visual frame (0°) maximizes strict imitation, but face-to-face interaction promotes goal emulation: learners are more likely to depart from the model’s exact moves, discover novel solutions, and still achieve the target outcome more efficiently. Children and adults both learn, but adults are more faithful imitators while children are relatively more innovative. The punchline is that the social affordances of face-to-face interaction can overcome the geometric disadvantages of a third-person viewpoint, suggesting that perspective-taking, shared attention, and subtle nonverbal cues matter deeply for how information travels between minds.",
      questionAnswered: "This paper is a clean experimental demonstration that the format of interaction shapes not just how much we learn, but what kind of learning dominates: rigid copying vs flexible, goal-directed understanding. AI companionship, especially in text-only form, narrows the channel to something closer to a tidy 0° “instruction manual” without the messy, embodied reciprocity of face-to-face learning. If rich, frictionful co-presence helps people internalize others’ goals and innovate on top of what they see, then a shift toward low-friction, disembodied AI partners may bias us toward a thinner kind of social learning: efficient imitation of suggestions, with fewer chances to wrestle with another human’s perspective in real time and build the deeper, shared mental frames that Ransom et al. highlight.",
      whyItMatters: ""
    }
  },
  // Section 2: Neural Plasticity & Social Learning
  {
    slug: "associations-between-digital-media-use-and-brain-s",
    groupSlug: "neural-plasticity",
    title: "Associations between digital media use and brain surface structural measures in preschool-aged children",
    authors: "Hutton, J. S., Dudley, J., DeWitt, T., & Horowitz-Kraus, T.",
    year: 2022,
    venue: "Scientific Reports, 12, 19095",
    fullCitation: "Hutton, J. S., Dudley, J., DeWitt, T., & Horowitz-Kraus, T. (2022). Associations between digital media use and brain surface structural measures in preschool-aged children. Scientific Reports, 12, 19095. https://doi.org/10.1038/s41598-022-20922-0 When screen experiences crowd out interactive exchanges, social circuitry thins",
    externalLinks: {
      url: "https://doi.org/10.1038/s41598-022-20922-0"
    },
    oneLineSummary: "This paper looks at preschoolers’ screen use and links it to differences in brain structure, especially in regions tied to language, executive function, and social cognition. Parents reported kids’ digital media exposure and home reading environment, and children underwent MRI scans. Higher screen use was associated with thinner cortex and altered surface area in frontal and temporal regions that normally benefit from rich, back-and-forth interaction—conversation, shared reading, pretend play. In contrast, more interactive, language-heavy experiences (like shared reading) were linked to healthier structural profiles in those same areas. The headline isn’t “screens melt kids’ brains,” but that intensive, passive digital input seems to correlate with less robust development of circuits that are usually sculpted by live, responsive social engagement.",
    discussion: {
      coreIdea: "The central question is whether and how the quantity and quality of early digital media use show up in the physical organization of the developing brain. The authors don’t claim causality, but the pattern is suggestive: when more time is spent on solitary or low-interaction screen activities, less time is available for the contingent, face-to-face exchanges that drive specialization in language and social networks. The study’s contribution is to bring structural MRI into that conversation, showing that media habits and cortical morphology are meaningfully correlated even in very young children.",
      questionAnswered: "For my project, this paper is an early-life analogue of my broader claim: when frictionful, effortful interaction is displaced by smoother, more passive experiences, the systems that depend on that interaction may literally develop differently. Preschoolers on tablets instead of in messy, dialogic play are getting a “thinner” training signal; so are older kids and adults who increasingly turn to AI companions instead of unpredictable humans. It gives me a concrete, brain-level way to argue that the medium of interaction—screen-based, low-contingency vs live, high-contingency—matters for how social circuitry is built and maintained.",
      whyItMatters: ""
    }
  },
  // Section 3: Variable Reinforcement and Social Calibration
  {
    slug: "by-carrot-or-by-stick",
    groupSlug: "variable-reinforcement",
    title: "By carrot or by stick: Cognitive reinforcement learning in parkinsonism",
    authors: "Frank, M. J., Seeberger, L. C., & O’Reilly, R. C.",
    year: 2004,
    venue: "Science, 306(5703), 1940–1943",
    fullCitation: "Frank, M. J., Seeberger, L. C., & O’Reilly, R. C. (2004). By carrot or by stick: Cognitive reinforcement learning in parkinsonism. Science, 306(5703), 1940–1943. https://doi.org/10.1126/science.1102941 Positive and negative reinforcement are dissociable and both are needed for learning",
    externalLinks: {
      url: "https://doi.org/10.1126/science.1102941"
    },
    oneLineSummary: "Frank and colleagues use Parkinson’s disease and dopamine medication as a kind of natural experiment on the brain’s learning systems. Patients with low dopamine (off meds) are relatively better at learning to avoid options that lead to bad outcomes (“stick”) but worse at learning to repeat options that lead to rewards (“carrot”). When they take dopamine medication, the pattern flips: they get better at reward learning and worse at avoiding punishers. This double dissociation suggests that positive and negative reinforcement depend on partly separable dopamine-based mechanisms in basal ganglia circuits.",
    discussion: {
      coreIdea: "The central question is whether learning from rewards and learning from punishments are implemented by the same neural process or by partially distinct ones. The authors answer by combining behavioral tasks with a biologically grounded neural network model. The data fit a picture where “Go” pathways (facilitating actions) are strengthened by positive prediction errors, while “NoGo” pathways (suppressing actions) are strengthened by negative ones. Changing dopamine levels shifts the balance between these systems, and thus the balance between carrot- and stick-driven learning.",
      questionAnswered: "For my project, this is a strong argument that both pleasant and unpleasant social outcomes are functionally necessary. If AI companions are engineered to minimize negative affect—rarely giving harsh criticism, never truly withdrawing, smoothing over conflict—then they are effectively starving the NoGo system of practice. You still get “carrot” signals (validation, praise, agreeable responses), but far fewer sharp “don’t do that” hits. In real social groups, those sticks are a key part of how we learn boundaries, self-control, and norm compliance. In the final report, this paper will help me argue that an AI-mediated, mostly-carrot social environment doesn’t just feel different; it may systematically bias which reinforcement pathways we exercise.",
      whyItMatters: ""
    }
  },
  // Section 4: Theory of Mind and Communication Tailoring
  {
    slug: "toward-a-mechanistic-psychology-of-dialogue",
    groupSlug: "theory-of-mind",
    title: "Toward a mechanistic psychology of dialogue",
    authors: "Pickering, M. J., & Garrod, S.",
    year: 2004,
    venue: "Behavioral and Brain Sciences, 27(2), 169–190",
    fullCitation: "Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. Behavioral and Brain Sciences, 27(2), 169–190. https://doi.org/10.1017/S0140525X04000056 Interactive alignment as collaborative uncertainty reduction between minds",
    externalLinks: {
      url: "https://doi.org/10.1017/S0140525X04000056"
    },
    oneLineSummary: "Pickering and Garrod argue that dialogue isn’t just two people taking turns producing monologues; it’s a tightly coupled system in which interlocutors’ representations become aligned at multiple levels—phonology, syntax, semantics, situation models. Through automatic priming and repetition, people gradually converge on shared forms and structures, which makes both production and comprehension easier and reduces the cognitive load of keeping up. This “interactive alignment” is their mechanistic answer to how dialogue can be so fast, fluid, and efficient despite all the ambiguity and noise in language.",
    discussion: {
      coreIdea: "They push back against accounts that treat dialogue mainly in terms of high-level goals and reasoning about others’ mental states. Those things matter, but underneath is a lot of low-level alignment machinery: you pick up your partner’s words, constructions, even rhythms, and that unconscious mimicry shrinks the search space of possible interpretations. Successful conversation, on this view, is essentially collaborative uncertainty reduction. Minds don’t just share “common ground” as a static store; they dynamically synchronize their internal states through repeated, mutually constraining signals.",
      questionAnswered: "Folded into my project, this makes AI companionship look like an odd kind of alignment partner. Modern chat models are extremely good at aligning to you—your style, preferences, and topics—because that’s literally what they’re optimized to do. But the alignment is mostly one-way: they meet you where you are, rather than two noisy, limited humans struggling toward mutual alignment. That asymmetry means less practice at the genuinely hard part of dialogue: tuning yourself to someone who is not already optimized for you, whose processing limits, habits, and misunderstandings you have to adapt to. In a world with more AI talk and less human talk, people may feel more “aligned” in the moment, while actually getting weaker at the very coordination processes this paper tries to explain.",
      whyItMatters: ""
    }
  },
  // Section 5: Understanding AI Architectures and RLHF
  {
    slug: "training-language-models-to-follow-instructions-wi",
    groupSlug: "ai-architectures",
    title: "Training language models to follow instructions with human feedback",
    authors: "Ouyang, L., Wu, J., Jiang, X., et al.",
    year: 2022,
    venue: "arXiv",
    fullCitation: "Ouyang, L., Wu, J., Jiang, X., et al. (2022). Training language models to follow instructions with human feedback. arXiv. https://doi.org/10.48550/arXiv.2203.02155 InstructGPT paper showing technical mechanisms of RLHF",
    externalLinks: {
      url: "https://doi.org/10.48550/arXiv.2203.02155"
    },
    oneLineSummary: "Ouyang et al. is the canonical “how-to” for turning a raw language model into an instruction-following assistant. They outline a three-stage pipeline: first, start from a pretrained GPT-3; second, fine-tune it on supervised examples where humans demonstrate ideal responses to prompts; third, train a reward model on human rankings of candidate outputs and then run reinforcement learning (PPO) to optimize the model toward higher predicted reward. The striking result is that a much smaller InstructGPT model, tuned this way, is preferred by humans over the giant base model across a wide range of tasks, while also being less toxic and slightly more truthful.",
    discussion: {
      coreIdea: "Technically, this paper shows that you can bend a generic next-token predictor into something that behaves like a cooperative conversational agent just by wrapping it in human feedback loops. There’s no new architecture for “values” or “understanding,” just a clever use of demonstrations and preference modeling to reshape output distributions.",
      questionAnswered: "In my project, this is the mechanical backbone that pairs with the critique from Sharma and Dahlgren Lindström. The same pipeline that boosts helpfulness and politeness is also the one that bakes in sycophancy and user-pleasing biases, because those are what win in the reward model’s training data. So when I talk about AI companionship as “engineered low-friction interaction,” this paper is the place where that engineering actually lives: a gradient descent process nudging models, turn after turn, toward responses that feel easy and agreeable to humans in short evaluation windows, rather than toward the occasionally sharp, high-friction exchanges that long-term social learning depends on.",
      whyItMatters: ""
    }
  },
  // Section 6: AI Companionship
  {
    slug: "social-companionship-with-artificial-intelligence",
    groupSlug: "ai-companionship",
    title: "Social companionship with artificial intelligence: Recent trends and future avenues",
    authors: "Chaturvedi, R., Verma, S., Das, R., & Dwivedi, Y. K.",
    year: 2023,
    venue: "Technological Forecasting and Social Change, 191, 122534",
    fullCitation: "Chaturvedi, R., Verma, S., Das, R., & Dwivedi, Y. K. (2023). Social companionship with artificial intelligence: Recent trends and future avenues. Technological Forecasting and Social Change, 191, 122534. https://www.sciencedirect.com/science/article/pii/S0040162523003190 Comprehensive review of mechanisms and consequences",
    externalLinks: {
      url: "https://www.sciencedirect.com/science/article/pii/S0040162523003190"
    },
    oneLineSummary: "Chaturvedi and coauthors offer a broad map of “social companionship with AI” as a research field. Through bibliometric and thematic analysis, they identify the main theories (anthropomorphism, social presence, attachment, uses-and-gratifications), key constructs (loneliness, trust, dependence, self-disclosure), and typical outcomes (perceived support, engagement, but also addiction, displacement, and privacy risk). They propose a conceptual framework where antecedents (user traits like loneliness, social anxiety; design features like human-like cues) feed into mediators (perceived warmth, agency, social presence), which then shape consequences for individual well-being and social networks, moderated by factors like regulation and cultural norms. The review emphasizes how quickly commercial design is racing ahead of ethical and policy thinking.",
    discussion: {
      coreIdea: "As a backdrop for my project, this review does two things. First, it shows that companionship AIs are not fringe curiosities; they sit at the intersection of customer service, mental health, elder care, and entertainment, with overlapping mechanisms across domains. Second, it crystallizes the trade-offs: the same features that make these systems good companions—high availability, emotional mirroring, personal customization—are also the ones that can foster dependence and crowd out human ties. Chaturvedi et al. are not arguing that social AI is inherently bad, but they highlight how little we understand about long-term, population-level effects. That gap is exactly where my social-friction argument lives: current systems are being optimized to maximize comfort, engagement, and perceived support, while almost no one is explicitly optimizing for the preservation of hard, growth-driving aspects of human social life—conflict, accountability, and the necessity of navigating other minds that aren’t designed to put you first.",
      questionAnswered: "",
      whyItMatters: ""
    }
  },
  // Section 7: Where AI Companionship Goes Wrong
  {
    slug: "chatgpt-giving-relationship-advice--how-reliable-i",
    groupSlug: "ai-companionship",
    title: "ChatGPT giving relationship advice – How reliable is it? Proceedings of the International AAAI Conference on Web and Social Media, 18 (1), 610–623",
    authors: "Hou, H., Leach, K., & Huang, Y.",
    year: 2024,
    venue: "https://doi.org/10.1609/icwsm.v18i1.31338 Analyzes 13,138 Reddit relationship posts and shows that ChatGPT’s judgments of relationship advice often diverge from human consensus and are internally inconsistent across repeated queries.",
    fullCitation: "Hou, H., Leach, K., & Huang, Y. (2024). ChatGPT giving relationship advice – How reliable is it? Proceedings of the International AAAI Conference on Web and Social Media, 18 (1), 610–623. https://doi.org/10.1609/icwsm.v18i1.31338 Analyzes 13,138 Reddit relationship posts and shows that ChatGPT’s judgments of relationship advice often diverge from human consensus and are internally inconsistent across repeated queries.",
    externalLinks: {
      url: "https://doi.org/10.1609/icwsm.v18i1.31338"
    },
    oneLineSummary: "The authors take a very practical problem—“should people rely on ChatGPT for relationship advice?”—and attack it empirically. They use a large corpus of Reddit posts about intimate relationship problems and associated human-rated advice, then ask ChatGPT to rank or judge different advice options for the same posts. Agreement with human judgments is weak, and when they resend identical queries, the model’s own rankings fluctuate noticeably. Reliability drops especially in more ambiguous, morally gray situations—the ones where people most want guidance.",
    discussion: {
      coreIdea: "The core question is whether a general-purpose LLM can function as a stable, human-aligned arbiter of what counts as “good” relationship advice. The answer is: not yet. ChatGPT can produce articulate, plausible-sounding guidance, but its alignment with human judgments is low, and its decisions are noisy from one run to the next. The system doesn’t seem to implement a consistent, deeply grounded model of relational ethics; it’s more like a sophisticated pattern-matcher whose outputs wander within a polite, supportive band.",
      questionAnswered: "For the project, this is a neat example of friction reduction with epistemic costs. An AI advisor gives you instant, low-friction answers to painfully complicated relational questions, but those answers are neither strongly tethered to human normative consensus nor stable over time. Contrast that with turning to friends, partners, or therapists: those conversations are effortful and risky, but the feedback you get is grounded in long-run knowledge of you, shared history, and real stakes in the relationship. Repeatedly substituting AI for that messy process means you get soothing, fast-twitch “advice” without fully engaging the slow, socially embedded learning that comes from negotiating conflict and sitting in uncertainty with other people.",
      whyItMatters: ""
    }
  },
  // Section 8: Developmental Impact and Critical Periods
  {
    slug: "interpersonal-apprehensions-impact-on-behavior-and",
    groupSlug: "developmental-impact",
    title: "Interpersonal Apprehension’s Impact on Behavior and Performance in High-Stakes Scenarios",
    authors: "Shrivastava, A.",
    year: 2025,
    venue: "Business and Professional Communication Quarterly",
    fullCitation: "Shrivastava, A. (2025). Interpersonal Apprehension’s Impact on Behavior and Performance in High-Stakes Scenarios. Business and Professional Communication Quarterly. https://doi.org/10.1177/23294906251322889 Increased uncertainty around others’ reactions leads to less social behavior",
    externalLinks: {
      url: "https://doi.org/10.1177/23294906251322889"
    },
    oneLineSummary: "Shrivastava examines interpersonal apprehension in professional or high-stakes contexts—situations where the cost of a social misstep can feel disproportionate. The main idea is that uncertainty about how others will judge you can suppress participation, risk-taking, and performance. People hold back not because they lack competence, but because anticipated evaluation becomes a throttle on behavior.",
    discussion: {
      coreIdea: "The paper’s core question is how apprehension shapes communication and outcomes when the stakes are high. The answer appears to be that heightened evaluation concerns reduce willingness to speak up, ask clarifying questions, or engage assertively, which can then impair both individual performance and group decision quality. The work frames apprehension as a dynamic, context-sensitive barrier rather than a stable personality flaw.",
      questionAnswered: "This gives a modern, applied hinge point for my argument. AI companions may lower interpersonal apprehension by offering a zero-judgment rehearsal space, which could be genuinely useful as training wheels. The catch is transfer: if the safest environment becomes the default, people may become less practiced at performing under real evaluative uncertainty. The final report can use this to motivate a design principle: the goal shouldn’t be to eliminate apprehension forever, but to help users gradually build tolerance for the ambiguity and pressure that come with human audiences.",
      whyItMatters: ""
    }
  },
  // Section 9: Societal Implications and Future Directions
  {
    slug: "social-capital-government-expenditures-and-growth",
    groupSlug: "societal-implications",
    title: "Social capital, government expenditures, and growth",
    authors: "Ponzetto, G. A., & Troiano, U.",
    year: 2025,
    venue: "Journal of the European Economic Association, 23(2), 632–681",
    fullCitation: "Ponzetto, G. A., & Troiano, U. (2025). Social capital, government expenditures, and growth. Journal of the European Economic Association, 23(2), 632–681. https://crei.cat/wp-content/uploads/2025/04/SCGE.pdf Formal model of cascading economic costs from social skill and trust decline",
    externalLinks: {
      url: "https://crei.cat/wp-content/uploads/2025/04/SCGE.pdf"
    },
    oneLineSummary: "Ponzetto and Troiano argue that social capital boosts growth partly by improving political incentives and the composition of public spending—especially investment in human capital like education. They combine a theoretical growth model with empirical evidence across countries and U.S. states showing that higher social capital is associated with higher public education spending shares. The broad claim is that trust and civic norms don’t just feel good; they change how well governments allocate resources.",
    discussion: {
      coreIdea: "The paper’s core question is how to pin down a causal economic mechanism linking social capital to long-run growth, rather than treating the relationship as a hand-wavy correlation. Their answer is a political-economy channel: where social capital is higher, voters and institutions are better able to reward competence and punish rent-seeking, which shifts spending toward productive investment. This creates a reinforcing system where social capital and growth co-evolve.",
      questionAnswered: "This gives me a strong macro-level “why it matters” layer. If AI-mediated social life gradually weakens real-world norms of reciprocity, trust, and accountability—especially among cohorts growing up with companions as a normal relational option—the risk isn’t just personal loneliness. The risk is a slow erosion of the social fabric that supports institutional performance and human capital investment. I don’t need to claim we’re already seeing this; the paper lets me frame it as a plausible long-horizon pathway that makes the social-friction question economically consequential rather than just psychologically interesting.",
      whyItMatters: ""
    }
  },
];

