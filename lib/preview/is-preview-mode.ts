export function isPreviewMode() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const forcePreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

  if (forcePreview) return true;
  if (!projectId || projectId === "placeholder" || projectId === "your_project_id") {
    return true;
  }

  return false;
}
