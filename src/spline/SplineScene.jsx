// SplineScene.tsx
import React from "react";

const SplineScene = ({ url, height }) => {
  return (
    <div style={{ width: "100%", height: height ? `${height}px` : "100%" }}>
      <spline-viewer
        url={url}
        style={{ width: "100%", height: "100%" }}
      ></spline-viewer>
    </div>
  );
};

export default SplineScene;
