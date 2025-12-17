import re
import json

def parse_readings(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Split into sections
    # Regex to find < Section X: Title >
    section_pattern = re.compile(r'< Section (\d+): ([^>]+)>')
    
    # Find all section starts
    matches = list(section_pattern.finditer(content))
    
    sections = []
    for i, match in enumerate(matches):
        sec_num = match.group(1)
        sec_title = match.group(2).strip()
        start_idx = match.end()
        end_idx = matches[i+1].start() if i + 1 < len(matches) else len(content)
        section_content = content[start_idx:end_idx].strip()
        sections.append({
            'number': sec_num,
            'title': sec_title,
            'content': section_content
        })

    readings_data = []
    
    for section in sections:
        print(f"Processing Section {section['number']}: {section['title']}")
        
        # Split by reading number "N. "
        # We need to be careful not to split on numbers inside text.
        # Look for "N. " at start of line.
        reading_pattern = re.compile(r'\n(\d+)\.\s+')
        
        # We need to handle the first reading which might be at the start of the string
        # or after some newlines.
        # Let's prepend a newline to make regex work for the first one if needed, 
        # but section_content is stripped.
        
        parts = reading_pattern.split('\n' + section['content'])
        
        # parts[0] is empty or text before first reading
        # parts[1] is number, parts[2] is content, parts[3] is number, parts[4] is content...
        
        current_readings = []
        
        # If the first part is not empty and doesn't look like a reading start, ignore it?
        # Actually, split returns [preamble, num1, content1, num2, content2...]
        
        for i in range(1, len(parts), 2):
            r_num = parts[i]
            r_text = parts[i+1]
            
            # Parse the reading text
            # Strategy:
            # 1. Find the URL/DOI line. Everything up to and including it is Citation.
            # 2. The next non-empty line is Summary.
            # 3. The rest is Body.
            
            lines = r_text.strip().split('\n')
            citation_lines = []
            summary_line = ""
            body_lines = []
            
            url_found = False
            url_index = -1
            
            for idx, line in enumerate(lines):
                if 'http' in line or 'doi.org' in line:
                    url_found = True
                    url_index = idx
                    break
            
            if url_found:
                citation_lines = lines[:url_index+1]
                remaining = lines[url_index+1:]
            else:
                # Fallback: First paragraph is citation?
                # Or first line?
                # Most have URL. If not, maybe just take first line?
                print(f"Warning: No URL found for reading {r_num}")
                citation_lines = [lines[0]]
                remaining = lines[1:]

            # Clean up citation
            full_citation = " ".join([l.strip() for l in citation_lines]).strip()
            
            # Find Summary
            # Skip empty lines in remaining
            non_empty_indices = [idx for idx, l in enumerate(remaining) if l.strip()]
            
            if not non_empty_indices:
                print(f"Warning: No content after citation for reading {r_num}")
                summary_line = "Summary missing"
                body_text = ""
            else:
                summary_idx = non_empty_indices[0]
                summary_line = remaining[summary_idx].strip()
                
                # Body is everything after summary
                body_remaining = remaining[summary_idx+1:]
                body_text = "\n".join(body_remaining).strip()

            # Parse Body into 3 parts if possible
            # Usually separated by newlines.
            # The user text has paragraphs.
            # We want: Core Idea, Question, Why it matters.
            # Sometimes they are explicit, sometimes implicit.
            # We will just take the first 3 paragraphs.
            
            paragraphs = re.split(r'\n\s*\n', body_text)
            paragraphs = [p.strip() for p in paragraphs if p.strip()]
            
            core_idea = paragraphs[0] if len(paragraphs) > 0 else ""
            question = paragraphs[1] if len(paragraphs) > 1 else ""
            why_matters = paragraphs[2] if len(paragraphs) > 2 else ""
            
            # If only 1 or 2 paragraphs, we might need to split by single newline if it looks like a list?
            # But user said "double enter paragraph form".
            
            # Extract fields from citation
            # Author (before year)
            # Year (in parens)
            # Title (between year and journal/venue)
            # Venue (after title, before vol/pp)
            
            # Simple regex for Author (Year). Title. Venue
            # This is brittle, but let's try.
            
            author = "Unknown"
            year = 2025
            title = "Unknown Title"
            venue = "Unknown Venue"
            
            # Try to extract Year
            year_match = re.search(r'\((\d{4})\)', full_citation)
            if year_match:
                year = int(year_match.group(1))
                # Author is usually before year
                author_part = full_citation[:year_match.start()].strip()
                if author_part.endswith('.'): author_part = author_part[:-1]
                author = author_part
                
                # Rest is Title. Venue...
                rest = full_citation[year_match.end():].strip()
                if rest.startswith('.'): rest = rest[1:].strip()
                
                # Split by dot to get Title.
                # But title might have dots.
                # Usually Title ends with dot.
                # Then Venue.
                
                # Heuristic: Split by ". "
                # But we need to be careful about "e.g." or initials.
                # Let's just take the first sentence as title?
                
                # Better: Look for the URL at the end.
                # Remove URL.
                # Remove pages/vol info if possible.
                
                # Let's just do a best effort split.
                # Title is usually the part after year until the next period.
                
                parts_dot = rest.split('. ')
                if len(parts_dot) > 0:
                    title = parts_dot[0].strip()
                    venue = ". ".join(parts_dot[1:]).strip()
                    # Clean up venue (remove URL)
                    if 'http' in venue:
                        venue = venue.split('http')[0].strip()
            
            # Extract URL
            url = ""
            doi = ""
            url_match = re.search(r'(https?://\S+)', full_citation)
            if url_match:
                url = url_match.group(1)
                if 'doi.org' in url:
                    doi = url
            
            # Slug generation
            slug = title.lower().replace(':', '').replace('?', '').replace(',', '').replace('.', '').split()[:5]
            slug = "-".join(slug)
            
            # Group mapping
            # Section 1 -> foundations
            # Section 2 -> neural-plasticity
            # Section 3 -> variable-reinforcement
            # Section 4 -> theory-of-mind
            # Section 5 -> ai-architectures
            # Section 6 -> ai-companionship
            # Section 7 -> ai-risks (New!)
            # Section 8 -> developmental-impact
            # Section 9 -> societal-implications
            
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
            
            group_slug = group_map.get(section['number'], 'unknown')
            
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
                'oneLineSummary': summary_line,
                'discussion': {
                    'coreIdea': core_idea,
                    'questionAnswered': question,
                    'whyItMatters': why_matters
                }
            })

    # Generate TypeScript output
    ts_content = """import { Reading, ReadingGroup } from "./readings";

export const readings: Reading[] = """ + json.dumps(readings_data, indent=2) + ";"
    
    print(ts_content)

if __name__ == "__main__":
    parse_readings('readings_raw_v3.txt')
