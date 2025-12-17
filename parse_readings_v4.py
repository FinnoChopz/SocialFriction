import re
import json

def parse_readings(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Split into sections
    # We look for lines that look like section headers.
    # Examples:
    # < Section 1: ... >
    # <Section 2: ... >
    # Section 6: ...
    
    # Regex: optional leading '<', then "Section X: Title" anywhere (not just line start)
    # Handles cases where two headers are adjacent on the same line, e.g.
    # "<Section 3: ...><Section 4: ...>" and mixed styles without angle brackets.
    section_start_pattern = re.compile(
        r'(?:<\s*)?Section\s+(\d+):\s*(.*?)(?:>|\n)',
        re.IGNORECASE | re.DOTALL,
    )
    
    raw_matches = list(section_start_pattern.finditer(content))

    # Keep only the first occurrence of each section number to avoid duplicate headers
    # that appear later in the file (e.g., repeated or concatenated headings).
    seen = set()
    matches = []
    for m in raw_matches:
        num = m.group(1)
        if num in seen:
            continue
        seen.add(num)
        matches.append(m)
    
    sections = []
    for i, match in enumerate(matches):
        sec_num = match.group(1)
        title_from_match = (match.group(2) or "").strip()

        start_idx = match.start()
        next_start_idx = matches[i+1].start() if i + 1 < len(matches) else len(content)
        section_block = content[start_idx:next_start_idx]

        # Start content immediately after this matched header
        content_start = match.end()
        section_content = content[content_start:next_start_idx].strip()

        sections.append({
            'number': sec_num,
            'title': title_from_match,
            'content': section_content
        })

    readings_data = []
    
    group_map = {
        '1': 'foundations',
        '2': 'neural-plasticity',
        '3': 'variable-reinforcement',
        '4': 'theory-of-mind',
        '5': 'ai-architectures',
        '6': 'ai-companionship',
        '7': 'ai-risks',
        '8': 'developmental-impact',
        '9': 'societal-implications'
    }

    for section in sections:
        # print(f"Processing Section {section['number']}: {section['title']}")
        group_slug = group_map.get(section['number'], 'unknown')
        
        # Split by reading number "N. "
        reading_pattern = re.compile(r'\n(\d+)\.\s+')
        parts = reading_pattern.split('\n' + section['content'])
        
        for i in range(1, len(parts), 2):
            r_num = parts[i]
            r_text = parts[i+1]
            
            lines = r_text.strip().split('\n')
            
            # 1. Extract Citation
            # Find URL/DOI line
            url_index = -1
            for idx, line in enumerate(lines):
                if 'http' in line or 'doi.org' in line:
                    url_index = idx
                    break
            
            if url_index != -1:
                citation_lines = lines[:url_index+1]
                remaining = lines[url_index+1:]
            else:
                # Fallback: First line is citation
                citation_lines = [lines[0]]
                remaining = lines[1:]
                
            full_citation = " ".join([l.strip() for l in citation_lines]).strip()
            
            # 2. Extract Summary and Body
            # Remove empty lines from start of remaining
            while remaining and not remaining[0].strip():
                remaining.pop(0)
                
            summary_lines = []
            body_lines = []
            
            # Logic: Read lines. If we hit a blank line, we are done with summary.
            # If we hit a very long line (likely a paragraph) and we already have some summary, maybe we are done?
            # But "one line summary" might be wrapped.
            
            in_summary = True
            for idx, line in enumerate(remaining):
                if not line.strip():
                    # Empty line -> End of summary
                    if summary_lines: # Only if we have something
                        in_summary = False
                    continue
                
                if in_summary:
                    # Check if this line looks like the start of a body paragraph
                    # Heuristic: If we already have a summary line, and this line is long (>150 chars), it's probably body.
                    if summary_lines and len(line) > 150:
                        in_summary = False
                        body_lines.append(line)
                    else:
                        summary_lines.append(line)
                else:
                    body_lines.append(line)
            
            summary_text = " ".join([l.strip() for l in summary_lines]).strip()
            body_text = "\n".join(body_lines).strip()
            
            # 3. Parse Body Paragraphs
            paragraphs = re.split(r'\n\s*\n', body_text)
            paragraphs = [p.strip() for p in paragraphs if p.strip()]
            
            core_idea = paragraphs[0] if len(paragraphs) > 0 else ""
            question = paragraphs[1] if len(paragraphs) > 1 else ""
            why_matters = paragraphs[2] if len(paragraphs) > 2 else ""
            
            # 4. Extract Metadata
            author = "Unknown"
            year = 2025
            title = "Unknown Title"
            venue = "Unknown Venue"
            
            year_match = re.search(r'\((\d{4})\)', full_citation)
            if year_match:
                year = int(year_match.group(1))
                author_part = full_citation[:year_match.start()].strip()
                if author_part.endswith('.'): author_part = author_part[:-1]
                author = author_part
                
                rest = full_citation[year_match.end():].strip()
                if rest.startswith('.'): rest = rest[1:].strip()
                
                # Title usually ends with period
                # But venue might be "Nature 123"
                # Heuristic: Split by ". "
                parts_dot = rest.split('. ')
                if len(parts_dot) > 0:
                    title = parts_dot[0].strip()
                    venue = ". ".join(parts_dot[1:]).strip()
                    if 'http' in venue:
                        venue = venue.split('http')[0].strip()
            
            url = ""
            doi = ""
            url_match = re.search(r'(https?://\S+)', full_citation)
            if url_match:
                url = url_match.group(1)
                if 'doi.org' in url:
                    doi = url
            
            slug = title.lower().replace(':', '').replace('?', '').replace(',', '').replace('.', '').split()[:5]
            slug = "-".join(slug)
            
            readings_data.append({
                'slug': slug,
                'groupSlug': group_slug,
                'title': title,
                'authors': author,
                'year': year,
                'venue': venue,
                'fullCitation': full_citation,
                'externalLinks': {
                    'doi': doi if doi else None,
                    'url': url if url and not doi else None
                },
                'oneLineSummary': summary_text,
                'discussion': {
                    'coreIdea': core_idea,
                    'questionAnswered': question,
                    'whyItMatters': why_matters
                }
            })

    ts_content = """import { Reading, ReadingGroup } from "./readings";

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

export const readings: Reading[] = """ + json.dumps(readings_data, indent=2) + ";"
    
    print(ts_content)

if __name__ == "__main__":
    parse_readings('readings_raw_v3.txt')
