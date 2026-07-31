import Image from "next/image";

type ArcMethodologyBoxProps = {
  values?: string[];
};

const defaultValues = ["Alcance", "Relevância", "Crescimento"];

export function ArcMethodologyBox({
  values = defaultValues,
}: ArcMethodologyBoxProps) {
  const items = values?.length ? values : defaultValues;
  return (
    <div className="flex h-[82px] w-full max-w-[338px] items-stretch opacity-60">
      <div className="flex items-stretch">
        <div className="flex w-16 items-center justify-center border border-[#c0edff] p-2">
          <Image
            src="/images/philosophy/arc-icon-box.svg"
            alt=""
            width={33}
            height={24}
            className="h-6 w-[33px]"
          />
        </div>
        <div className="flex w-[129px] items-center justify-center border border-l-0 border-[#c0edff] p-2">
          <Image
            src="/images/philosophy/arc-wordmark-box.svg"
            alt="ARC"
            width={67}
            height={24}
            className="h-6 w-[67px]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between border border-l-0 border-[#c0edff] px-6 py-2 font-mono text-base leading-[1.3] text-[#c0edff]">
        {items.map((value) => (
          <p key={value}>{value}</p>
        ))}
      </div>
    </div>
  );
}
