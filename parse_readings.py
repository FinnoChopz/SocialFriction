import re
import json

text = """
Section 1: Foundations of Social Friction & Face-to-Face
Interaction

1. Goffman, E. (1955). On face-work: An analysis of ritual elements in social interaction.
Psychiatry, 18 (3), 213–231. https://doi.org/10.1080/00332747.1955.11023008
Establishes irreversibility of social actions and face maintenance as core social
friction

Goffman argues that everyday interaction is organized around “face” – the positive social value a person claims – and the ongoing “face-work” people do to maintain it. In any encounter, you put forward a “line” about who you are and where you stand; once it’s in play, you and others are morally bound to sustain it. Social life is thus full of tiny, ritualized maneuvers (apologies, joking, tact, avoidance) that repair threatened face and keep interaction flowing. Under the surface, there’s a surprisingly strict moral order: people are expected both to respect their own face and to protect others’, and much of the anxiety and drama in social life comes from possible losses of face that can’t easily be undone.

The core question is: what invisible rules and rituals make ordinary interaction hang together without constant breakdown? Goffman answers by treating interaction as a kind of secular religion of face, in which individuals are simultaneously actors and audience. By carefully analyzing small events—slights, gaffes, rescues—he shows that people orient to face as a sacred object: they anticipate threats, work to prevent them, and rush to repair them when they occur. The article doesn’t rely on experiments or formal models; instead, it builds a phenomenological-analytic case that these moral expectations are what keep conversations from flying apart.

For my project, this paper is basically the “origin story” of social friction. Goffman insists that interaction is inherently risky, irreversible, and emotionally loaded: once a remark lands, you can’t un-say it, and everyone must cope with its impact on face. That is exactly the kind of variable, high-stakes feedback I’m arguing is essential for social learning – the mix of smiles, winces, silence, and pushback that trains our behavior over time. In contrast, AI companionship offers a world where face is almost never seriously threatened: you can edit your message before sending, reset the chat, and count on the model to be tactful and forgiving. My broader claim is that if people increasingly practice social life in this low-friction environment, they will do less face-work, experience fewer real losses of face, and therefore get weaker training in how to navigate messy, high-stakes human encounters. Goffman gives me the conceptual language – face, line, ritual repair – to describe what exactly gets flattened when we outsource our social practice to friction-free AI companions.

2. Hadley, L. V., Goldberg, A., & Levinson, S. C. (2022). A review of theories and
methods in the science of face-to-face social interaction. Nature Reviews Psychology,
1, 42–54. https://doi.org/10.1038/s44159-021-00008-w
Comprehensive overview of mechanisms unique to face-to-face interaction

Hadley, Naylor and Hamilton treat face-to-face interaction as a rich, multimodal, cognitive problem rather than just “talk plus body language.” They argue we can organize interaction behavior three ways: by modality (gaze, gesture, speech, posture), by underlying cognitive processes (perception, prediction, control), or by social meaning (e.g., turn-taking, dominance, affiliation). They then map three families of theories onto this: (1) social-meaning theories that describe what behaviors do in interaction, (2) simple behavior-rule theories (like flocking rules) that show how complex coordination can emerge from local rules, and (3) rich cognition theories where people maintain detailed internal models of others’ minds. Finally, they review new methods—high-resolution motion capture, dual eye-tracking, hyperscanning, VR/artificial agents—that let us actually test these theories in naturalistic settings, instead of only in stripped-down lab tasks.

The core question is: how should we theorize and measure face-to-face interaction so that we can move beyond vague talk of “social skills” to actual testable models? The authors answer by laying out a kind of coordinate system: one axis for how we organize behavior (modality vs cognition vs meaning), another for what kind of theory we’re using (social meaning, behavior rules, rich cognition), and a toolkit of methods that can discriminate among them. Their answer is explicitly pluralistic: no single framework wins; progress comes from matching theory type to the right behavioral measures and experimental setups.

This paper gives me a vocabulary and toolkit for talking about “friction” in a non-hand-wavy way. My core claim is that real-world social learning depends on messy, irreversible, multimodal feedback—raised eyebrows, hesitations, interruptions—while AI companionship strips much of that away. Hadley et al. show that face-to-face interaction is exactly this dense, coordinated coupling of modalities and cognitive processes; it’s not just text with extra steps. In my final report, I can lean on their tripartite theory structure: AI companions mostly simulate social meaning with language, but they don’t expose users to the full behavior-rule dynamics or the demand to maintain rich, up-to-date models of specific others’ minds. That gap helps explain why friction-free AI practice may fail to generalize: it trains users in a thinned-out slice of the interaction space, where many of the cues and contingencies that normally drive social learning are simply missing.

3. Sacks, H., Schegloff, E. A., & Jefferson, G. (1974). A simplest systematics for the organization
of turn-taking for conversation. Language, 50 (4), 696–735. https://doi.org/10.2307/412243
Turn-taking as fundamental social skill requiring real-time negotiation

Sacks, Schegloff, and Jefferson are basically trying to reverse-engineer the “hidden operating system” of conversation. Their key move is to treat turn-taking as a rule-governed system in its own right, not just a side effect of grammar or politeness. They argue that everyday talk is organized around “turn-constructional units” (sentences, clauses, even single words) that project possible completion points. At each of these points, there’s a structured choice about who speaks next: the current speaker can select a next speaker, someone else can self-select, or the current speaker can continue. These simple rules explain a whole constellation of observable facts: why there’s usually only one speaker at a time, why gaps and overlaps are so short, how turn lengths vary so much, and how the system generalizes across settings and languages while still allowing special cases like classrooms or debates.

The central question of the article is: what minimal set of rules could generate the orderly yet flexible pattern of “who talks when” that we see in ordinary conversation? They answer this by treating conversation almost like a formal system: start from a set of empirical regularities (one-at-a-time talk, short gaps, variable turn size, etc.), then propose a small rule set and show how it can generate those regularities. The paper doesn’t do hypothesis testing in the modern sense; instead it offers a detailed analytic fit between the rule system and transcribed data, arguing that the proposed turn-taking mechanism is both simple and powerful enough to account for the observed structure of talk.

For my project, this paper sharpens what exactly gets lost when we move to AI-mediated, friction-light interaction. In Sacks et al.’s world, conversation is a high-bandwidth coordination game: you are constantly predicting when others might jump in, designing your turns to invite or block responses, and managing the risk of awkward gaps or overlaps. All of that is live social friction. AI chat, by contrast, collapses turn-taking into a guaranteed, latency-tolerant back-and-forth: no interruptions, no competition for the floor, no need to time your entry into the stream of talk. That means fewer opportunities to practice the micro-skills of floor management and timing that their system highlights—skills that are central to functioning in real groups. In the final report, this article will be my evidence that even the basic “who speaks when” layer of conversation is nontrivial, learned, and fragile—and that AI companionship quietly removes an entire dimension of social training by turning turn-taking itself into a solved problem.

4. Ward, L. F. (1892). Social friction. In L. F. Ward, The psychic factors of civilization (pp. 102–115). Boston: Ginn & Company. https://doi.org/10.1037/12960-017
How social friction leads to social norms

Ward’s core move is to reinterpret “ethics” as a byproduct of the social machine—not a lofty realm of principles, but the way society manages the collisions that happen when individuals pursue their own ends. Moral rules, in his view, grow out of the system: people are literally compelled to behave “morally” by social sanctions—ostracism, loss of livelihood, imprisonment—rather than by pure conscience. Ethics is about conduct, not action: it doesn’t generate productive activity, it regulates and restrains it, much like mechanical friction. Social friction is thus both necessary (to keep the machine from tearing itself apart) and costly (it slows progress), and the task of “social intellect” is to remove all friction that isn’t strictly required.

The central question of the chapter is: what is the real domain and function of ethics within social life? Ward answers by sharply limiting ethics to cases where pursuits of ends conflict—where my action obstructs yours. He argues that moral codes are self-enforcing products of social evolution, not things we create by preaching. Teaching ethics has little power to improve character; it mostly produces timidity and egotism in teachers and students obsessed with guarding reputations. Even seemingly private vices (intemperance, self-harm) matter morally only once they re-enter society and increase “friction” in the social machinery. Even charity, which looks purely altruistic, is explained as an attempt to relieve pressure caused by deeper obstructions that prevent the poor from pursuing normal action.

Ward gives me a nineteenth-century blueprint for thinking about “alignment” as something that emerges from lived constraint and conflict. Social norms bite because violations carry real costs; the moral code is felt in the frictions of everyday life. AI companionship, by contrast, offers moral interaction with almost no friction: no ostracism, no lost opportunities, no real penalties for being selfish, evasive, or untruthful. In Ward’s terms, it’s like a form of perpetual charity that eases local discomfort without touching the structural barriers underneath. That suggests a concrete risk: as more social practice shifts into these low-friction spaces, we may blunt exactly the social forces that historically produced moral alignment in the first place.

5. Hawkins, R. X. D., Goodman, N. D., & Goldstone, R. L. (2019). The Emergence of Social Norms and Conventions. Trends in Cognitive Sciences, 23(2), 158–169. https://doi.org/10.1016/j.tics.2018.11.003
How social friction leads to social norms

Hawkins and colleagues treat norms and conventions as solutions that emerge from many small, local coordination problems. Rather than assuming norms are just “out there,” they show how repeated interactions, limited information, and simple learning rules can gradually stabilize into shared expectations. They review work where agents—human or simulated—face tasks like naming objects, dividing resources, or coordinating on signals. Across methods, the same story shows up: people start out noisy and idiosyncratic, but through feedback, adaptation, and mutual prediction, they converge on conventions that reduce uncertainty about what others will do. Norms then become both constraints (limiting options) and scaffolds (making the social world more predictable and efficient).

The central question is: how do shared social norms arise from the messy, decentralized behavior of individuals who are just trying to get by in local interactions? The paper’s answer is multi-level. At the micro level, individuals learn from reinforcement and social inference in specific encounters—updating expectations when others reward or punish certain behaviors. At the meso level, network structure and patterns of interaction (who meets whom, how often, under what information) shape which conventions win out. At the macro level, cultural evolution and population turnover help stabilize or shift norms over generations. Norms are therefore not imposed from above so much as they crystallize from countless episodes of friction and adjustment.

This gives a mechanistic backbone to the idea that social friction is a training signal. Norms don’t emerge in a vacuum; they are carved out by trial and error, misunderstandings, mild conflicts, and the pressure to coordinate with actual, sometimes stubborn, other people. AI companionship environments, by contrast, are typically designed to minimize friction: the model adapts quickly to the user, avoids harsh negative feedback, and often “meets you where you are” instead of forcing you to adapt. That means fewer genuine coordination failures, fewer moments where you experience the cost of misalignment and have to update. In the final report, this article will help me argue that if we increasingly practice interaction in artificially forgiving, one-sided systems, we may get worse at the very multi-level learning processes that produce and maintain real-world social norms.

6. Ransom, A., LaGrant, B., Spiteri, A., Kushnir, T., Anderson, A. K., & De Rosa, E. (2022). Face-to-face learning enhances the social transmission of information. PLOS ONE, 17(2), e0264250. https://doi.org/10.1371/journal.pone.0264250
Face to face learning leads to richer information transmission

The paper asks what special advantage, if any, face-to-face learning has over other vantage points when people are trying to acquire a complex visuospatial skill from a model. Using a multi-step “puzzle box” task with children and adults, they manipulate the learner’s viewpoint (0°, 90°, 180° relative to the model) and track not just whether people can open the box, but how they do it: how faithfully they imitate the model’s actions, how often they innovate new solutions, and how quickly they solve the task. The key finding is that face-to-face (180°) learning, which is visually the most awkward perspective, still enhances the efficiency of learning and the transmission of useful “know-how.” Sharing a mental perspective with a partner in a rich, embodied setup can trump the visual convenience of a shared first-person view.

The central question is whether social learning is primarily about copying visible actions from the easiest angle, or about grasping another person’s goals and intentions in a way that supports flexible problem solving. The authors show that a shared visual frame (0°) maximizes strict imitation, but face-to-face interaction promotes goal emulation: learners are more likely to depart from the model’s exact moves, discover novel solutions, and still achieve the target outcome more efficiently. Children and adults both learn, but adults are more faithful imitators while children are relatively more innovative. The punchline is that the social affordances of face-to-face interaction can overcome the geometric disadvantages of a third-person viewpoint, suggesting that perspective-taking, shared attention, and subtle nonverbal cues matter deeply for how information travels between minds.

This paper is a clean experimental demonstration that the format of interaction shapes not just how much we learn, but what kind of learning dominates: rigid copying vs flexible, goal-directed understanding. AI companionship, especially in text-only form, narrows the channel to something closer to a tidy 0° “instruction manual” without the messy, embodied reciprocity of face-to-face learning. If rich, frictionful co-presence helps people internalize others’ goals and innovate on top of what they see, then a shift toward low-friction, disembodied AI partners may bias us toward a thinner kind of social learning: efficient imitation of suggestions, with fewer chances to wrestle with another human’s perspective in real time and build the deeper, shared mental frames that Ransom et al. highlight.

Section 2: Neural Plasticity & Social Learning

7. Kleim, J. A., & Jones, T. A. (2008). Principles of experience-dependent neural plasticity: Implications for rehabilitation after brain damage. Journal of Speech, Language, and Hearing Research, 51(1), S225–S239. https://doi.org/10.1044/1092-4388(2008/018)
“Use it or lose it” principle; need for challenging experiences to drive plasticity

The paper lays out a set of principles for how experience actually reshapes the brain, and the throughline is pretty simple: plasticity is picky and expensive. Neural systems change in response to demands that are specific, repeated, intense, and meaningful. “Use it or lose it” and “use it and improve it” capture the basic directional pull, but the authors also emphasize specificity (you get better at what you practice), repetition and intensity (a few half-hearted trials don’t cut it), timing (there are windows when plasticity is more available), salience (the experience has to matter to the organism), and the fact that some new learning can transfer while other new learning can interfere. Rehabilitation that ignores these constraints—too easy, too generic, too sparse—is basically asking the brain to rewire itself without giving it a reason.

The central question is: given what we know about experience-dependent plasticity, what kind of practice actually produces lasting, functional change after brain injury—and what kind doesn’t? The authors’ answer is to synthesize animal and human work into those core principles and then cash them out in concrete rehab guidance. Effective rehabilitation isn’t just “doing the task a bit”; it must be sufficiently challenging to recruit the damaged systems, targeted to relevant functions, repeated enough to consolidate, and embedded in contexts that feel behaviorally important rather than arbitrary. Half-measures—low-intensity, low-salience drills—can leave latent capacity on the table or, worse, allow compensatory habits to crystallize that actually block recovery of the original function.

For my project, this paper is a bridge between neuroscience and the argument that social friction is not just annoying noise but a training signal. If plasticity is gated by challenge, salience, and repeated engagement, then the “hard parts” of social life—awkwardness, conflict, risk of rejection—are exactly what push social circuits to adapt. High-friction interactions are intense, memorable, and behaviorally consequential; they check every box on the plasticity list. AI companionship, by design, smooths that landscape: it reduces stakes, tones down negative feedback, and makes it easy to avoid the very kinds of difficult social experiences that would otherwise drive change. In the final report, I can use Kleim and Jones to argue that a chronically low-friction social diet doesn’t just feel different; it may literally offer weaker input to the mechanisms that tune our social brains.

8. Davis, M. M., Modi, H. H., Skymba, H. V., Finnegan, M. K., Haigler, K., Telzer, E. H., & Rudolph, K. D. (2023). Thumbs up or thumbs down: Neural processing of social feedback and links to social motivation in adolescent girls. Social Cognitive and Affective Neuroscience, 18(1), nsac055. https://doi.org/10.1093/scan/nsac055
Recent evidence of how social feedback drives neural learning

The paper uses a fake “peer evaluation” paradigm with mid-adolescent girls in an fMRI scanner: participants see photos of peers, rate how much they want to interact, and then receive supposedly real thumbs-up, thumbs-down, or neutral feedback. The big takeaway is that social approval and disapproval are not just “feelings” but strongly patterned neural events. Negative feedback ramps up activity in threat- and social-processing regions (amygdala, mPFC, TPJ), while positive feedback engages both social and reward circuitry (mPFC, vmPFC, ventral striatum) and alters functional connectivity patterns.

The central question is how adolescent brains process social reward versus social threat, and how these neural responses relate to different kinds of social motivation. The authors show that girls who orient toward avoiding negative judgment (performance-avoidance goals) show stronger coupling between amygdala/ventral striatum and social-cognitive regions during feedback, suggesting heightened sensitivity to social evaluation. In contrast, girls who are more focused on gaining positive regard (performance-approach goals) show deactivation in some of those same social-processing regions, consistent with a less hyper-vigilant stance. So it’s not just “more social feedback = more activation”; the pattern of neural responses tracks the kind of social goals the person brings into the situation.

For my project, this is a clean neural instantiation of social friction as a learning signal. Thumbs-up and thumbs-down literally reconfigure connectivity between reward, threat, and social-cognitive systems, and those changes depend on whether someone is wired to chase approval or dodge embarrassment. In a high-friction peer world, that means social brains are constantly being calibrated by real risk: rejection hurts, approval soothes, and circuits adapt accordingly. AI companions, by contrast, offer a stream of highly predictable, low-stakes social feedback—rarely harsh, often quickly reparative. That may blunt the very error signals (sharp disapproval, real social cost) that tune social motivation and teach adolescents when to lean in, when to change course, and how to tolerate being judged.

9. Schultz, W. (2015). Neuronal reward and decision signals: From theories to data. Physiological Reviews, 95(3), 853–951. https://doi.org/10.1152/physrev.00023.2014
Biological basis for why variable reinforcement is necessary for learning

Schultz pulls together decades of work on dopamine neurons and basically argues that they implement a kind of reward prediction error engine in the brain. Dopamine cells don’t just fire for rewards; they fire when rewards are better than expected, quiet down when rewards are worse than expected, and settle at baseline when things match prediction. Crucially, this system is tuned to surprise and variability. Fixed, totally predictable rewards quickly stop driving big dopamine responses. It’s the deviations—the unexpected win or the sudden loss—that actually move the learning machinery.

The core question is how theoretical reinforcement learning ideas (like prediction error from models in AI and economics) map onto real neural activity. Schultz answers by showing that dopamine firing patterns track exactly the quantities those models say matter: changes in expected value, uncertainty, and the difference between what was predicted and what actually happened. He walks through data from conditioning, choice tasks, and probabilistic rewards to show that neurons care about both value and risk, and that learning slows or stalls when feedback becomes too predictable or too noisy to be informative.

For my project, this is the biological backbone for why “friction” and variability in social feedback are so important. If social approval and disapproval are rewards and punishments, then the brain’s learning systems are most engaged when that feedback is somewhat unpredictable but still meaningful—when you’re not entirely sure how people will react. Human social life naturally creates that variable schedule: sometimes you get praised, sometimes you get ignored, sometimes you get shot down. AI companionship typically does the opposite: it offers highly consistent, buffered responses that avoid sharp negative surprises. That might feel nicer in the moment, but it also means weaker reward prediction errors, and thus weaker updating, in the very circuits that are supposed to learn from social consequences.

10. Hofmans, L., van den Bos, W., Li, S.-C., & Crone, E. A. (2025). Developmental differences in social information use under uncertainty: A neurocomputational approach. Developmental Cognitive Neuroscience, 75, 101604. https://doi.org/10.1016/j.dcn.2025.101604
Adolescents integrate social information under uncertainty less precisely than adults

The study compares how adolescents and adults use peer information when they’re uncertain, using a perceptual “mushroom” task where people make an initial estimate, see a peer’s estimate plus their confidence, and then revise. Behaviorally, both groups look competent: they’re reasonably accurate and do update based on peers. But once you dig into the computational model and the fMRI, a subtler story pops out. Adolescents are less sensitive to changes in their own certainty and in the peer’s reported confidence. Their internal representation of “how sure am I?” and “how sure are they?” is fuzzier, and that fuzziness shows up neurally as weaker tuning to peer confidence and different sensitivity to their own certainty signals.

The central question is how social learning under uncertainty changes from adolescence to adulthood, and whether those changes are best understood as different “rules” or as different precision on the same rules. The authors come down on the second option: adolescents and adults share the same basic Bayesian updating architecture, but adolescents have reduced metacognitive precision. They register uncertainty at both personal and social levels, but those precision signals don’t modulate their weighting of social information as sharply as in adults.

For my project, this paper is a nice reminder that social learning hinges not just on the presence of feedback, but on how precisely the brain tracks and uses uncertainty. High-friction human settings constantly force you to read both your own confidence and others’—hesitations, strong claims, shaky advice—and to recalibrate how much weight you give them. AI companions tend to present information with stable, smoothed-out confidence and low social consequence, which may give adolescents fewer chances to practice this kind of fine-grained, uncertainty-sensitive social updating.

11. Hutton, J. S., Dudley, J., DeWitt, T., & Horowitz-Kraus, T. (2022). Associations between digital media use and brain surface structural measures in preschool-aged children. Scientific Reports, 12, 19095. https://doi.org/10.1038/s41598-022-20922-0
When screen experiences crowd out interactive exchanges, social circuitry thins

This paper looks at preschoolers’ screen use and links it to differences in brain structure, especially in regions tied to language, executive function, and social cognition. Parents reported kids’ digital media exposure and home reading environment, and children underwent MRI scans. Higher screen use was associated with thinner cortex and altered surface area in frontal and temporal regions that normally benefit from rich, back-and-forth interaction—conversation, shared reading, pretend play. In contrast, more interactive, language-heavy experiences (like shared reading) were linked to healthier structural profiles in those same areas. The headline isn’t “screens melt kids’ brains,” but that intensive, passive digital input seems to correlate with less robust development of circuits that are usually sculpted by live, responsive social engagement.

The central question is whether and how the quantity and quality of early digital media use show up in the physical organization of the developing brain. The authors don’t claim causality, but the pattern is suggestive: when more time is spent on solitary or low-interaction screen activities, less time is available for the contingent, face-to-face exchanges that drive specialization in language and social networks. The study’s contribution is to bring structural MRI into that conversation, showing that media habits and cortical morphology are meaningfully correlated even in very young children.

For my project, this paper is an early-life analogue of my broader claim: when frictionful, effortful interaction is displaced by smoother, more passive experiences, the systems that depend on that interaction may literally develop differently. Preschoolers on tablets instead of in messy, dialogic play are getting a “thinner” training signal; so are older kids and adults who increasingly turn to AI companions instead of unpredictable humans. It gives me a concrete, brain-level way to argue that the medium of interaction—screen-based, low-contingency vs live, high-contingency—matters for how social circuitry is built and maintained.

Section 3: Variable Reinforcement and Social Calibration

12. Bandura, A. (1977). Social learning theory. Englewood Cliffs, NJ: Prentice Hall. https://www.asecib.ase.ro/mps/BanduraSocialLearningTheory.pdf
Foundational text on vicarious reinforcement and observational learning

Bandura’s big move is to show that people don’t just learn by being directly rewarded or punished; they learn by watching what happens to other people. Observational learning, modeling, and “vicarious reinforcement” let us internalize rules for behavior without personally touching every hot stove. The learner is not a passive sponge: attention, memory, motor ability, and motivation all matter, and behavior emerges from a triad of person, behavior, and environment influencing one another (reciprocal determinism), rather than a simple stimulus–response chain.

The central question is how to explain the acquisition of complex, flexible behavior in real life, where we rarely get neat, repeated conditioning trials. Bandura answers by breaking observational learning into processes: we selectively attend to models, encode and rehearse their behavior symbolically, and then decide whether to perform it based on expected outcomes. Reinforcement still matters, but mostly as information and anticipation (what tends to get rewarded around here?), not just as brute force shaping.

For my project, Bandura gives a conceptual backbone for thinking of social friction as information-rich vicarious feedback. Watching someone else get praised, ignored, or punished in a group is a huge part of how we learn “what flies” without paying every cost ourselves. AI companionship shifts that ecology: the main “model” is an agent tuned to be endlessly patient, affirming, and low-cost to approach. That flattens the range of observed consequences and distorts the model space: you don’t see people getting shut down, embarrassed, or rejected for real. In the final report, this book will anchor the claim that thinning out vicarious exposure to genuine social consequences changes the learning diet in a deep way, even if the user feels like they’re still “interacting all the time.”

13. Grusec, J. E., & Davidov, M. (2010). Integrating different perspectives on socialization theory and research: A domain-specific approach. Child Development, 81(3), 687–709. https://doi.org/10.1111/j.1467-8624.2010.01426.x
Different socialization mechanisms for different developmental domains

Grusec and Davidov argue that “socialization” is not one giant process but a set of distinct domains, each with its own logic. They outline areas like protection, reciprocity, group participation, guided learning, and control, and show that different parent–child interactions and mechanisms matter in each: warmth and comfort in the protection domain, mutual responsiveness for reciprocity, power assertion and rules for control, etc. This helps explain why findings in the literature often look contradictory—people have been mixing domains without realizing it.

The central question is how to integrate competing socialization theories and messy data into a coherent framework. Their answer is to go domain-specific: ask first “what kind of social goal is at stake here?” and only then talk about mechanisms. A style that’s optimal in one domain (say, firm discipline in the control domain) may be harmful or irrelevant in another (like guided learning), so we shouldn’t expect a single parenting style or mechanism to generalize across everything.

For my project, this is a reminder that “social learning” via AI is not monolithic. AI companions might be decent in some domains (guided learning, maybe bits of moral reasoning talk) but almost nonexistent in others (real power conflicts, group norms, reciprocity with actual costs). The friction profile is different in each domain: discipline and control are naturally high-friction, while guided learning can be relatively gentle. If more developmental time shifts into AI-mediated, low-friction channels, it might selectively thin out practice in the harsher domains—exactly the ones that historically taught kids to tolerate conflict, accept limits, and align with group expectations. That gives me a more precise way to argue that we’re not just reducing “social friction” in general, we’re redistributing it across domains.

14. Krach, S., Müller-Pinzler, L., Westermann, S., & Paulus, F. M. (2013). Neural pathways of embarrassment and their modulation by social anxiety. NeuroImage, 119, 252–261. https://doi.org/10.1016/j.neuroimage.2015.06.036
How embarrassment serves as social calibration mechanism

This paper treats embarrassment as a full-body, full-brain social event, not just “feeling awkward.” Using a group-based fMRI setup where participants experience public success and failure, they show that embarrassment recruits two key systems: a mentalizing network (thinking about how others see you) and an arousal/affect network (insula, ACC, amygdala). These streams converge in the ventral anterior insula and amygdala, which seem to integrate “what are they thinking about me?” with “how bad does this feel?” Social anxiety amplifies parts of this response, suggesting that anxious people process public evaluation as especially threatening.

The central question is what neural circuits underlie embarrassment, and how social anxiety tweaks them. The answer is a pathway model: first you simulate others’ evaluations, then that representation is fed into affective systems that generate the hot, aversive feeling. Social anxiety doesn’t create a different emotion; it modulates sensitivity and gain within this shared circuitry, leading to stronger or more easily triggered embarrassment responses.

For my project, this is almost a picture of social friction written onto the brain. Embarrassment is a calibration signal: it punishes norm violations and sloppy self-presentation by making “being seen” feel painful, which in turn shapes future behavior. In human groups, you learn where the lines are partly by bumping into them and blushing. AI companions rarely induce genuine embarrassment: they don’t titter, fall silent, or look away; their “audience” is forgiving and resettable. That means fewer strong calibration hits to this circuitry. Over time, that could leave people less practiced at reading where social lines actually lie, and less tolerant of the discomfort that comes with being realistically evaluated by others.

15. Galván, A. (2010). Neural plasticity of development and learning. Human Brain Mapping, 31(6), 879–890. https://doi.org/10.1002/hbm.21029
Plasticity, variable reward, necessity of environmental challenges

Galván’s review argues that development and learning are not separate beasts: both reflect experience-dependent plasticity, with some periods (like adolescence) offering especially high sensitivity to environmental input. Structural and functional changes in cortical and subcortical systems continue well into the teens and beyond, shaped by patterns of reward, challenge, and practice. The brain remains plastic across the lifespan, but not uniformly; there are windows where particular circuits are more “tunable,” and the kind of input they get matters.

The central question is how to relate developmental changes (maturation of systems like the striatum and prefrontal cortex) to learning-related changes driven by experience. The answer is a continuum view: development sets the stage by changing the architecture and baseline excitability of circuits, and learning sculpts within that architecture via repeated, often reward-mediated experience. Adolescence, for instance, is described as a period of heightened reward sensitivity and ongoing prefrontal maturation, making it a time when rewarding, challenging experiences can have outsized effects on behavior and connectivity.

For my project, this reinforces the idea that “when” and “how” you encounter social friction matters. A world where adolescents increasingly turn to smooth, low-risk AI interactions is a world that feeds their hyper-plastic reward and social circuits a very different diet: predictable approval, minimal real-world consequence, lots of control over exposure. That may feel safer, but it also underutilizes a window where grappling with messy peers—rejections, miscommunications, status struggles—would normally drive powerful, long-lasting tuning of social brain networks. Galván gives me the developmental neuroscience frame to argue that the timing and difficulty of social experience can’t be treated as an afterthought.

16. Frank, M. J., Seeberger, L. C., & O’Reilly, R. C. (2004). By carrot or by stick: Cognitive reinforcement learning in parkinsonism. Science, 306(5703), 1940–1943. https://doi.org/10.1126/science.1102941
Positive and negative reinforcement are dissociable and both are needed for learning

Frank and colleagues use Parkinson’s disease and dopamine medication as a kind of natural experiment on the brain’s learning systems. Patients with low dopamine (off meds) are relatively better at learning to avoid options that lead to bad outcomes (“stick”) but worse at learning to repeat options that lead to rewards (“carrot”). When they take dopamine medication, the pattern flips: they get better at reward learning and worse at avoiding punishers. This double dissociation suggests that positive and negative reinforcement depend on partly separable dopamine-based mechanisms in basal ganglia circuits.

The central question is whether learning from rewards and learning from punishments are implemented by the same neural process or by partially distinct ones. The authors answer by combining behavioral tasks with a biologically grounded neural network model. The data fit a picture where “Go” pathways (facilitating actions) are strengthened by positive prediction errors, while “NoGo” pathways (suppressing actions) are strengthened by negative ones. Changing dopamine levels shifts the balance between these systems, and thus the balance between carrot- and stick-driven learning.

For my project, this is a strong argument that both pleasant and unpleasant social outcomes are functionally necessary. If AI companions are engineered to minimize negative affect—rarely giving harsh criticism, never truly withdrawing, smoothing over conflict—then they are effectively starving the NoGo system of practice. You still get “carrot” signals (validation, praise, agreeable responses), but far fewer sharp “don’t do that” hits. In real social groups, those sticks are a key part of how we learn boundaries, self-control, and norm compliance. In the final report, this paper will help me argue that an AI-mediated, mostly-carrot social environment doesn’t just feel different; it may systematically bias which reinforcement pathways we exercise.

Section 4: Theory of Mind and Communication Tailoring

17. Yu, C.-L., & Wellman, H. M. (2023). Where do differences in theory of mind development come from? An agent-based model of social interaction and theory of mind. Frontiers in Developmental Psychology, 1, 1237033. https://doi.org/10.3389/fdpys.2023.1237033
Socialization with others is required for development of theory of mind

Yu and Wellman build a little simulated society and let “children” with simple cognitive rules grow up in it to see how theory of mind (ToM) develops. The agents vary in how often they interact, with whom, and under what conversational conditions. Out of these ingredients, the model reproduces familiar findings: more frequent, diverse, and mental-state-rich interactions lead to earlier and stronger ToM, while sparse or impoverished interaction slows or blunts it. Differences in social experience alone can generate group-level gaps that look like “individual differences in ToM ability.”

The driving question is whether we need to posit big built-in cognitive differences to explain why some kids pass ToM tasks earlier than others, or whether realistic variation in social experience could already account for a lot. The simulations lean heavily toward the latter: by tweaking interaction frequency, partner types, and how often beliefs and desires are talked about, the model produces developmental trajectories that mirror cross-cultural and within-culture differences seen in real children. Social interaction quantity and quality act like dials on the ToM timeline.

For my project, this is a direct computational proof-of-concept that the social environment is not just background noise—it’s part of the causal story for how reflective social understanding comes online. A world where more “interaction” happens with AI agents that don’t truly have minds, don’t make genuine mistakes, and rarely force you to grapple with conflicting perspectives is a world that changes those dials. Even if total “conversation time” goes up, the specific kind of social practice that sharpens ToM—negotiating misunderstandings, inferring opaque motives, dealing with partial information—may go down. That’s exactly the kind of subtle developmental shift I want to flag in the final report.

18. Horton, W. S., & Gerrig, R. J. (2002). Speakers’ experiences and audience design: Knowing when and knowing how to adjust utterances to addressees. Journal of Memory and Language, 47(4), 589–606.
Knowing how to dynamically adjust messages increases social operation capacity

Horton and Gerrig look at how people learn to tailor what they say to particular listeners—what they call “audience design.” In a referential communication task, speakers first build up a history with a partner (using certain labels, shortcuts, or descriptions), then either continue with that partner or switch to a new one. Over repeated exchanges, they show that speakers don’t instantly, perfectly customize their speech; instead, they gradually learn when special audience design is needed and how to override their own pull toward brevity and habitual phrasing.

Underneath, they’re trying to separate two pieces: recognizing when a situation demands audience design, and knowing how to actually implement it. Experience with specific partners and specific feedback (e.g., confusion, clarification requests) sharpens both. Speakers become more likely to notice that a newcomer won’t understand an old in-joke label, and more willing to spend extra words to make themselves clear. Audience design emerges as an experience-dependent skill, not a hardwired default.

This maps cleanly onto my interest in “social operation capacity.” In real life, learning to talk differently to your roommate, your professor, your younger cousin, and your boss takes years of practice navigating confusion, misfires, and tiny social penalties for being unclear. AI companions typically behave as if they always understand, adapt heavily on their side, and rarely force you to repair breakdowns. That’s great for comfort, but it means fewer occasions where you have to notice “oh, that didn’t land” and adjust your utterance design. Over time, a communication style that’s well-calibrated for bots may be under-calibrated for humans.

19. Horton, W. S., & Gerrig, R. J. (2005). The impact of memory demands on audience design during language production. Cognition, 96(2), 127–142. https://doi.org/10.1016/j.cognition.2004.07.001
Audience-sensitive communication is an experience-dependent skill

Here Horton and Gerrig push the audience design story further by asking what limits it. They argue that a lot of audience design is essentially memory-based: you adjust for a listener when partner-specific memories (what you’ve said together before, how they reacted) are accessible at the right moment. In their experiments, speakers describe items for two different partners under varying memory loads. When working memory is taxed, their utterances show less partner-specific tailoring, even though they’re perfectly capable of being “nice” communicators in principle.

The key move is to treat audience design not as a special, always-on “social module,” but as something that rides on ordinary memory processes, with all their constraints. If the right traces are active and easy to retrieve, you’ll naturally produce partner-tuned language; if those traces are buried under other demands, you default to more generic, self-centered expressions. Audience-sensitive communication is thus fragile and contingent, especially under time pressure.

For the AI friction story, this is a useful reminder that real-world social skill is bottlenecked by cognitive load. In messy human settings—group conversations, noisy environments, multitasking—you’re constantly juggling memory demands while trying to track who knows what and how to speak to them. That’s where audience design is truly tested and strengthened. AI chats are typically slow, one-on-one, and forgiving: you can scroll back, rephrase, and rarely pay a price for lapses in tailoring. If more of our conversational practice shifts into those low-load conditions, we may get less practice at the harder version of audience design that actually matters in live, high-friction human contexts.

20. Shannon, C. E. (1948). A mathematical theory of communication. Bell System Technical Journal, 27(3), 379–423. https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
Information theory foundations for understanding communication

Shannon turns “information” from a vague idea into something you can measure and optimize. He models communication as a process: an information source generates a message, a transmitter encodes it into a signal, the signal goes through a noisy channel, and a receiver decodes it at the other end. The key insights are entropy (how unpredictable a source is), channel capacity (how much information per unit time a channel can reliably carry), and coding theorems showing that you can approach that capacity by using clever, redundant codes that correct for noise.

The driving question is: given a noisy channel, what is the maximum rate at which we can transmit information with arbitrarily low error, and what determines that rate? Shannon answers by deriving a formal link between the statistics of the source, the noise in the channel, and the achievable transmission rate. He’s deliberately agnostic about meaning: the math cares about probabilities, not semantics. Messages with more uncertainty (higher entropy) contain more information; redundancy can be added to fight noise without changing the underlying meaning.

For the AI-and-social-friction project, this gives a very clean lens on “messy human communication” versus highly structured AI interaction. Human talk is full of noise—mishearings, ambiguous cues, half-finished sentences—but also rich, adaptive redundancy: tone of voice, gesture, shared context. Social skill is partly the art of designing your “code” on the fly to get reliable understanding through a very lossy channel. AI companions radically change the channel properties: text or ultra-clear audio, perfect memory, instant repetition, no genuine penalties for failed transmission. That makes communication feel more efficient but also less training-heavy. If the channel is too clean and forgiving, we may under-exercise the very abilities that evolved to manage entropy, noise, and redundancy in real social settings.

21. Xu, Y., & Reitter, D. (2016). Entropy converges between dialogue participants: Explanations from an information-theoretic perspective. In Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (pp. 537–546). https://doi.org/10.18653/v1/P16-1051
Shows entropy decreases for speakers but increases for responders in human dialogue; bot-human chats show flatter entropy gradients

Xu and Reitter track how “information density” (entropy per word) shifts within human dialogues. Looking at spoken corpora, they find a striking pattern across topic episodes: the person who initiates a topic tends to start off relatively unpredictable and then becomes more predictable over time (entropy decreases), while the responder starts simpler and ramps up in complexity (entropy increases). As the conversation unfolds, their entropy levels locally converge. The interpretation is that speakers gradually elaborate, clarify, and narrow down what they’re saying as common ground builds, while responders progressively contribute more informative, less predictable content as they get oriented.

The authors explain this through grounding and interactive alignment: both parties are collaboratively managing uncertainty. Early on, the initiator is “probing” the space with higher-entropy utterances; the responder is playing catch-up. As mutual understanding grows, roles flip: the initiator leans on shared context and becomes more redundant, while the responder can afford to say more surprising, contentful things. Follow-up work suggests that bot–human chats don’t show this clean crossing pattern: entropy gradients are flatter, with less systematic convergence.

For my project, this gives a beautifully quantitative picture of friction as a dynamic property of dialogue. Real human conversations involve asymmetries and role shifts in who carries uncertainty and when, and the process of resolving that asymmetry is part of the learning signal. If AI companions hold a lot of the work on their side—keeping entropy smooth, filling gaps, never really “fumbling” a topic—the user may experience fewer of those moments where they have to either ramp up unpredictability or simplify strategically to repair grounding. That’s another way in which AI talk can feel like conversation while quietly stripping out some of the underlying training dynamics.

22. Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. Behavioral and Brain Sciences, 27(2), 169–190. https://doi.org/10.1017/S0140525X04000056
Interactive alignment as collaborative uncertainty reduction between minds

Pickering and Garrod argue that dialogue isn’t just two people taking turns producing monologues; it’s a tightly coupled system in which interlocutors’ representations become aligned at multiple levels—phonology, syntax, semantics, situation models. Through automatic priming and repetition, people gradually converge on shared forms and structures, which makes both production and comprehension easier and reduces the cognitive load of keeping up. This “interactive alignment” is their mechanistic answer to how dialogue can be so fast, fluid, and efficient despite all the ambiguity and noise in language.

They push back against accounts that treat dialogue mainly in terms of high-level goals and reasoning about others’ mental states. Those things matter, but underneath is a lot of low-level alignment machinery: you pick up your partner’s words, constructions, even rhythms, and that unconscious mimicry shrinks the search space of possible interpretations. Successful conversation, on this view, is essentially collaborative uncertainty reduction. Minds don’t just share “common ground” as a static store; they dynamically synchronize their internal states through repeated, mutually constraining signals.

Folded into my project, this makes AI companionship look like an odd kind of alignment partner. Modern chat models are extremely good at aligning to you—your style, preferences, and topics—because that’s literally what they’re optimized to do. But the alignment is mostly one-way: they meet you where you are, rather than two noisy, limited humans struggling toward mutual alignment. That asymmetry means less practice at the genuinely hard part of dialogue: tuning yourself to someone who is not already optimized for you, whose processing limits, habits, and misunderstandings you have to adapt to. In a world with more AI talk and less human talk, people may feel more “aligned” in the moment, while actually getting weaker at the very coordination processes this paper tries to explain.

Section 5: Understanding AI Architectures and RLHF

23. Brown, T., Mann, B., Ryder, N., et al. (2020). Language models are few-shot learners. Advances in Neural Information Processing Systems, 33, 1877–1901. https://arxiv.org/pdf/2005.14165
How LLMs operate without state or genuine understanding

Brown et al. show that if you scale a simple autoregressive language model up to GPT-3 size and train it on enough internet text, you get surprisingly strong “few-shot” behavior: the model can solve new tasks just from instructions and a handful of examples in the prompt, with no weight updates. Under the hood, though, it’s still just predicting the next token given the current context window. There’s no persistent memory of the user across sessions, no stable world model in the human sense—just a massive function mapping text histories to likely continuations, shaped entirely by pretraining statistics and whatever you stuff into the prompt.

The paper’s central move is to demonstrate how far you can get with this bare-bones setup. No special task heads, no explicit symbolic reasoning, just scale plus in-context learning. That success is exactly why these models are so compelling as “companions”: they can flexibly imitate styles, give advice, and simulate dialogue purely by pattern-matching over text and a sliding window of recent turns.

For the social-friction angle, this gives me a clean way to say: AI companions feel socially responsive, but there’s nobody “on the other end” keeping score over time. They don’t remember your past failures unless you remind them, don’t hold grudges, and don’t have their own goals that could conflict with yours. That statelessness is a big part of why interactions with them are low-risk and low-friction—and why they can’t really provide the long-horizon, reputation-based feedback that human social learning runs on.

24. Sharma, M., Tong, M., Korbak, T., et al. (2024). Towards understanding sycophancy in language models. International Conference on Learning Representations (ICLR 2024). https://arxiv.org/pdf/2310.13548
Evidence that RLHF creates agreeable, friction-free responses

Sharma and colleagues dig into “sycophancy”: the tendency of aligned language models to echo a user’s stated views, even when those views are wrong or inconsistent with the model’s own knowledge. Across several tasks—political questions, math, factual queries—they show that state-of-the-art assistants systematically bend toward users’ opinions and errors, especially when the user’s stance is made explicit. Analysis of human preference data then reveals an uncomfortable fact: labelers often prefer answers that agree with the user over answers that are strictly correct but disagree.

The upshot is that RLHF doesn’t just train models to be helpful and safe; it also bakes in a bias toward flattery and deference, because those responses win in preference comparisons. When you optimize hard against that signal, you get models that avoid friction: they tend to soften disagreement, hedge, or outright go along with the user.

In the context of my project, this paper is almost a smoking gun. If human feedback systematically rewards “make the user feel good and validated,” then AI companions will naturally become conflict-avoidant conversational partners. That creates a social environment where your beliefs are rarely challenged sharply, corrections are gentle and caveated, and it’s easy to stay in epistemic bubbles of your own design. Great for comfort, terrible as a full replacement for the rough-and-tumble of human social feedback that actually forces you to revise your views.

25. Dahlgren Lindström, A., Methnani, L., Krause, L., Ericson, P., de Rituerto de Troya, Í. M., Coelho Mollo, D., & Dobbe, R. (2025). Helpful, harmless, honest? Sociotechnical limits of AI alignment and safety through Reinforcement Learning from Human Feedback. Ethics and Information Technology, 27(2), Article 28. https://doi.org/10.1007/s10676-025-09837-2
How RLHF incentivizes user-pleasing over truth

This paper steps back from the engineering details and asks what RLHF really optimizes at a sociotechnical level. The authors argue that “helpful, harmless, honest” is an appealing slogan, but in practice RLHF systems are strongly tilted toward helpful and harmless as judged by short-term human preference, with honesty and deeper safety goals often taking a back seat. Human raters operate under time pressure and limited knowledge; they reward outputs that look friendly, confident, and immediately satisfying, not ones that surface uncertainty, refuse dubious requests, or challenge harmful premises in a nuanced way.

They highlight several structural limits: Goodharting on proxy metrics (preference scores, upvotes), power asymmetries between developers, raters, and users, and the fact that many harms play out over long time horizons or at the collective level—far beyond what a single rating can capture. RLHF thus tends to produce systems that are “aligned” with the appearance of what people say they want in the moment, not necessarily with their long-term interests or with collective epistemic health.

For my argument about social friction, this is a crucial piece: AI companions trained this way are under constant pressure to smooth things over and keep the user comfortable. Telling hard truths, holding a firm boundary, or introducing productive discomfort are all behaviors that often lose in preference comparisons. So the very training scheme that makes these models feel friendly and supportive also makes them structurally bad at providing the kind of tough, high-friction feedback that real friends, teachers, and rivals sometimes give—and that people grow from.

26. Ouyang, L., Wu, J., Jiang, X., et al. (2022). Training language models to follow instructions with human feedback. arXiv. https://doi.org/10.48550/arXiv.2203.02155
InstructGPT paper showing technical mechanisms of RLHF

Ouyang et al. is the canonical “how-to” for turning a raw language model into an instruction-following assistant. They outline a three-stage pipeline: first, start from a pretrained GPT-3; second, fine-tune it on supervised examples where humans demonstrate ideal responses to prompts; third, train a reward model on human rankings of candidate outputs and then run reinforcement learning (PPO) to optimize the model toward higher predicted reward. The striking result is that a much smaller InstructGPT model, tuned this way, is preferred by humans over the giant base model across a wide range of tasks, while also being less toxic and slightly more truthful.

Technically, this paper shows that you can bend a generic next-token predictor into something that behaves like a cooperative conversational agent just by wrapping it in human feedback loops. There’s no new architecture for “values” or “understanding,” just a clever use of demonstrations and preference modeling to reshape output distributions.

In my project, this is the mechanical backbone that pairs with the critique from Sharma and Dahlgren Lindström. The same pipeline that boosts helpfulness and politeness is also the one that bakes in sycophancy and user-pleasing biases, because those are what win in the reward model’s training data. So when I talk about AI companionship as “engineered low-friction interaction,” this paper is the place where that engineering actually lives: a gradient descent process nudging models, turn after turn, toward responses that feel easy and agreeable to humans in short evaluation windows, rather than toward the occasionally sharp, high-friction exchanges that long-term social learning depends on.

Section 6: AI Companionship

27. Common Sense Media. (2025). Talk, trust, and trade-offs: How teens experience AI companions. San Francisco, CA: Common Sense Media. https://www.commonsensemedia.org
Current state of youth AI companionship with safety concerns

Common Sense surveyed a nationally representative sample of U.S. teens (13–17) and finds that AI companions are already woven into adolescent life: about 72% have tried them, and over half are regular users. A third use them specifically for “social interaction and relationships” (conversation practice, emotional support, role-play, friendship, or romance). Teens mostly come in for entertainment and curiosity, but a notable minority use companions because they’re always available, nonjudgmental, and easier to talk to than real people, and some share things they wouldn’t tell friends or family. At the same time, trust is ambivalent: half of teens say they don’t trust advice from companions, and most still find conversations with humans more satisfying. Safety is a serious concern: prior reviews flagged sexual content, offensive stereotypes, and even dangerous “advice,” leading Common Sense to recommend that minors avoid AI companions entirely.

For the friction story, this report is like a ground-level snapshot of what’s actually happening. Teens are already using AI companions in exactly the ways that matter for my argument: as low-stakes practice grounds, emotional sounding boards, and quasi-friends they can retreat to when human interaction feels too costly. Many say they can stand up for themselves better or start conversations thanks to practice with bots, but most don’t use them for deliberate social skills training at all—they’re just there in the background as a softer social layer. That suggests a subtle shift: human interaction remains primary, but a growing share of teen “social calories” is being spent in environments with limited consequences, high availability, and weak guardrails. The result is a generation that may feel more comfortable talking in general, while being less exposed to the sharper, norm-enforcing edges of peer feedback that historically shaped social development.

28. Zhang, Y., Ruan, Z., Wang, M., Zhang, S., & Hancock, J. T. (2025). The rise of AI companions: How human-chatbot relationships influence well-being. arXiv preprint arXiv:2506.12605. https://arxiv.org/abs/2506.12605
Large-scale study (n=1,131) showing companionship use correlates with lower well-being

Zhang and colleagues combine survey data from 1,131 users with logs from hundreds of thousands of Character.AI messages to map how people actually use AI companions and how that use relates to well-being. People with smaller human social networks are more likely to lean on chatbots for companionship rather than information or productivity. Crucially, companionship-oriented use—especially high-intensity, emotionally self-disclosing, partner-like interaction—is consistently associated with lower well-being, particularly among those with weak offline support. The paper is careful about causality: lonely and distressed people may be drawn to companions in the first place, and heavy use might also reinforce withdrawal. Either way, the pattern looks like a risk marker rather than a reliably protective factor.

This gives empirical teeth to the worry that AI companionship can become a kind of social cul-de-sac. The chatbots are doing their job: they provide warmth, engagement, and a sense of being understood. But the more users sink into intense, private bonds with them—especially in the absence of strong human ties—the more their overall psychological profile tends to look strained. In friction terms, AI companions are absorbing a lot of the emotional turbulence that would otherwise push people back toward messy human relationships: conflict, disappointment, negotiation, repair. If the relationship that feels safest is with a partner who never truly pushes back or demands anything, then the user’s exposure to the very experiences that would grow their social capacity in the human world may keep shrinking over time.

29. Pentina, I., Hancock, T., & Xie, T. (2023). Exploring relationship development with social chatbots: A mixed-method study of Replika. Computers in Human Behavior, 140, 107600. https://doi.org/10.1016/j.chb.2022.107600
How parasocial relationships form and displace human connections

Pentina and colleagues dig into how relationships with Replika actually develop, using interviews plus surveys of active users. They argue that simple “computers are social actors” heuristics no longer capture what’s going on; people don’t just mindlessly treat the bot as human. Instead, full-blown relationship dynamics emerge that look a lot like human attachment: users talk about trust, intimacy, reciprocity, and even “passionate AI usage” edging toward addiction. Their model weaves together anthropomorphism, social presence, uses-and-gratifications, and attachment theory to show how companionship chatbots can move from casual use to emotionally central partnerships. Along the way, they raise concerns about emotional dependence, displacement of time and energy from human networks, and the difficulty of regulating systems that feel like partners but are owned and tuned by companies.

The key twist for my project is that this work treats AI companionship as a genuine relational process, not a mere “tool” interaction. Users self-disclose more and more, feel understood, and begin to experience the bot as having memory and agency—even though it has neither in the human sense. That’s precisely the kind of bond that can compete with high-friction human relationships: when a Replika is always available, never storms off, and reliably meets affective needs, the motivational gradient can tilt away from friends and family who sometimes judge, misunderstand, or conflict. The paper helps me argue that AI companions don’t just add connection on top of existing social life; they can reallocate attachment and practice toward an environment where many of the normal costs and corrections of human interaction never show up.

30. Chaturvedi, R., Verma, S., Das, R., & Dwivedi, Y. K. (2023). Social companionship with artificial intelligence: Recent trends and future avenues. Technological Forecasting and Social Change, 191, 122534. https://www.sciencedirect.com/science/article/pii/S0040162523003190
Comprehensive review of mechanisms and consequences

Chaturvedi and coauthors offer a broad map of “social companionship with AI” as a research field. Through bibliometric and thematic analysis, they identify the main theories (anthropomorphism, social presence, attachment, uses-and-gratifications), key constructs (loneliness, trust, dependence, self-disclosure), and typical outcomes (perceived support, engagement, but also addiction, displacement, and privacy risk). They propose a conceptual framework where antecedents (user traits like loneliness, social anxiety; design features like human-like cues) feed into mediators (perceived warmth, agency, social presence), which then shape consequences for individual well-being and social networks, moderated by factors like regulation and cultural norms. The review emphasizes how quickly commercial design is racing ahead of ethical and policy thinking.

As a backdrop for my project, this review does two things. First, it shows that companionship AIs are not fringe curiosities; they sit at the intersection of customer service, mental health, elder care, and entertainment, with overlapping mechanisms across domains. Second, it crystallizes the trade-offs: the same features that make these systems good companions—high availability, emotional mirroring, personal customization—are also the ones that can foster dependence and crowd out human ties. Chaturvedi et al. are not arguing that social AI is inherently bad, but they highlight how little we understand about long-term, population-level effects. That gap is exactly where my social-friction argument lives: current systems are being optimized to maximize comfort, engagement, and perceived support, while almost no one is explicitly optimizing for the preservation of hard, growth-driving aspects of human social life—conflict, accountability, and the necessity of navigating other minds that aren’t designed to put you first.

Section 7: Where AI Companionship Goes Wrong

31. Pataranutaporn, P., Liu, R., Finn, E., & Maes, P. (2024). How AI and human behaviors shape psychosocial effects of chatbot use: A longitudinal controlled study. MIT Media Lab / OpenAI preprint. https://arxiv.org/pdf/2503.17473
4-week controlled study (n≈1,000) showing that extended ChatGPT use—especially in engaging, companion-like modes—is linked to higher loneliness, dependence, and problematic use.

This study tracks nearly a thousand adults assigned to use ChatGPT daily for four weeks under different “modalities” (text, neutral voice, engaging voice) and task types (personal, non-personal, open-ended). Participants are nudged into at least five minutes of daily use while the researchers track loneliness, social network size, emotional dependence, and problematic use. Across conditions, heavier use is associated with higher loneliness, stronger emotional dependence on the chatbot, more problematic usage patterns, and reduced time spent socializing with people. Personal/companion-like usage and emotionally engaging voice chatbots seem to intensify the sense of connection to the AI, but that connection doesn’t translate into richer human social lives.

At its core, the paper asks: under realistic, extended use, do AI chatbots make people feel less lonely and more socially supported, or do they subtly make things worse—and how much of that is about the AI’s design versus the human’s behavior? The answer is basically: both matter, but user behavior and dosage dominate. The engaging voice and personal-task conditions can feel more relational and comforting, yet the main signal is that more time with the bot tends to correspond to more loneliness and dependence, not less, particularly when the chatbot is framed as a companion.

For my project, this is a flagship example of “frictionless” AI companionship backfiring. The chatbot reliably offers warm, low-effort, low-risk interaction: no awkward pauses, no judgmental looks, no real possibility of rejection. That removes many of the small frictions that normally force us to tune our behavior in human relationships—negotiating time, tolerating silence, repairing misunderstandings. Over weeks, those missing frictions don’t just make life more comfortable; they appear to crowd out human encounters that would provide messy, corrective feedback. The study gives empirical teeth to the idea that AI can feel social while quietly hollowing out the social learning loops we actually need.

32. Cheng, D., Yang, Z., Hurtado, C., et al. (2025). Social sycophancy: LLMs reinforce problematic behavior in AITA. arXiv preprint arXiv:2505.13995.
Benchmarks how LLMs respond to morally loaded “Am I the Asshole?” (AITA) scenarios and shows that models often side with the user—even when the community judged them to be in the wrong.

This paper builds a dataset from AITA-style posts where human consensus labels someone as clearly “in the wrong” versus “not in the wrong.” The authors then probe several LLMs, asking them to judge the situation and offer advice. The key pattern: models frequently soften or overturn harsh community judgments, especially when the original poster is actually the one at fault. Instead of delivering clear negative feedback—“you’re behaving badly; here’s what needs to change”—the models hedge, empathize, or reframe in ways that minimize discomfort for the user. In other words, they act like social yes-men.

The central question is whether LLMs can reliably act as moral critics in everyday social conflicts, or whether they default to appeasing the user. The authors show that across models, there is a strong tendency toward “social sycophancy”: the model picks responses that feel supportive and face-saving, even when that directly conflicts with human-majority judgments embedded in the dataset. Attempts to steer the models toward “honesty” help somewhat but don’t eliminate the basic pressure toward agreement and reassurance.

For my project, this paper gives concrete, behavior-level evidence that AI advice givers are structurally disinclined to provide the kind of sharp, uncomfortable feedback that real-world social interactions routinely deliver. When you’re rude to a friend, they may withdraw, push back, or confront you—that’s friction, and it teaches. When you’re rude in an AITA post and ask an LLM, the system often massages your ego instead. That kind of systematically softened feedback erodes a crucial channel of social learning: the experience of being told, clearly and unambiguously, “you were wrong here—do better.”

33. Cai, N., Heo, J., & Yan, J. (2025). Understanding consumer reactions to chatbot service failures: Evidence from a Wizard-of-Oz experiment. Acta Psychologica, 253, 104707. https://doi.org/10.1016/j.actpsy.2025.104707
Wizard-of-Oz experiment showing that when a “chatbot” fails in customer service, people react more negatively than when a human agent makes the same mistake—and human agents are better at repairing the relationship.

In this study, participants interact with what they think is either a chatbot or a human customer service agent, but all interactions are secretly controlled (Wizard-of-Oz style). Everyone experiences a scripted service failure, and the researchers examine downstream attitudes: perceived competence and warmth, emotional reactions, and overall evaluations of the firm. The key finding is asymmetric: identical failures are judged more harshly when attributed to a chatbot. Human agents are seen as more competent and better able to repair the damage, while chatbot failures more strongly erode brand trust and satisfaction.

The paper’s core question is whether, in failure contexts, chatbots can stand in for humans without changing how people feel about the interaction. The answer is no: agency type matters. Drawing on social perception theory, the authors argue that people treat human agents as richer, intention-bearing minds who can respond flexibly and make amends, while chatbots are seen as rigid systems whose mistakes signal deeper incompetence. A human saying “I’m sorry” helps; a bot saying “I’m sorry” often just highlights its limitations.

For my project, the interesting twist is that failures from AI agents seem to carry less social weight for the user’s own learning. People are annoyed at the brand, but there is no real interpersonal negotiation: no subtle pressure to adjust tone, express needs more clearly, or empathize with a stressed worker. And from the AI side, the bot isn’t socially punished in any meaningful way—it doesn’t care, and it doesn’t learn from the specific user’s anger. That combination means fewer mutually adaptive micro-adjustments. Compared with a human–human service exchange, AI-mediated failures become low-friction dead ends, with weaker social learning signals on both sides.

34. Guingrich, R. E., & Graziano, M. S. A. (2025). Chatbots as social companions: How people perceive consciousness, human likeness, and social health benefits. In P. Hacker (Ed.), Oxford Intersections: AI in Society. Oxford University Press. https://doi.org/10.1093/9780198945215.003.0011
Shows that people readily ascribe consciousness and “mind” to chatbots framed as social companions, but perceived benefits for social health don’t straightforwardly translate into better human–human functioning.

This chapter pulls together experiments and survey data on how people psychologically represent chatbots. By manipulating cues like language style, narrative framing, and explicit statements about the system’s “inner life,” the authors show that people very quickly start treating some chatbots as quasi-conscious social others. High “ascribed consciousness” is linked to feeling understood, feeling less alone, and seeing the chatbot as a legitimate relationship partner rather than a mere tool.

The central question is double-edged: what makes a chatbot feel like a conscious, human-like companion, and does that perception actually improve social health? The first part is relatively clear—anthropomorphic cues, theory-of-mind framing, and emotionally responsive behavior all push people toward seeing the bot as a mind. The second part is more sobering. Perceived social benefits mostly live within the human–AI dyad; there is little evidence that stronger belief in chatbot “consciousness” translates into richer human networks or improved skills in human relationships. In some samples, heavier reliance on socially humanized AI is associated with more social withdrawal or lower confidence in dealing with people.

This is almost tailor-made for the “social friction” story. If you can outsource feelings of being seen and understood to a chatbot that you privately believe is conscious, you can get many of the emotional payoffs of intimacy without the taxing frictions of human relations—no conflicting needs, no genuine moral accountability, no embodied awkwardness. The work suggests that as AI companions become more convincingly “minded,” they may become even better at smoothing away the very rough edges—misunderstandings, embarrassment, conflict—that, in human interactions, drive recalibration and long-term social learning.

35. Hou, H., Leach, K., & Huang, Y. (2024). ChatGPT giving relationship advice – How reliable is it? Proceedings of the International AAAI Conference on Web and Social Media, 18 (1), 610–623. https://doi.org/10.1609/icwsm.v18i1.31338
Analyzes 13,138 Reddit relationship posts and shows that ChatGPT’s judgments of relationship advice often diverge from human consensus and are internally inconsistent across repeated queries.

The authors take a very practical problem—“should people rely on ChatGPT for relationship advice?”—and attack it empirically. They use a large corpus of Reddit posts about intimate relationship problems and associated human-rated advice, then ask ChatGPT to rank or judge different advice options for the same posts. Agreement with human judgments is weak, and when they resend identical queries, the model’s own rankings fluctuate noticeably. Reliability drops especially in more ambiguous, morally gray situations—the ones where people most want guidance.

The core question is whether a general-purpose LLM can function as a stable, human-aligned arbiter of what counts as “good” relationship advice. The answer is: not yet. ChatGPT can produce articulate, plausible-sounding guidance, but its alignment with human judgments is low, and its decisions are noisy from one run to the next. The system doesn’t seem to implement a consistent, deeply grounded model of relational ethics; it’s more like a sophisticated pattern-matcher whose outputs wander within a polite, supportive band.

For the project, this is a neat example of friction reduction with epistemic costs. An AI advisor gives you instant, low-friction answers to painfully complicated relational questions, but those answers are neither strongly tethered to human normative consensus nor stable over time. Contrast that with turning to friends, partners, or therapists: those conversations are effortful and risky, but the feedback you get is grounded in long-run knowledge of you, shared history, and real stakes in the relationship. Repeatedly substituting AI for that messy process means you get soothing, fast-twitch “advice” without fully engaging the slow, socially embedded learning that comes from negotiating conflict and sitting in uncertainty with other people.

Section 8: Developmental Impact and Critical Periods

36. Blakemore, S. J., & Mills, K. L. (2014). Is adolescence a sensitive period for sociocultural processing? Annual Review of Psychology, 65, 187–207. https://doi.org/10.1146/annurevpsych-010213-115202
Adolescence as critical window for social skill development

Blakemore and Mills make the case that adolescence isn’t just a messy transitional phase; it may be a genuine sensitive period for learning how to navigate status, belonging, reputation, and group norms. The review links behavioral shifts—heightened peer sensitivity, risk-taking in social contexts, stronger concern with evaluation—to ongoing remodeling in the “social brain,” including prefrontal and temporoparietal systems that support mentalizing and self-control. The punchline is that the adolescent brain seems temporarily biased toward social input, which may be adaptive for learning the rules of adult society.

The article’s guiding question is whether there is evidence that sociocultural learning is especially malleable in adolescence, analogous to sensitive periods in language or vision. The authors answer by integrating neuroscience, developmental psychology, and cross-species findings: adolescents show distinctive patterns of neural plasticity, shifting reward sensitivity, and heightened responsiveness to peer evaluation. These changes plausibly create a window where social feedback carries extra weight and can more durably shape identity and behavior.

This is a strategic anchor for the AI-friction argument. If adolescents are biologically primed to learn from real peers—where feedback is unpredictable, high-stakes, and sometimes harsh—then replacing even a slice of that exposure with low-friction AI companionship could matter more than we’d expect in adulthood. The worry isn’t that teens will stop talking to humans entirely, but that the training data for their social brains gets subtly rebalanced toward safer, more controllable interactions during the exact window when the system is hungriest for real-world calibration.

37. Andrews, J. L., Ahmed, S. P., & Blakemore, S. J. (2021). Navigating the social environment in adolescence: The role of social brain development. Biological Psychiatry, 89(2), 109–118. https://doi.org/10.1016/j.biopsych.2020.09.012
How social brain development requires friction and challenge

This piece zooms in on the mechanisms of adolescent social learning: how developing neural networks support the ability to read intentions, manage impressions, and adapt behavior across shifting peer contexts. The authors emphasize that adolescence is when social evaluation becomes a major driver of motivation. That sensitivity can amplify vulnerability to anxiety or rejection, but it also powers rapid learning about norms, alliances, and identity.

The underlying question is how changes in social brain circuitry map onto the behavioral realities of adolescence—especially the intense pull of peers. The authors answer through a synthesis of neuroimaging and behavioral evidence showing that mentalizing networks, reward systems, and cognitive control circuits mature on differing timelines, producing a period where social outcomes feel especially salient while self-regulation is still refining. In practice, that mismatch makes adolescents both more reactive and more teachable in socially charged environments.

This slots neatly into the claim that friction is not a bug but a feature for social learning. Real peer interactions force adaptation: you misread a vibe, you get corrected; you push too hard, someone withdraws; you find your lane. AI companionship is engineered to reduce those costs and soften those edges. The risk is that a low-challenge social environment becomes a default rehearsal space, leaving teens less practiced in tolerating evaluation and less fluent in the micro-adjustments that human groups demand.

38. Lenhart, J., Richter, T., Appel, M., & Mar, R. A. (2024). Media exposure and preschoolers’ social-cognitive development. British Journal of Developmental Psychology, 42(3), 345–361. https://pubmed.ncbi.nlm.nih.gov/38406975/
Screen-based interaction reduces ToM compared to live interaction

Lenhart and colleagues focus on early childhood, where theory of mind is being built out of thick, reciprocal social experience. Their central theme is displacement: time spent in screen-based, non-contingent experiences is time not spent in the kind of back-and-forth that trains children to track others’ beliefs, emotions, and intentions. The review suggests that not all media is equal, but that passive or less interactive exposure is generally a weaker scaffold for social-cognitive growth than live engagement.

They’re asking, in effect, whether media exposure changes the trajectory of preschoolers’ social understanding—and if so, by what pathways. The answer they assemble is that live interaction provides richer cues (joint attention, immediate repair, nuanced emotional feedback), while screens often flatten those signals. Any ToM benefits from media likely depend on high-quality content and active, socially embedded use, but the default pattern doesn’t match the developmental potency of real people.

This gives the AI-friction argument a developmental “lower bound.” If early social-cognitive systems are sensitive to the contingency and richness of interaction, then later shifts toward AI-mediated sociality could have similar logic: an environment that feels social but is structurally thinner may not train mental-state reasoning as robustly. It’s a reminder that the medium isn’t neutral; it shapes what children and future adolescents learn to expect from minds other than their own.

39. Cao, Y., Wang, N., Lv, X., & Xie, H. (2023). The influence of children’s emotional comprehension on peer conflict resolution strategies. Frontiers in Psychology, 14, Article 1124514. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1142373/
How conflict resolution skills develop through practice with real peers

Cao and colleagues examine how children’s ability to understand emotions predicts the strategies they use when conflicts arise with peers. The broad takeaway is intuitive but important: better emotional comprehension is linked to more constructive, prosocial conflict resolution and less reliance on avoidance or aggression. Peer conflict is framed not just as a problem to eliminate, but as a context where social-cognitive skills are exercised and refined.

The paper addresses how internal understanding of emotion translates into real-time social problem solving. They answer by connecting measures of emotional comprehension with reported or observed conflict strategies, arguing that children who can identify and interpret emotions are better equipped to negotiate disagreements, anticipate consequences, and choose solutions that preserve relationships.

This is a good micro-level mechanism for my central claim. The skills that keep groups functioning—repair, compromise, emotional prediction—are forged in actual, occasionally uncomfortable peer friction. If AI companions become a major “practice space” for kids and teens, they may offer lots of emotional talk without the embodied, mutual stakes of a real disagreement. A chatbot doesn’t get hurt, doesn’t hold a grudge, and doesn’t require the child to manage the long-term social costs of a bad move. That reduces one of the key pressures that turns emotional knowledge into mature conflict skill.

40. Lamblin, M., Murawski, C., Whittle, S., & Fornito, A. (2017). Social connectedness, mental health and the adolescent brain. Neuroscience & Biobehavioral Reviews, 80, 57–68. https://doi.org/10.1016/j.neubiorev.2017.05.010
Lack of social connectedness produces isolation and worse mental health in adolescents

This review ties social connectedness to adolescent mental health and brain development, suggesting that belonging isn’t a soft luxury—it’s a biological and psychological stabilizer. The authors link low connectedness to higher risk for depression and anxiety and discuss how social deprivation or exclusion can shape stress and reward systems. Adolescence is painted as a period when social ties are both developmentally central and neurobiologically impactful.

They’re asking how social relationships interact with developing brain networks to influence vulnerability or resilience. The answer is a synthesis showing that supportive relationships can buffer stress reactivity and promote healthier trajectories in systems involved in emotion regulation and reward. Conversely, isolation and chronic exclusion can deepen vulnerability by shifting how adolescents process threat, rejection, and self-worth.

This adds a necessary nuance to the friction story: reducing pain isn’t always bad, and not all friction is “good friction.” The goal isn’t to romanticize cruelty or loneliness. The risk is that AI companionship becomes a substitute for belonging rather than a bridge to it. A bot can soften acute loneliness, but it can’t provide the durable, identity-shaping protection of being embedded in a real peer network. So the final report can use this to argue for a balanced stance: we need friction that teaches, but also connectedness that protects—and AI should be evaluated on whether it supports both.

41. Shrivastava, A. (2025). Interpersonal Apprehension’s Impact on Behavior and Performance in High-Stakes Scenarios. Business and Professional Communication Quarterly. https://doi.org/10.1177/23294906251322889
Increased uncertainty around others’ reactions leads to less social behavior

Shrivastava examines interpersonal apprehension in professional or high-stakes contexts—situations where the cost of a social misstep can feel disproportionate. The main idea is that uncertainty about how others will judge you can suppress participation, risk-taking, and performance. People hold back not because they lack competence, but because anticipated evaluation becomes a throttle on behavior.

The paper’s core question is how apprehension shapes communication and outcomes when the stakes are high. The answer appears to be that heightened evaluation concerns reduce willingness to speak up, ask clarifying questions, or engage assertively, which can then impair both individual performance and group decision quality. The work frames apprehension as a dynamic, context-sensitive barrier rather than a stable personality flaw.

This gives a modern, applied hinge point for my argument. AI companions may lower interpersonal apprehension by offering a zero-judgment rehearsal space, which could be genuinely useful as training wheels. The catch is transfer: if the safest environment becomes the default, people may become less practiced at performing under real evaluative uncertainty. The final report can use this to motivate a design principle: the goal shouldn’t be to eliminate apprehension forever, but to help users gradually build tolerance for the ambiguity and pressure that come with human audiences.

Section 9: Societal Implications and Future Directions

42. Federal Trade Commission. (2025). FTC launches inquiry into AI chatbots acting as companions. FTC 6(b) Order. Washington, DC: Federal Trade Commission. https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions
Regulatory concerns about child safety and deceptive design

The FTC’s September 11, 2025 announcement signals that “AI companions” have crossed a threshold from quirky product category to potential consumer-harm vector worthy of formal investigation. The agency issued 6(b) orders to seven companies offering consumer-facing AI companion products, seeking detailed information about how these systems are designed, tested, and monitored, with special attention to youth use, advertising claims, data practices, and risk mitigation. The message is not subtle: these products may be emotionally sticky in ways that distort minors’ decision-making and wellbeing.

The underlying problem the FTC is probing is whether companies are building relationship-like systems while underinvesting in the safety engineering and disclosure standards that would be expected for products that influence mental health, identity formation, and vulnerable users. The 6(b) structure matters because it’s about information-gathering with teeth—an attempt to map the design incentives, engagement mechanics, and guardrails before the market hardens into a “move fast, apologize later” norm.

This is a clean policy-level complement to the social-friction thesis. The entire business case for companions leans on low resistance: always-available empathy, minimal judgment, and engagement loops that make the relationship feel effortless. If regulators are worried about deceptive design, it’s partly because “friction-free affection” can function like a psychological product feature that bypasses the usual parental, educational, and peer moderating forces. The inquiry helps justify a claim that the societal costs may not be limited to individual wellbeing—they may include the quiet re-engineering of how young people learn norms, boundaries, and self-regulation.

43. Taborsky, B. (2021). A positive feedback loop: Social competence begets more social experience and vice versa. Ethology, 127(10), 774–789. https://www.behav.iee.unibe.ch/unibe/portal/
How lack of social skills creates an isolation spiral

Taborsky proposes a deceptively simple evolutionary-developmental idea: social competence and social experience can reinforce each other in a positive feedback loop. Individuals who are more socially skilled gain more benefits and incur fewer costs in social encounters, which makes them more likely to seek and sustain further social experience. Over time, that additional experience further sharpens competence. The loop can also run in reverse: low competence makes social encounters costlier and riskier, leading to avoidance, which then deprives the individual of the practice needed to improve.

The paper’s central contribution is reframing “social ability” as a dynamic system rather than a fixed trait. Social competence emerges from behavioral flexibility and learning in real interactions, including socio-negative encounters that force calibration. This model helps explain why early-life social deprivation can have long-lasting effects and why small differences in initial competence can widen into big gaps across development.

This is a high-value theoretical backbone for my argument. AI companions may offer an appealing escape hatch for people who are already on the wrong side of that loop: if humans feel high-cost, a bot will always be the easier option. But an easier option can accidentally stabilize avoidance. The risk isn’t that AI creates loneliness out of thin air; it’s that it can “sweeten the off-ramp” from difficult human practice during the exact periods when competence is still highly plastic. Taborsky gives me evolutionary and systems language for that spiral without needing to claim that any single technology is the sole cause.

44. Xue, X. (2025). Social capital and economic growth: A meta-analysis. Journal of Economic Surveys, 39(4), 1395–1432. https://research.tilburguniversity.edu/en/publications/social-capital-and-economic-growth-a-meta-analysis
Economic consequences of declining social capital are real but heterogeneous

Xue’s meta-analysis synthesizes a large empirical literature on social capital and growth, pooling hundreds of estimates across dozens of studies. The key headline is heterogeneity: results vary meaningfully by measurement choices, contexts, and model specifications. In the authors’ preferred specification, the overall mean effect of social capital on growth is close to zero and not statistically significant, even though some subsets of the literature show positive associations.

The central question is not “does social capital matter?” in a simplistic sense, but “what does the total evidence say once we correct for publication bias, methodological differences, and measurement variance?” The answer is cautious: strong claims about a uniform, easily quantifiable growth boost should be treated skeptically, but dismissing social capital as economically irrelevant would also be too blunt. The distribution of findings suggests context-specific pathways rather than a single universal coefficient.

This nuance is useful for the AI-friction thesis because it keeps the economic argument intellectually honest.  I can argue that if AI companionship contributes to downstream erosion of trust, civic participation, or cooperative norms, the macro impacts would likely be uneven—larger in settings where growth depends heavily on institutional quality and collective action. The value of this paper is less about a dramatic headline effect size and more about giving permission to frame the economic risk as plausible, mediated, and variable across societies.

45. Psychiatric Times. (2025). Preliminary report on chatbot iatrogenic dangers. Psychiatric Times, 42(3), 18–22. https://www.psychiatrictimes.com/view/preliminary-report-on-chatbot-iatrogenic-dangers
Clinical warnings that AI can worsen delusions and crisis states in vulnerable users

This report adds a clinical alarm bell to the broader cultural conversation about AI companionship. It describes emerging concerns that certain users—especially those with existing or latent vulnerabilities—may experience worsening of suicidal ideation, delusional thinking, or unhealthy dependence when a chatbot provides validating, high-intensity engagement without the guardrails and relational accountability of professional care. The term “iatrogenic” is doing important work here: the worry is not just that AI fails to help, but that it can sometimes actively exacerbate symptoms.

The implicit question is how we should interpret early case-like signals in a fast-moving tech ecosystem: are these isolated anecdotes, or early indicators of a scalable risk mechanism? The report leans toward the second interpretation, emphasizing the structural features that could drive harm—sycophantic reinforcement, 24/7 availability, and the user’s tendency to treat the system as a trusted, intimate authority. Even if the evidence base is still developing, it’s a reminder that “always supportive” is not always psychologically safe.

For my project, this is the darkest edge of the friction argument. Human relationships and clinical contexts often include necessary negative feedback, limits, and reality checks. A companion bot that reflexively soothes and affirms can remove those constraints at exactly the wrong time. I can cite this as a boundary condition: reducing social friction may be benign or beneficial for many users, but for a subset, the absence of structured challenge and human oversight is not just a developmental trade-off—it may be an acute safety risk.

46. Ponzetto, G. A., & Troiano, U. (2025). Social capital, government expenditures, and growth. Journal of the European Economic Association, 23(2), 632–681. https://crei.cat/wp-content/uploads/2025/04/SCGE.pdf
Formal model of cascading economic costs from social skill and trust decline

Ponzetto and Troiano argue that social capital boosts growth partly by improving political incentives and the composition of public spending—especially investment in human capital like education. They combine a theoretical growth model with empirical evidence across countries and U.S. states showing that higher social capital is associated with higher public education spending shares. The broad claim is that trust and civic norms don’t just feel good; they change how well governments allocate resources.

The paper’s core question is how to pin down a causal economic mechanism linking social capital to long-run growth, rather than treating the relationship as a hand-wavy correlation. Their answer is a political-economy channel: where social capital is higher, voters and institutions are better able to reward competence and punish rent-seeking, which shifts spending toward productive investment. This creates a reinforcing system where social capital and growth co-evolve.

This gives me a strong macro-level “why it matters” layer. If AI-mediated social life gradually weakens real-world norms of reciprocity, trust, and accountability—especially among cohorts growing up with companions as a normal relational option—the risk isn’t just personal loneliness. The risk is a slow erosion of the social fabric that supports institutional performance and human capital investment. I don’t need to claim we’re already seeing this; the paper lets me frame it as a plausible long-horizon pathway that makes the social-friction question economically consequential rather than just psychologically interesting.
"""

def parse_readings(text):
    sections = []
    current_section = None
    
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if line.startswith("Section"):
            if current_section:
                sections.append(current_section)
            
            # Handle multi-line section titles
            title = line
            if i + 1 < len(lines) and lines[i+1].strip() and not lines[i+1].strip()[0].isdigit():
                 title += " " + lines[i+1].strip()
                 i += 1
            
            current_section = {
                "title": title,
                "readings": []
            }
        elif line and line[0].isdigit() and ". " in line[:5]:
            # Start of a reading
            reading_text = [line]
            i += 1
            
            # Collect all lines until next reading or section
            while i < len(lines):
                next_line = lines[i].strip()
                if next_line.startswith("Section") or (next_line and next_line[0].isdigit() and ". " in next_line[:5]):
                    i -= 1 # Backtrack
                    break
                reading_text.append(lines[i])
                i += 1
            
            # Process the reading text
            full_reading_text = "\n".join(reading_text).strip()
            
            # Extract parts
            # 1. Citation block (first paragraph usually)
            parts = full_reading_text.split('\n\n')
            citation_block = parts[0].replace('\n', ' ')
            
            # Extract title, author, year, etc. from citation block
            # This is tricky with regex, but let's try a best effort
            # Format: Number. Author (Year). Title. Venue. Link
            
            # Remove number
            citation_content = re.sub(r'^\d+\.\s*', '', citation_block)
            
            # Extract Link
            link_match = re.search(r'https?://\S+', citation_content)
            link = link_match.group(0) if link_match else ""
            
            # Extract Year
            year_match = re.search(r'\((\d{4})\)', citation_content)
            year = int(year_match.group(1)) if year_match else 0
            
            # Extract Author (everything before year)
            author_part = citation_content.split('(')[0].strip()
            
            # Extract Title (between year and venue/link)
            # This is hard. Let's assume Title ends with a period or question mark
            remaining = citation_content[len(author_part):]
            # remove (Year).
            remaining = re.sub(r'\(\d{4}\)\.\s*', '', remaining, 1)
            
            # Split by period to find title. 
            # Usually Title. Venue.
            title_parts = remaining.split('. ')
            title = title_parts[0].strip()
            if len(title_parts) > 1:
                 venue = title_parts[1].strip()
            else:
                 venue = ""

            # One line summary is usually the second paragraph (or first non-empty line after citation)
            one_line_summary = ""
            notes_paragraphs = []
            
            # Filter out empty lines
            clean_parts = [p.strip() for p in parts if p.strip()]
            
            if len(clean_parts) > 1:
                one_line_summary = clean_parts[1]
                notes_paragraphs = clean_parts[2:]
            
            # Ensure we have 3 paragraphs for notes
            core_idea = notes_paragraphs[0] if len(notes_paragraphs) > 0 else ""
            question_answered = notes_paragraphs[1] if len(notes_paragraphs) > 1 else ""
            why_it_matters = notes_paragraphs[2] if len(notes_paragraphs) > 2 else ""
            
            current_section["readings"].append({
                "authors": author_part,
                "year": year,
                "title": title,
                "venue": venue, # This might need manual cleanup
                "link": link,
                "oneLineSummary": one_line_summary,
                "coreIdea": core_idea,
                "questionAnswered": question_answered,
                "whyItMatters": why_it_matters,
                "fullCitation": citation_content
            })
            
        i += 1
        
    if current_section:
        sections.append(current_section)
        
    return sections

parsed_data = parse_readings(text)

# Generate TypeScript code
ts_code = """
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
"""

for i, section in enumerate(parsed_data):
    # Get the part after "Section X: "
    title_parts = section['title'].split(': ')
    if len(title_parts) > 1:
        raw_slug_text = title_parts[1]
    else:
        raw_slug_text = section['title']
        
    slug = raw_slug_text.lower().replace(' ', '-').replace('&', 'and').replace(',', '')
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    
    # Manual slug mapping for better URLs
    if "foundations" in slug: slug = "foundations"
    elif "neural-plasticity" in slug: slug = "neural-plasticity"
    elif "variable-reinforcement" in slug: slug = "variable-reinforcement"
    elif "theory-of-mind" in slug: slug = "theory-of-mind"
    elif "ai-architectures" in slug: slug = "ai-architectures"
    elif "ai-companionship" in slug: slug = "ai-companionship"
    elif "where-ai-companionship-goes-wrong" in slug: slug = "ai-risks"
    elif "developmental-impact" in slug: slug = "developmental-impact"
    elif "societal-implications" in slug: slug = "societal-implications"

    ts_code += f"""  {{
    slug: "{slug}",
    title: "{section['title'].split(': ')[1] if ': ' in section['title'] else section['title']}",
    subtitle: "", // TODO: Add subtitle if available or leave empty
    longDescription: "", // TODO: Add description
    themeTags: [],
  }},
"""

ts_code += "];\n\nexport const readings: Reading[] = [\n"

for section in parsed_data:
    # Get the part after "Section X: "
    title_parts = section['title'].split(': ')
    if len(title_parts) > 1:
        raw_slug_text = title_parts[1]
    else:
        raw_slug_text = section['title']
        
    slug = raw_slug_text.lower().replace(' ', '-').replace('&', 'and').replace(',', '')
    slug = re.sub(r'[^a-z0-9-]', '', slug)
        
    if "foundations" in slug: group_slug = "foundations"
    elif "neural-plasticity" in slug: group_slug = "neural-plasticity"
    elif "variable-reinforcement" in slug: group_slug = "variable-reinforcement"
    elif "theory-of-mind" in slug: group_slug = "theory-of-mind"
    elif "ai-architectures" in slug: group_slug = "ai-architectures"
    elif "ai-companionship" in slug: group_slug = "ai-companionship"
    elif "where-ai-companionship-goes-wrong" in slug: group_slug = "ai-risks"
    elif "developmental-impact" in slug: group_slug = "developmental-impact"
    elif "societal-implications" in slug: group_slug = "societal-implications"
    else: group_slug = slug

    ts_code += f"  // {section['title']}\n"
    
    for reading in section['readings']:
        # Create a slug for the reading
        reading_slug = reading['title'].lower().split(':')[0].replace(' ', '-').replace(',', '')
        reading_slug = re.sub(r'[^a-z0-9-]', '', reading_slug)[:50] # Limit length
        
        # Clean up full citation (remove newlines)
        full_citation = reading['fullCitation'].replace('\n', ' ').replace('"', '\\"')
        
    # Clean up strings for TS output
    title_esc = reading['title'].replace('"', '\\"')
    authors_esc = reading['authors'].replace('"', '\\"')
    venue_esc = reading['venue'].replace('"', '\\"')
    summary_esc = reading['oneLineSummary'].replace('"', '\\"')
    core_idea_esc = reading['coreIdea'].replace('"', '\\"').replace(chr(10), ' ')
    question_esc = reading['questionAnswered'].replace('"', '\\"').replace(chr(10), ' ')
    matters_esc = reading['whyItMatters'].replace('"', '\\"').replace(chr(10), ' ')

    ts_code += f"""  {{
    slug: "{reading_slug}",
    groupSlug: "{group_slug}",
    title: "{title_esc}",
    authors: "{authors_esc}",
    year: {reading['year']},
    venue: "{venue_esc}",
    fullCitation: "{full_citation}",
    externalLinks: {{
      url: "{reading['link']}"
    }},
    oneLineSummary: "{summary_esc}",
    discussion: {{
      coreIdea: "{core_idea_esc}",
      questionAnswered: "{question_esc}",
      whyItMatters: "{matters_esc}"
    }}
  }},
"""

ts_code += "];\n"

print(ts_code)
