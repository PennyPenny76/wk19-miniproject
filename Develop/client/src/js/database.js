// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
      openDB('namecards', 1, {
        upgrade(db) {
          if (db.objectStoreNames.contains('namecards')) {
            console.log('namecards database already exists');
            return;
          }
          db.createObjectStore('namecards', { keyPath: 'id', autoIncrement: true });
          console.log('namecards database created');
        },
      });


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
   
    console.log('Post to the database');
    const namecardsDb = await openDB('namecards', 1);
    const tx = namecardsDb.transaction('namecards', 'readwrite');
    const store = tx.objectStore('namecards');
    const request = store.add({ name, home, cell, email });
    const result = await request;
    console.log('Data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET all from the database');
    const namecardsDb = await openDB('namecards', 1);
  const tx = namecardsDb.transaction('namecards', 'readonly');
  const store = tx.objectStore('namecards');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
  const namecardsDb = await openDB('namecards', 1);
  const tx = namecardsDb.transaction('namecards', 'readwrite');
  const store = tx.objectStore('namecards');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
