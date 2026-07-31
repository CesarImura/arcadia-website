import Image from "next/image";

type SectionBracketLabelProps = {
  index?: string;
  label: string;
  tone?: "cyan" | "black";
};

export function SectionBracketLabel({
  index = "nº001",
  label,
  tone = "cyan",
}: SectionBracketLabelProps) {
  const isCyan = tone === "cyan";
  const textClass = isCyan ? "text-[#c0edff]" : "text-black";
  const bracketLeft = isCyan
    ? "/images/philosophy/bracket-cyan-left.svg"
    : "/images/hero/bracket-left.svg";
  const bracketRight = isCyan
    ? "/images/philosophy/bracket-cyan-right.svg"
    : "/images/hero/bracket-right.svg";

  return (
    <div
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap font-arc-mono text-base uppercase leading-none ${textClass}`}
    >
      <Image
        src={bracketLeft}
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
      <span>{index}</span>
      <span>/</span>
      <span>{label}</span>
      <Image
        src={bracketRight}
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
    </div>
  );
}
