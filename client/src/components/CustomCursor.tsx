import { useEffect, useRef, useState } from "react";
import "../styles/components/cursor.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const requestRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only initialize on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      // Easing for the outline
      previousMouse.current = {
        x: previousMouse.current.x + (mouse.current.x - previousMouse.current.x) * 0.15,
        y: previousMouse.current.y + (mouse.current.y - previousMouse.current.y) * 0.15,
      };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${previousMouse.current.x}px, ${previousMouse.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Don't render anything on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "visible" : ""} ${isPointer ? "hover" : ""}`}
      />
      <div
        ref={outlineRef}
        className={`cursor-outline ${isVisible ? "visible" : ""} ${isPointer ? "hover" : ""}`}
      />
    </>
  );
}
