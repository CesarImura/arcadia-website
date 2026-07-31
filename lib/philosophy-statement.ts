export function parsePhilosophyStatement(text: string) {
  const normalized = text.trim();

  if (normalized.includes("|")) {
    const [highlight, ...rest] = normalized.split("|");
    return {
      highlight: highlight.trim(),
      body: rest.join("|").trim(),
    };
  }

  const talentoMatch = normalized.match(/^(.*?talento)\s*(.*)$/i);
  if (talentoMatch) {
    return {
      highlight: talentoMatch[1].trim(),
      body: talentoMatch[2].trim(),
    };
  }

  return {
    highlight: normalized,
    body: "",
  };
}

export function splitWords(text: string) {
  return text.split(/\s+/).filter(Boolean);
}
