import type { Image } from "../types/image";
import { motion } from "framer-motion";

interface Props {
  img: Image;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/*
<div className="modal" onClick={onClose}>
  <img className="modal-img" src={img.full} />
</div>
*/

export default function Modal({img, onClose, onNext, onPrev}: Props) {
  return (
    <motion.div
      className="modal"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        className="modal-img"
        src={img.url}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="modal-btns">
        <button onClick={e => { e.stopPropagation(); onPrev(); }}>←</button>
        <button onClick={e => { e.stopPropagation(); onNext(); }}>→</button>
      </div>

    </motion.div>
  );
}