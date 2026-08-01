const NUMERIC_PATTERN = /^([^0-9\-+]*)([\-+]?[0-9]*\.?[0-9]+)(.*)$/;

export type ParsedStatValue = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
};

export function parseStatValue(value: string): ParsedStatValue | null {
  const match = value.trim().match(NUMERIC_PATTERN);
  if (!match) return null;

  const [, prefix = "", numeric = "", suffix = ""] = match;
  const number = Number(numeric);

  if (Number.isNaN(number)) return null;

  const decimals = numeric.includes(".")
    ? numeric.split(".")[1]?.length ?? 0
    : 0;

  return { prefix, number, suffix, decimals };
}

export function formatStatNumber(
  parsed: ParsedStatValue,
  current: number,
): string {
  const rounded =
    parsed.decimals > 0
      ? current.toFixed(parsed.decimals)
      : String(Math.round(current));

  return `${parsed.prefix}${rounded}${parsed.suffix}`;
}

export function getRevealFrame(
  target: string,
  progress: number,
  charset: string,
) {
  const revealed = Math.floor(progress * target.length);
  let out = "";

  for (let i = 0; i < target.length; i++) {
    out +=
      i < revealed
        ? target[i]!
        : charset[Math.floor(Math.random() * charset.length)]!;
  }

  return out;
}
