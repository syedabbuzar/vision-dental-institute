export interface StoredGalleryPhoto {
  id: string;
  name: string;
  alt: string;
  blob: Blob;
  createdAt: number;
}

const DATABASE_NAME = "hendge-hospital-local-gallery";
const DATABASE_VERSION = 1;
const PHOTO_STORE = "photos";
export const LOCAL_GALLERY_CHANGE_EVENT = "hendge-local-gallery-change";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PHOTO_STORE)) {
        database.createObjectStore(PHOTO_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open local gallery."));
  });
}

function transactionComplete(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("Gallery update failed."));
    transaction.onabort = () => reject(transaction.error ?? new Error("Gallery update was cancelled."));
  });
}

export async function getLocalGalleryPhotos(): Promise<StoredGalleryPhoto[]> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(PHOTO_STORE, "readonly");
    const request = transaction.objectStore(PHOTO_STORE).getAll() as IDBRequest<StoredGalleryPhoto[]>;
    const photos = await new Promise<StoredGalleryPhoto[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("Could not read the local gallery."));
    });
    return photos.sort((first, second) => second.createdAt - first.createdAt);
  } finally {
    database.close();
  }
}

export async function addLocalGalleryPhoto(photo: StoredGalleryPhoto): Promise<void> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(PHOTO_STORE, "readwrite");
    transaction.objectStore(PHOTO_STORE).add(photo);
    await transactionComplete(transaction);
    window.dispatchEvent(new Event(LOCAL_GALLERY_CHANGE_EVENT));
  } finally {
    database.close();
  }
}

export async function removeLocalGalleryPhoto(id: string): Promise<void> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(PHOTO_STORE, "readwrite");
    transaction.objectStore(PHOTO_STORE).delete(id);
    await transactionComplete(transaction);
    window.dispatchEvent(new Event(LOCAL_GALLERY_CHANGE_EVENT));
  } finally {
    database.close();
  }
}