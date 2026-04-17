import type { Image } from "../types/image";

const modules = import.meta.glob(
  "../assets/images/**/*.{jpg,png,jpeg}",
  { eager: true, as: "url" }
);

let id = 1;

export const images: Record<string, Image[]> = {};

Object.entries(modules).forEach(([path, url]) => {
  const parts = path.split("/");
  const gallery = parts[parts.length - 2]; // nombre carpeta

  if (!images[gallery]) {
    images[gallery] = [];
  }

  images[gallery].push({
    id: id++,
    url: url as string,
    title: url as string,
  });
});