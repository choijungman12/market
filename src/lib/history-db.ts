// IndexedDB 기반 히스토리 저장소 (대용량 이미지 지원)

const DB_NAME = 'hookflow';
const DB_VERSION = 1;
const STORE = 'history';

export interface HistoryRecord {
  id: string;
  createdAt: string;
  topic: string;
  headline: string;
  platform: string;
  slideCount: number;
  images: string[];
  scripts: { title: string; body: string }[];
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No window'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      }
    };
  });
}

export async function saveHistoryDB(entry: Omit<HistoryRecord, 'id' | 'createdAt'>): Promise<string> {
  try {
    const db = await openDB();
    const id = `h_${Date.now()}`;
    const record: HistoryRecord = {
      id,
      createdAt: new Date().toISOString(),
      ...entry,
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.put(record);
      req.onsuccess = () => resolve(id);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('[History] Save failed:', e);
    return '';
  }
}

export async function getHistoryDB(): Promise<HistoryRecord[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const store = tx.objectStore(STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const items = (req.result as HistoryRecord[]).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        resolve(items);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.error('[History] Get failed:', e);
    return [];
  }
}

export async function deleteHistoryDB(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.error('[History] Delete failed:', e);
  }
}

export async function clearHistoryDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.error('[History] Clear failed:', e);
  }
}
