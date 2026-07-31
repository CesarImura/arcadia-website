"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  successMessage?: string;
};

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm({
  successMessage = "Mensagem enviada com sucesso. Entraremos em contato em breve.",
}: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Não foi possível enviar a mensagem.");
      }

      event.currentTarget.reset();
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erro inesperado ao enviar.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-neutral-700">Nome</span>
          <input
            name="name"
            required
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none ring-neutral-900 focus:ring-2"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-neutral-700">E-mail</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none ring-neutral-900 focus:ring-2"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-neutral-700">Assunto</span>
        <input
          name="subject"
          required
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none ring-neutral-900 focus:ring-2"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-neutral-700">Mensagem</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none ring-neutral-900 focus:ring-2"
        />
      </label>

      <Button
        type="submit"
        className={state === "loading" ? "opacity-70" : ""}
        disabled={state === "loading"}
      >
        {state === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>

      {state === "success" ? (
        <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </p>
      ) : null}

      {state === "error" && errorMessage ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
