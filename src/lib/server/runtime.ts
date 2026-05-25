import { ensureStorageReady } from './storage';

/** Run DB seed (if needed) before handlers that use storage. */
export async function prepareStorage(): Promise<void> {
  await ensureStorageReady();
}
