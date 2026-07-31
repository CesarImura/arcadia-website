import type { ReactNode } from "react";
import { isPreviewMode } from "@/lib/preview/is-preview-mode";

export function PreviewBanner() {
  if (!isPreviewMode()) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-center text-sm text-amber-900">
      Modo preview — conteúdo de exemplo. Configure o Sanity para editar no CMS.
    </div>
  );
}

export function PreviewWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <PreviewBanner />
      {children}
    </>
  );
}
