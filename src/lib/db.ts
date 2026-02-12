import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');

async function ensureDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readData<T>(filename: string, initialData: T[]): Promise<T[]> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    await writeData(filename, initialData);
    return initialData;
  }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readObject<T>(filename: string, initialData: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    await writeObject(filename, initialData);
    return initialData;
  }
}

export async function writeObject<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function addItem<T>(filename: string, item: T, initialData: T[]): Promise<T[]> {
  const data = await readData<T>(filename, initialData);
  data.push(item);
  await writeData(filename, data);
  return data;
}

export async function updateItem<T extends { slug?: string; id?: string }>(filename: string, identifier: string, updatedItem: T, initialData: T[]): Promise<T[]> {
  const data = await readData<T>(filename, initialData);
  const index = data.findIndex(item => (item.slug === identifier) || (item.id === identifier));
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    await writeData(filename, data);
  }
  return data;
}

export async function deleteItem<T extends { slug?: string; id?: string }>(filename: string, identifier: string, initialData: T[]): Promise<T[]> {
  const data = await readData<T>(filename, initialData);
  const newData = data.filter(item => (item.slug !== identifier) && (item.id !== identifier));
  await writeData(filename, newData);
  return newData;
}

export async function softDeleteItem<T extends { slug?: string; id?: string }>(filename: string, identifier: string, initialData: T[]): Promise<T[]> {
  const data = await readData<T>(filename, initialData);
  const itemToDelete = data.find(item => (item.slug === identifier) || (item.id === identifier));
  
  if (itemToDelete) {
    // Add to trash
    const trashFilename = `${filename}_trash`;
    await addItem<T>(trashFilename, itemToDelete, []);
    
    // Remove from main
    const newData = data.filter(item => (item.slug !== identifier) && (item.id !== identifier));
    await writeData(filename, newData);
    return newData;
  }
  return data;
}

export async function restoreItem<T extends { slug?: string; id?: string }>(filename: string, identifier: string): Promise<void> {
  const trashFilename = `${filename}_trash`;
  const trashData = await readData<T>(trashFilename, []);
  const itemToRestore = trashData.find(item => (item.slug === identifier) || (item.id === identifier));
  
  if (itemToRestore) {
    // Add back to main (we assume main file exists, using empty initial if not)
    await addItem<T>(filename, itemToRestore, []);
    
    // Remove from trash
    const newTrashData = trashData.filter(item => (item.slug !== identifier) && (item.id !== identifier));
    await writeData(trashFilename, newTrashData);
  }
}

export async function readTrash<T>(filename: string): Promise<T[]> {
  return await readData<T>(`${filename}_trash`, []);
}

export async function deletePermanently<T extends { slug?: string; id?: string }>(filename: string, identifier: string): Promise<T[]> {
  const trashFilename = `${filename}_trash`;
  const trashData = await readData<T>(trashFilename, []);
  const newTrashData = trashData.filter(item => (item.slug !== identifier) && (item.id !== identifier));
  await writeData(trashFilename, newTrashData);
  return newTrashData;
}
