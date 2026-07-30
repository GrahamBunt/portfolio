import type { Metadata } from "next";
import { SmartsheetBackgroundSandbox } from "./smartsheet-background-sandbox";

export const metadata: Metadata = {
  title: "Smartsheet Reports Background Sandbox - Graham Bunt",
  description: "Live background color explorations for the Smartsheet Reports case study.",
};

export default function SmartsheetReportsBackgroundSandboxPage() {
  return <SmartsheetBackgroundSandbox />;
}
