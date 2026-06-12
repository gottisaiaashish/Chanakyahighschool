import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import './CardStack.css';

function wrapIndex(n, len) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = useState(false);
  const [actualCardWidth, setActualCardWidth] = useState(cardWidth);

  useEffect(() => {
    const updateWidth = () => {
      setActualCardWidth(Math.min(cardWidth, window.innerWidth - 40));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [cardWidth]);

  useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]);
  }, [active, len, items, onChangeIndex]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(actualCardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));

    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  return (
    <div
      className={`card-stack-container ${className || ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="card-stack-stage"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="card-stack-bg-wash-top" aria-hidden="true" />
        <div className="card-stack-bg-wash-bottom" aria-hidden="true" />

        <div className="card-stack-perspective" style={{ perspective: `${perspectivePx}px` }}>
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive ? {
                drag: "x",
                dragConstraints: { left: 0, right: 0 },
                dragElastic: 0.18,
                onDragEnd: (_e, info) => {
                  if (reduceMotion) return;
                  const travel = info.offset.x;
                  const v = info.velocity.x;
                  const threshold = Math.min(160, actualCardWidth * 0.22);
                  if (travel > threshold || v > 650) prev();
                  else if (travel < -threshold || v < -650) next();
                },
              } : {};

              return (
                <motion.div
                  key={item.id}
                  className={`card-stack-card ${isActive ? "is-active" : ""}`}
                  style={{ width: actualCardWidth, height: cardHeight, zIndex }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div className="card-stack-card-inner" style={{ transform: `translateZ(${z}px)` }}>
                    {renderCard ? renderCard(item, { active: isActive }) : <DefaultFanCard item={item} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots ? (
        <div className="card-stack-dots">
          {items.map((it, idx) => {
            const on = idx === active;
            return (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={`card-stack-dot ${on ? 'on' : ''}`}
                aria-label={`Go to ${it.title}`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({ item }) {
  return (
    <div className="card-stack-fan-card">
      <div className="card-stack-image-wrapper">
        {item.imageSrc ? (
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="card-stack-image" 
            style={{ objectPosition: item.objectPosition || 'center' }}
            draggable={false} 
            loading="eager" 
          />
        ) : (
          <div className="card-stack-no-image">No image</div>
        )}
      </div>
      <div className="card-stack-gradient" />
      <div className="card-stack-content">
        <div className="card-stack-title">{item.title}</div>
        {item.description ? <div className="card-stack-desc">{item.description}</div> : null}
      </div>
    </div>
  );
}
