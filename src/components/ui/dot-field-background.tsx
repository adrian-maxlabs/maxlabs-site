"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DotFieldInteraction = "off" | "repel" | "attract";

type DotFieldBackgroundProps = {
  className?: string;
  density?: number;
  dotSize?: number;
  linkDistance?: number;
  speed?: number;
  repelRadius?: number;
  repelStrength?: number;
  cursorEase?: number;
  dotAlpha?: number;
  linkAlpha?: number;
  dotColor?: string;
  linkColor?: string;
  interaction?: DotFieldInteraction;
  maxDots?: number;
};

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
};

type MouseState = {
  x: number;
  y: number;
  active: boolean;
};

function parseCssColor(color: string): { r: number; g: number; b: number } {
  if (typeof document === "undefined") {
    return { r: 100, g: 116, b: 139 };
  }

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { r: 100, g: 116, b: 139 };

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
  return { r, g, b };
}

function createParticles(width: number, height: number, count: number, speed: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    const velocity = speed * (0.5 + Math.random() * 0.5);

    particles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
    });
  }

  return particles;
}

function getParticleCount(
  width: number,
  height: number,
  density: number,
  maxDots: number,
): number {
  const area = width * height;
  const mobileCap = Math.min(maxDots, 45);
  const desktopCap = maxDots;
  const cap = width < 640 ? mobileCap : desktopCap;
  return Math.max(12, Math.min(cap, Math.round(area * density)));
}

export function DotFieldBackground({
  className,
  density = 0.00008,
  dotSize = 1.5,
  linkDistance = 110,
  speed = 0.25,
  repelRadius = 120,
  repelStrength = 2.5,
  cursorEase = 0.04,
  dotAlpha = 0.35,
  linkAlpha = 0.12,
  dotColor,
  linkColor,
  interaction = "repel",
  maxDots = 90,
}: DotFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const colorsRef = useRef({
    dot: { r: 100, g: 116, b: 139 },
    link: { r: 29, g: 78, b: 216 },
  });

  const resolveColors = useCallback(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const muted = dotColor ?? (styles.getPropertyValue("--muted").trim() || "#64748b");
    const primary = linkColor ?? (styles.getPropertyValue("--primary").trim() || "#1d4ed8");
    colorsRef.current = {
      dot: parseCssColor(muted),
      link: parseCssColor(primary),
    };
  }, [dotColor, linkColor]);

  const setupCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return null;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width <= 0 || height <= 0) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = getParticleCount(width, height, density, maxDots);
    particlesRef.current = createParticles(width, height, count, speed);

    return { ctx, width, height };
  }, [density, maxDots, speed]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const particles = particlesRef.current;
    if (!canvas || !ctx || particles.length === 0) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const mouse = mouseRef.current;
    const reducedMotion = reducedMotionRef.current;
    const { dot, link } = colorsRef.current;

    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
      if (!reducedMotion) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
      }

      let drawX = particle.x;
      let drawY = particle.y;

      if (interaction !== "off" && mouse.active && !reducedMotion) {
        const dx = drawX - mouse.x;
        const dy = drawY - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < repelRadius) {
          const influence = 1 - distance / repelRadius;
          const force = repelStrength * influence * influence;
          const direction = interaction === "repel" ? 1 : -1;
          drawX += (dx / distance) * force;
          drawY += (dy / distance) * force;
        }
      }

      particle.baseX += (drawX - particle.baseX) * cursorEase;
      particle.baseY += (drawY - particle.baseY) * cursorEase;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.baseX - b.baseX;
        const dy = a.baseY - b.baseY;
        const distance = Math.hypot(dx, dy);

        if (distance < linkDistance) {
          const opacity = (1 - distance / linkDistance) * linkAlpha;
          ctx.strokeStyle = `rgba(${link.r}, ${link.g}, ${link.b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.baseX, a.baseY);
          ctx.lineTo(b.baseX, b.baseY);
          ctx.stroke();
        }
      }
    }

    for (const particle of particles) {
      ctx.fillStyle = `rgba(${dot.r}, ${dot.g}, ${dot.b}, ${dotAlpha})`;
      ctx.beginPath();
      ctx.arc(particle.baseX, particle.baseY, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [
    cursorEase,
    dotAlpha,
    dotSize,
    interaction,
    linkAlpha,
    linkDistance,
    repelRadius,
    repelStrength,
  ]);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    drawFrame();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  const startAnimation = useCallback(() => {
    if (animationRef.current !== null) return;
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (isVisibleRef.current) {
        drawFrame();
      }
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => mediaQuery.removeEventListener("change", syncReducedMotion);
  }, [drawFrame]);

  useEffect(() => {
    resolveColors();

    const themeObserver = new MutationObserver(resolveColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => themeObserver.disconnect();
  }, [resolveColors]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
      if (isVisibleRef.current) {
        drawFrame();
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setupCanvas();
          drawFrame();
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    setupCanvas();
    drawFrame();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stopAnimation();
    };
  }, [drawFrame, setupCanvas, startAnimation, stopAnimation]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
