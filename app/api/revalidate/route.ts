export const runtime = "nodejs";

import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    revalidateTag(body._type);

    switch (body._type) {
      case "siteSettings":
        revalidatePath("/", "layout");
        break;
      case "homePage":
        revalidatePath("/");
        break;
      case "aboutPage":
        revalidatePath("/sobre");
        break;
      case "contactPage":
        revalidatePath("/contato");
        break;
      case "project":
        revalidatePath("/projetos");
        if (body.slug?.current) {
          revalidatePath(`/projetos/${body.slug.current}`);
        }
        break;
      case "post":
        revalidatePath("/blog");
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`);
        }
        break;
      case "legalPage":
        revalidatePath("/paginas", "layout");
        if (body.slug?.current) {
          revalidatePath(`/paginas/${body.slug.current}`);
        }
        break;
      case "teamMember":
        revalidatePath("/sobre");
        break;
      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error revalidating content" },
      { status: 500 },
    );
  }
}
