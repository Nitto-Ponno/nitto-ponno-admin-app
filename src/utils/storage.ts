import localforage from 'localforage';

let instance: any;
try {
  instance = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: 'nitto-ponno-client',
  });
} catch (error) {
  console.error(error);
}

export default instance;
