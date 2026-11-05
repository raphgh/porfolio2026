import { ImageResponse } from "next/og";

export const alt = "Raphaelle Ghanem";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Simple mustard circle — site thumbnail / link preview. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "#d4a017",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
