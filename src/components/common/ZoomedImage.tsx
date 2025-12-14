"use client";
import { config } from "@/config";
import { useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ZoomedImageProps {
  img: string;
  baseUrl?: boolean;
  height?: number | "auto";
  width?: number | "auto";
  style?: React.CSSProperties;
}

function ZoomedImage(props: ZoomedImageProps) {
  const { img, baseUrl = true, height = "40vh", width = "100%", style } = props;
  const [isZoomed, setIsZoomed] = useState(false);
  const imgurl = !baseUrl ? img : config.fileBaseUrl + img;

  return (
    <ControlledZoom
      isZoomed={isZoomed}
      onZoomChange={setIsZoomed}
      zoomMargin={0}
      wrapElement="div"
    >
      <img
        alt="submission_image"
        src={imgurl}
        style={{
          width: isZoomed ? "auto" : width,
          height: isZoomed ? "auto" : height,
          cursor: "zoom-in",
          objectFit: "contain",
          ...style,
        }}
      />
    </ControlledZoom>
  );
}

export default ZoomedImage;
