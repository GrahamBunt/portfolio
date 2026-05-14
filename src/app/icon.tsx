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
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <img
          src={dataUrl}
          width={64}
          height={64}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt=""
        />
      </div>
    ),
    size
  );
}
