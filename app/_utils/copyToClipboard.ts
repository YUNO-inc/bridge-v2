import { toast } from "sonner";

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard ✅🔗");
  } catch {
    toast.error("Unable to copy the link. Please copy it manually.");
  }
}
