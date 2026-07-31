import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="mx-auto max-w-xl space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          404
        </p>
        <h1 className="text-4xl font-semibold text-neutral-900">
          Página não encontrada
        </h1>
        <p className="text-neutral-600">
          O conteúdo que você procura não existe ou foi movido.
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/">Voltar ao início</Button>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            Fale conosco
          </Link>
        </div>
      </Container>
    </section>
  );
}
