type FooterColumnHeaderProps = {
  title: string;
};

export function FooterColumnHeader({ title }: FooterColumnHeaderProps) {
  return (
    <div className="flex w-full items-center gap-4 border-b border-white/10 pb-3">
      <span className="size-1.5 shrink-0 bg-[#c0edff]" aria-hidden />
      <p className="font-arc-sans text-base font-medium leading-normal text-white/50">
        {title}
      </p>
    </div>
  );
}
