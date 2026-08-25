import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const avatar = readFileSync(
    path.join(process.cwd(), "public", "avatar.jpg")
  );
  const dataUrl = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "64px",
            height: "64px",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <img
            src={dataUrl}
            width={64}
            height={64}
            style={{
              display: "block",
              width: "64px",
              height: "64px",
              objectFit: "cover",
            }}
            alt=""
          />
        </div>
      </div>
    ),
    size
  );
}
