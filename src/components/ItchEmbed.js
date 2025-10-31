import React, { useState } from 'react';
import './ItchEmbed.css';
import { createPortal } from 'react-dom';
import PixelHitImage from '../helpers/PixelHitImage';

const ItchModal = ({ title, iframeSrc, height, width, onClose }) =>
  createPortal(
    <div className="itch-modal-overlay" onClick={onClose}>
      <div className="itch-modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe src={iframeSrc} style={{ height, width }} title={title} />
      </div>
    </div>,
    document.body
  );

const ItchEmbed = ({ iframeSrc, thumbnail, height, width, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="itch-embed-container">
      <PixelHitImage
        src={`/images/thumbnails/${thumbnail}.png`}
        alt={`Open ${title}`}
        className="itch-thumb-img"
        onClick={() => setOpen(true)}
      />
      {open && (
        <ItchModal
          title={title}
          iframeSrc={iframeSrc}
          height={height}
          width={width}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default ItchEmbed;
