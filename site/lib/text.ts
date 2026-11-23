export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const stopwords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "do", "does", "for", "from", "how", "in", "is", "it", "of", "on", "or", "the", "to", "what", "which", "with"]);

export function searchTerms(value: string) {
  return [...new Set(normalizeSearchText(value).split(/\s+/).filter((term) => term && !stopwords.has(term)))];
}

/** Character offsets refer to the original display text, including accents and punctuation. */
export function matchingWords(value: string, terms: readonly string[]) {
  const matches: { start: number; end: number }[] = [];
  for (const match of value.matchAll(/[\p{L}\p{M}\p{N}]+/gu)) {
    if (terms.includes(normalizeSearchText(match[0]))) matches.push({ start: match.index, end: match.index + match[0].length });
  }
  return matches;
}

export function stableAnchorId(value: string, prefix = "") {
  const slug = normalizeSearchText(value).replaceAll(" ", "-") || "section";
  return `${prefix}${slug}`;
}

export function readingMinutes(value: string, wordsPerMinute = 225) {
  const prose = value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[#>*_`|~-]/g, " ");
  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
