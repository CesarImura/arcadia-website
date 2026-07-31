export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 },
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!contactEmail || !resendApiKey) {
      console.info("Contact form submission (dev mode):", body);
      return NextResponse.json({
        ok: true,
        message: "Mensagem registrada em modo de desenvolvimento.",
      });
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "Arcadia Website <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `[Contato] ${subject}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Assunto: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem." },
      { status: 500 },
    );
  }
}
