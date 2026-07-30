import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SmartsheetProblemSandbox } from "./problem-sandbox";

export const metadata: Metadata = {
  title: "Smartsheet Reports Sandbox - Graham Bunt",
  description: "Interaction explorations for the Smartsheet Reports case study.",
};

export default function SmartsheetReportsSandboxPage() {
  return (
    <div className="reports-sandbox-page">
      <SiteNav showBack />
      <SmartsheetProblemSandbox />
    </div>
  );
}
