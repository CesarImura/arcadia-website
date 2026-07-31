"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24">
      <Container className="mx-auto max-w-xl space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Erro
        </p>
        <h1 className="text-3xl font-semibold text-neutral-900">
          Não foi possível carregar esta página
        </h1>
        <p className="text-neutral-600">
          Verifique sua conexão ou tente novamente em instantes.
        </p>
        <div className="flex justify-center">
          <Button onClick={reset}>Tentar novamente</Button>
        </div>
      </Container>
    </section>
  );
}
