# Content TODO

This file tracks content that needs to be added or updated.

## Paper

- [ ] Review and finalize `src/content/paper.mdx`
- [ ] Add PDF version to `public/paper.pdf` (optional)
- [ ] Update abstract if needed

## Readings

### Readings with Complete Discussions (6 total)
These have full 3-section discussions:

1. ✅ Goffman (1955) - On Face-Work
2. ✅ Sacks et al. (1974) - Turn-Taking
3. ✅ Shannon (1948) - Mathematical Theory of Communication
4. ✅ Ouyang et al. (2022) - InstructGPT/RLHF
5. ✅ Sharma et al. (2024) - Understanding Sycophancy
6. ✅ Pataranutaporn et al. (2024) - Longitudinal Effects

### Readings Needing Discussions (38 remaining)

To add a discussion, edit `src/content/readings.ts` and find the reading by slug.
Replace `discussion: null` with:

```typescript
discussion: {
  coreIdea: "250-350 words explaining the core idea...",
  questionAnswered: "What question is this paper answering?",
  whyItMatters: "Why does this matter for the social friction project?",
}
```

#### Group 1: Foundations of Social Friction
- [ ] `ward-1892-social-friction` - Lester Ward on social friction
- [ ] `hawkins-2019-norms` - Emergence of social norms

#### Group 2: Face-to-Face Interaction
- [ ] `hadley-2022-face-to-face` - Speech and face-to-face interaction
- [ ] `ransom-2022-face-to-face-learning` - Face-to-face learning

#### Group 3: Neural Plasticity & Social Learning
- [ ] `kleim-2008-plasticity` - Experience-dependent neural plasticity
- [ ] `davis-2023-neural-feedback` - Neural mechanisms of social feedback
- [ ] `galvan-2010-adolescent-plasticity` - Adolescent neural plasticity
- [ ] `bandura-1977-social-learning` - Social learning theory
- [ ] `hutton-2022-media-brain` - Media use and brain structure
- [ ] `grusec-2010-socialization` - Domain-specific socialization

#### Group 4: Variable Reinforcement & Social Calibration
- [ ] `schultz-2015-dopamine` - Dopamine reward prediction error
- [ ] `frank-2004-carrot-stick` - Carrot vs stick in learning
- [ ] `hofmans-2025-adolescents-uncertainty` - Adolescents processing uncertainty
- [ ] `krach-embarrassment` - Neural basis of embarrassment

#### Group 5: Theory of Mind & Communication
- [ ] `yu-wellman-2023-tom` - Theory of mind agent-based model
- [ ] `horton-2002-audience-design` - Speakers and audience design
- [ ] `horton-2005-audience-design` - Common ground and memory

#### Group 6: Information Theory & Dialogue
- [ ] `xu-2016-entropy-dialogue` - Entropy convergence in dialogue
- [ ] `pickering-2004-alignment` - Interactive alignment theory

#### Group 7: RLHF & Sycophancy
- [ ] `brown-2020-gpt3` - GPT-3 few-shot learning
- [ ] `dahlgren-2025-rlhf-limits` - Sociotechnical limits of RLHF
- [ ] `cheng-2025-social-sycophancy` - Social sycophancy in moral judgments

#### Group 8: AI Companionship Evidence
- [ ] `common-sense-2025-teens-ai` - Teens and AI chatbots
- [ ] `zhang-2025-ai-wellbeing` - AI companions and well-being
- [ ] `pentina-2023-replika` - Replika relationship development
- [ ] `chaturvedi-2023-companionship-review` - AI companionship review
- [ ] `cai-2025-chatbot-failures` - Consumer reactions to chatbot failures
- [ ] `hou-2024-relationship-advice` - AI relationship advice reliability

#### Group 9: Societal Implications & Policy
- [ ] `blakemore-2014-adolescence` - Adolescence as sensitive period
- [ ] `andrews-2021-adolescent-brain` - Social brain in adolescence
- [ ] `lenhart-2024-media-tom` - Media exposure and theory of mind
- [ ] `cao-2023-peer-conflict` - Peer conflict resolution
- [ ] `lamblin-2017-social-connectedness` - Social connectedness and brain
- [ ] `shrivastava-2025-interpersonal` - Interpersonal apprehension
- [ ] `ftc-2025-ai-companions` - FTC inquiry into AI companions
- [ ] `taborsky-2021-social-competence` - Social competence feedback loop
- [ ] `xue-2025-social-capital` - Social capital meta-analysis
- [ ] `ponzetto-2025-social-capital` - Social capital and government
- [ ] `psychiatric-times-2025` - Iatrogenic dangers editorial

## Links Needing Verification

These readings have `needsLink: true` and need DOI/URL verification:

- [ ] `ward-1892-social-friction` - Find archive link
- [ ] `davis-2023-neural-feedback` - Add DOI
- [ ] `bandura-1977-social-learning` - Add publisher link
- [ ] `hutton-2022-media-brain` - Add DOI
- [ ] `hofmans-2025-adolescents-uncertainty` - Add DOI
- [ ] `yu-wellman-2023-tom` - Add DOI
- [ ] `dahlgren-2025-rlhf-limits` - Add arXiv link
- [ ] `cheng-2025-social-sycophancy` - Add arXiv link
- [ ] `zhang-2025-ai-wellbeing` - Add arXiv link
- [ ] `pataranutaporn-2024-longitudinal` - Add DOI/link
- [ ] `cai-2025-chatbot-failures` - Add DOI
- [ ] `hou-2024-relationship-advice` - Add DOI
- [ ] `andrews-2021-adolescent-brain` - Add DOI
- [ ] `lenhart-2024-media-tom` - Add DOI
- [ ] `cao-2023-peer-conflict` - Add DOI
- [ ] `shrivastava-2025-interpersonal` - Add link
- [ ] `taborsky-2021-social-competence` - Add DOI
- [ ] `xue-2025-social-capital` - Add DOI
- [ ] `ponzetto-2025-social-capital` - Add DOI
- [ ] `psychiatric-times-2025` - Add link

## Images

All images downloaded and in place:
- ✅ `network.jpg`
- ✅ `city-bokeh.jpg`
- ✅ `phone-glow.jpg`
- ✅ `concert-phone.jpg`
- ✅ `code.jpg`
- ✅ `silhouette.jpg`

## Demos

- [ ] Verify Hugging Face Space URLs are correct and accessible
- [ ] Test demo loading on slow connections
- [ ] Add fallback messages if Spaces are unavailable

## Final Review

- [ ] Proofread all copy
- [ ] Test all internal links
- [ ] Verify external links work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Test walkthrough flow end-to-end
- [ ] Verify localStorage persistence works
