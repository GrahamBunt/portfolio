"use client";

import { useEffect } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

type HeroTypography = {
  size: number;
  measure: number;
  lineHeight: number;
  position: { x: number; y: number };
};

export default function HeroTypographyControls({ defaults, onChange }: {
  defaults: HeroTypography;
  onChange: (values: HeroTypography) => void;
}) {
  const values = useDialKit("Hero typography", {
    "Size (%)": [defaults.size, 60, 140, 1],
    "Content measure (%)": [defaults.measure, 30, 100, 1],
    "Line height": [defaults.lineHeight, 0.8, 1.4, 0.005],
    "Text position": {
      type: "pad",
      x: [defaults.position.x, -15, 15, 0.5],
      y: [defaults.position.y, -30, 30, 0.5],
      labels: { x: "Horizontal (vw)", y: "Vertical (vh)" },
    },
  }, { id: "home-hero-typography", persist: true });

  const size = values["Size (%)"];
  const measure = values["Content measure (%)"];
  const lineHeight = values["Line height"];
  const positionX = values["Text position"]?.x ?? defaults.position.x;
  const positionY = values["Text position"]?.y ?? defaults.position.y;

  useEffect(() => {
    onChange({ size, measure, lineHeight, position: { x: positionX, y: positionY } });
  }, [size, measure, lineHeight, positionX, positionY, onChange]);

  return <DialRoot position="bottom-right" theme="dark" defaultOpen />;
}
