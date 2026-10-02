"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";

import { joinClassNames } from "@/lib/utils";

interface DraggableCardBodyProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onBringToFront?: () => void;
}

export const DraggableCardBody = ({
  className,
  children,
  style,
  onBringToFront,
}: DraggableCardBodyProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  /*
   * Small physical tilt when moving the cursor
   */
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [6, -6]),
    springConfig,
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-6, 6]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.97, 1, 0.97]),
    springConfig,
  );

  /*
   * Keep dragging within viewport
   */
  useEffect(() => {
    const updateConstraints = () => {
      setConstraints({
        top: -window.innerHeight / 2,
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      });
    };

    updateConstraints();

    window.addEventListener("resize", updateConstraints);

    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  /*
   * Cursor-following tilt
   */
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /*
   * Drag start
   */
  const handleDragStart = () => {
    document.body.style.cursor = "grabbing";

    onBringToFront?.();
  };

  /*
   * Drag end
   */
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: {
      point: {
        x: number;
        y: number;
      };
    },
  ) => {
    document.body.style.cursor = "default";

    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        ...springConfig,
      },
    });

    const currentVelocityX = velocityX.get();
    const currentVelocityY = velocityY.get();

    const velocityMagnitude = Math.sqrt(
      currentVelocityX * currentVelocityX +
        currentVelocityY * currentVelocityY,
    );

    const bounce = Math.min(
      0.5,
      velocityMagnitude / 1500,
    );

    /*
     * Small physical bounce
     */
    animate(
      info.point.x,
      info.point.x + currentVelocityX * 0.12,
      {
        duration: 0.6,
        ease: [0.2, 0, 0, 1],
        bounce,
        type: "spring",
        stiffness: 55,
        damping: 17,
        mass: 0.8,
      },
    );

    animate(
      info.point.y,
      info.point.y + currentVelocityY * 0.12,
      {
        duration: 0.6,
        ease: [0.2, 0, 0, 1],
        bounce,
        type: "spring",
        stiffness: 55,
        damping: 17,
        mass: 0.8,
      },
    );
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      dragElastic={0.12}
      dragMomentum
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{
        scale: 1.015,
      }}
      transition={{
        scale: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className={joinClassNames(
        `
        absolute
        overflow-hidden
        bg-[#fdfdfb]
        p-[10px]
        pb-[18px]
        shadow-[0_24px_55px_rgba(18,59,42,0.16)]
        [transform-style:preserve-3d]
        select-none
        touch-none
        cursor-grab
        active:cursor-grabbing
        `,
        className,
      )}
    >
      {children}

      {/* Very subtle paper border */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          border
          border-black/[0.035]
        "
      />
    </motion.div>
  );
};

interface DraggableCardContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export const DraggableCardContainer = ({
  className,
  children,
}: DraggableCardContainerProps) => {
  return (
    <div
      className={joinClassNames(
        "[perspective:2200px]",
        className,
      )}
    >
      {children}
    </div>
  );
};