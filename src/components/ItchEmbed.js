import React, { useState } from 'react';
import './ItchEmbed.css';
import { createPortal } from 'react-dom';

const ItchModal = ({ iframeSrc, onClose }) =>
  createPortal(
    <div className="itch-modal-overlay" onClick={onClose}>
      <div className="itch-modal-content" onClick={e => e.stopPropagation()}>
        <iframe
          src={iframeSrc}
          title="Mogu Crane Game"
        />
      </div>
    </div>,
    document.body
  );

const ItchEmbed = ({ iframeSrc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="itch-embed-container">
      <img
        src="/images/crane_thumb.png"
        alt="Open Mogu Crane Game"
        className="itch-thumb-img"
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {open && <ItchModal iframeSrc={iframeSrc} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ItchEmbed;