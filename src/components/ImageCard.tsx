
import { useState } from "react";
import type { Image } from "../types/image";
import { motion } from "framer-motion";

interface Props {
  img: Image;
  onClick: () => void;
}

export default function ImageCard({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image-wrapper" onClick={onClick}>
      {!loaded && <div className="skeleton" />}

      <motion.img
        src={img.url}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => console.log("ERROR", img.url)}
        className={loaded ? "img-visible" : "img-hidden"}
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

    </div>
  );
}