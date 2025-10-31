import React, { useRef, useEffect, useCallback } from 'react';

export default function PixelHitImage({
  src,
  alt = '',
  className,
  style,
  onClick,
  alphaThreshold = 10,
  ...rest
}) {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const drawToCanvas = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;

    const c = canvasRef.current || document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    canvasRef.current = c;
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth) drawToCanvas();

    const onLoad = () => drawToCanvas();
    img.addEventListener('load', onLoad);

    return () => img.removeEventListener('load', onLoad);
  }, [src, drawToCanvas]);

  const getPixelAlphaAtEvent = (clientX, clientY) => {
    const img = imgRef.current;
    const c = canvasRef.current;

    if (!img || !c) return 0;

    const rect = img.getBoundingClientRect();

    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom)
      return 0;

    const x = Math.floor(((clientX - rect.left) / rect.width) * img.naturalWidth);
    const y = Math.floor(((clientY - rect.top) / rect.height) * img.naturalHeight);

    try {
      const ctx = c.getContext('2d');
      const d = ctx.getImageData(
        Math.min(Math.max(x, 0), img.naturalWidth - 1),
        Math.min(Math.max(y, 0), img.naturalHeight - 1),
        1,
        1
      ).data;
      return d[3];
    } catch (e) {
      return 255;
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let scheduled = false;
    const onMove = (e) => {
      if (scheduled) return;

      scheduled = true;
      rafRef.current = requestAnimationFrame(() => {
        scheduled = false;
        const alpha = getPixelAlphaAtEvent(e.clientX, e.clientY);
        img.style.cursor = alpha > alphaThreshold ? 'pointer' : 'default';
      });
    };

    const onLeave = () => (img.style.cursor = 'default');
    img.addEventListener('mousemove', onMove);
    img.addEventListener('mouseleave', onLeave);
    img.addEventListener('touchmove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current || 0);
      img.removeEventListener('mousemove', onMove);
      img.removeEventListener('mouseleave', onLeave);
      img.removeEventListener('touchmove', onMove);
    };
  }, [alphaThreshold]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleClick = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const alpha = getPixelAlphaAtEvent(clientX, clientY);
      if (alpha > alphaThreshold) {
        if (typeof onClick === 'function') onClick(e);
      } else {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    img.addEventListener('click', handleClick);
    img.addEventListener('touchstart', handleClick, { passive: false });

    return () => {
      img.removeEventListener('click', handleClick);
      img.removeEventListener('touchstart', handleClick);
    };
  }, [onClick, alphaThreshold]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{ display: 'inline-block', ...style }}
      draggable={false}
      {...rest}
    />
  );
}
