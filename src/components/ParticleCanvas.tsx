"use client";

import { useRef } from "react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "opacity" }}
      aria-hidden="true"
    />
  );
}
