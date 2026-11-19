import { House } from "lucide-react";

export function NavHomeIcon({ variant = "solid", size = 20 }: {
  variant?: "solid" | "outline";
  size?: number;
}) {
  if (variant === "outline") {
    return <House size={size} strokeWidth={1.6} aria-hidden="true" />;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Zm7 2a1 1 0 0 0-1 1v8h6v-8a1 1 0 0 0-1-1h-4Z"
      />
    </svg>
  );
}
