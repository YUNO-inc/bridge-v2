import { copyToClipboard } from "./copyToClipboard";

export async function shareURL({
  title,
  text,
  url,
}: ShareData & { url: string }) {
  try {
    await navigator.share?.({
      title,
      text,
      url,
    });
  } catch {
    copyToClipboard(url);
  }
}
