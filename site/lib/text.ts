export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function searchTerms(value: string) {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
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
