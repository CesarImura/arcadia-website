import Image from "next/image";

type BracketArrowProps = {
  className?: string;
};

export function BracketArrow({ className = "" }: BracketArrowProps) {
  return (
    <Image
      src="/images/usp/arrow-right.svg"
      alt=""
      width={15}
      height={13}
      className={`h-[0.7em] w-auto shrink-0 ${className}`}
      aria-hidden
    />
  );
}
