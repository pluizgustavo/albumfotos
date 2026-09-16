import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
const databaseName = 'albumfotos';
let database: SQLiteDBConnection | undefined;

async function getDatabase(): Promise<SQLiteDBConnection> {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('SQLite nativo indisponível no navegador');
  }

  if (!database) {
    database = await sqlite.createConnection(databaseName, false, 'no-encryption', 1, false);
    await database.open();
    await database.execute(`
      CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_url TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
  }

  return database;
}

export async function getPhotos(): Promise<string[]> {
  try {
    const db = await getDatabase();
    const result = await db.query('SELECT data_url FROM photos ORDER BY created_at DESC');
    return (result.values || []).map((photo) => String(photo.data_url));
  } catch {
    return JSON.parse(localStorage.getItem('albumfotos.photos') || '[]');
  }
}

export async function addPhoto(dataUrl: string): Promise<void> {
  try {
    const db = await getDatabase();
    await db.run('INSERT INTO photos (data_url, created_at) VALUES (?, ?)', [dataUrl, new Date().toISOString()]);
  } catch {
    const photos = await getPhotos();
    localStorage.setItem('albumfotos.photos', JSON.stringify([dataUrl, ...photos]));
  }
}

export async function removePhoto(index: number): Promise<void> {
  try {
    const db = await getDatabase();
    const photos = await db.query('SELECT id FROM photos ORDER BY created_at DESC');
    const id = photos.values?.[index]?.id;
    if (id !== undefined) await db.run('DELETE FROM photos WHERE id = ?', [id]);
  } catch {
    const photos = await getPhotos();
    photos.splice(index, 1);
    localStorage.setItem('albumfotos.photos', JSON.stringify(photos));
  }
}

export async function getTheme(): Promise<'light' | 'dark'> {
  const { value } = await Preferences.get({ key: 'albumfotos.theme' });
  return value === 'dark' ? 'dark' : 'light';
}

export async function saveTheme(theme: 'light' | 'dark'): Promise<void> {
  await Preferences.set({ key: 'albumfotos.theme', value: theme });
}
