import { useEffect, useState } from "react";

import {
  getLocalGalleryPhotos,
  LOCAL_GALLERY_CHANGE_EVENT,
  type StoredGalleryPhoto,
} from "@/lib/local-gallery";

export interface LocalHospitalPhoto extends StoredGalleryPhoto {
  src: string;
}

export function useLocalHospitalGallery(): LocalHospitalPhoto[] {
  const [photos, setPhotos] = useState<LocalHospitalPhoto[]>([]);

  useEffect(() => {
    let active = true;
    let urls: string[] = [];

    const loadPhotos = async () => {
      try {
        const stored = await getLocalGalleryPhotos();
        const nextUrls = stored.map((photo) => URL.createObjectURL(photo.blob));
        if (!active) {
          nextUrls.forEach((url) => URL.revokeObjectURL(url));
          return;
        }
        urls.forEach((url) => URL.revokeObjectURL(url));
        urls = nextUrls;
        setPhotos(stored.map((photo, index) => ({ ...photo, src: nextUrls[index] ?? "" })));
      } catch {
        if (active) setPhotos([]);
      }
    };

    void loadPhotos();
    window.addEventListener(LOCAL_GALLERY_CHANGE_EVENT, loadPhotos);
    return () => {
      active = false;
      window.removeEventListener(LOCAL_GALLERY_CHANGE_EVENT, loadPhotos);
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return photos;
}