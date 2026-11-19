import type { Metadata } from "next";
import { NavMotionLab } from "./NavMotionLab";

export const metadata: Metadata = {
  title: "Navigation motion — 15 studies",
  robots: { index: false, follow: false },
};

export default function NavMotionPage() {
  return <NavMotionLab />;
}
