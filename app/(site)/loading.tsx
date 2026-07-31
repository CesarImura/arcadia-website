import { Container } from "@/components/ui/Container";

export default function SiteLoading() {
  return (
    <div className="py-24">
      <Container className="space-y-6">
        <div className="h-10 w-2/3 max-w-xl animate-pulse rounded-full bg-neutral-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-neutral-200" />
        <div className="h-4 w-5/6 max-w-2xl animate-pulse rounded-full bg-neutral-200" />
        <div className="grid gap-6 pt-8 md:grid-cols-3">
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-neutral-200" />
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-neutral-200" />
          <div className="aspect-[4/3] animate-pulse rounded-3xl bg-neutral-200" />
        </div>
      </Container>
    </div>
  );
}
