"use client";

import { useCallback, useEffect, useRef } from "react";

const DOT_SPACING = 18;
const DOT_RADIUS = 1.6;
const BASE_OPACITY = 0.1;
const INTERACT_RADIUS = 130;
const HOVER_OPACITY = 0.4;
const HOVER_RADIUS = 3.2;
const INERTIA = 0.12;

interface InteractiveDotGridProps {
  className?: string;
  dotSize?: number;
  dotGap?: number;
  gridWidth?: number;
  gridHeight?: number;
  /** Mouse position relative to the grid container (from parent section) */
  mousePosition?: { x: number; y: number } | null;
}

export function InteractiveDotGrid({
  className = "",
  dotSize = DOT_RADIUS,
  dotGap = DOT_SPACING,
  gridWidth,
  gridHeight,
  mousePosition = null,
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const targetMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    targetMouseRef.current = mousePosition;
  }, [mousePosition]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);

    if (sizeRef.current.w !== w || sizeRef.current.h !== h) {
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    // Smoothly interpolate toward target mouse position for inertia / delay effect
    const target = targetMouseRef.current;
    const current = mouseRef.current;
    if (target) {
      if (!current) {
        mouseRef.current = { ...target };
      } else {
        mouseRef.current = {
          x: current.x + (target.x - current.x) * INERTIA,
          y: current.y + (target.y - current.y) * INERTIA,
        };
      }
    } else if (current) {
      // Let the effect slowly fade out after the mouse leaves
      mouseRef.current = {
        x: current.x + (current.x - w / 2) * INERTIA * -0.05,
        y: current.y + (current.y - h / 2) * INERTIA * -0.05,
      };
      if (Math.abs(current.x - w / 2) < 1 && Math.abs(current.y - h / 2) < 1) {
        mouseRef.current = null;
      }
    }

    const mouse = mouseRef.current;

    for (let cx = 8; cx < w + dotGap; cx += dotGap) {
      for (let cy = 8; cy < h + dotGap; cy += dotGap) {
        let opacity = BASE_OPACITY;
        let radius = dotSize;

        if (mouse) {
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INTERACT_RADIUS) {
            const t = 1 - dist / INTERACT_RADIUS;
            const ease = t * t;
            opacity = BASE_OPACITY + (HOVER_OPACITY - BASE_OPACITY) * ease;
            radius = dotSize + (HOVER_RADIUS - dotSize) * ease;
          }
        }

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(68, 68, 68, ${opacity})`;
        ctx.fill();
      }
    }
  }, [dotGap, dotSize]);

  useEffect(() => {
    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: gridWidth,
        height: gridHeight,
      }}
      aria-hidden
    />
  );
}
