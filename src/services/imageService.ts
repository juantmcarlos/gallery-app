import type { Gallery } from "../types/gallery";
import type { Image } from "../types/image";

const AUTH = {
  Authorization: "Basic " + btoa("carlos:juaN123")
};

//const API = "http://localhost:5000/api";
const API = "https://image-server.juantmcarlos.es/api";

export async function fetchGalleries(): Promise<Gallery[]> {
  try {
    const res = await fetch(
        `${API}/folders`,
        { headers: AUTH }
    );

    const data = await res.json();
    //console.log(data);
    
    if (!Array.isArray(data.folders)) {
      throw new Error("Formato incorrecto");
    }

    return data.folders.map((folder: any, index: number) => ({
      id: index + 1,
      name: folder.name,
      image_count: folder.image_count
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function fetchImages(folder: string): Promise<Image[]> {
  try {
    const res = await fetch(
        `${API}/folders/${folder}/images`,
        { headers: AUTH }
    );

    const data = await res.json();
    //console.log(data);
    
    if (!Array.isArray(data.images)) {
      throw new Error("Formato incorrecto");
    }
    //console.log(data.images);

    return data.images.map((img: any, index: number) => ({
      id: index + 1,
      url: img.url,
      title: img.filename
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}