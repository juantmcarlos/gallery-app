import { useEffect, useState } from "react";
import { fetchGalleries, fetchImages } from "../services/imageService";
import type { Gallery as GalleryType } from "../types/gallery";
import type { Image } from "../types/image";
import ImageCard from "./ImageCard";
import Modal from "./Modal";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { motion } from "framer-motion";

export default function Gallery() {
  const [galleries, setGalleries] = useState<GalleryType[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);

  const [images, setImages] = useState<Image[]>([]);
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);

  const [selected, setSelected] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar galerías al inicio
  useEffect(() => {
    setLoading(true);
    fetchGalleries()
      .then(setGalleries)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Cargar imágenes cuando cambias de galería
  useEffect(() => {
    if (!selectedGallery) return;

    setLoading(true);
    setError(null);

    fetchImages(selectedGallery)
      .then(data => {
        setImages(data);
        setVisibleImages(data.slice(0, 10));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedGallery]);

  const currentIndex = images.findIndex(i => i.id === selected);

  const loadMore = () => {
    const next = images.slice(
      visibleImages.length,
      visibleImages.length + 10
    );
    setVisibleImages(prev => [...prev, ...next]);
  };

  const loadMoreRef = useInfiniteScroll({ loadMore });

  const next = () =>
    setSelected(images[(currentIndex + 1) % images.length].id);

  const prev = () =>
    setSelected(
      images[(currentIndex - 1 + images.length) % images.length].id
    );

  return (
    <>
      <h1>Galerías Públicas</h1>

      {/* Botones de galerías */}
      <div className="gallery-buttons">
        {galleries.map(g => (
          <button
            key={g.id}
            onClick={() => setSelectedGallery(g.name)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Subtítulo */}
      {selectedGallery && <h2>{selectedGallery}</h2>}

      {/* Grid */}
      <motion.div layout className="gallery">
        {visibleImages.map(img => (
          <ImageCard
            key={img.id}
            img={img}
            onClick={() => setSelected(img.id)}
          />
        ))}
      </motion.div>

      {/* Modal */}
      {selected && (
        <Modal
          img={images[currentIndex]}
          onClose={() => setSelected(null)}
          onNext={next}
          onPrev={prev}
        />
      )}

      <div ref={loadMoreRef} style={{ height: "20px" }} />

      {loading && <div className="spinner" />}
      {error && <p className="error">{error}</p>}
    </>
  );
}
