import {
  getDatabase,
  ref as dbRef,
  query as dbQuery,
  orderByChild,
  limitToLast,
  get,
  onValue,
} from '@react-native-firebase/database';

export type Reading = {
  temperature?: number;
  humidity?: number;
  timestamp?: number;
  [key: string]: any;
};

/**
 * Get the latest reading once from a specified path.
 * If your data children have a `timestamp` field, this will return the most
 * recent node based on that timestamp. Otherwise, order using keys.
 */
export async function getLatestReading(refPath = '/sensors/data'): Promise<Reading | null> {
  try {
    const db = getDatabase();
    const q = dbQuery(dbRef(db, refPath), orderByChild('timestamp'), limitToLast(1));
    const snapshot = await get(q);

    let last: Reading | null = null;
    snapshot.forEach((childSnap) => {
      last = childSnap.val();
      // continue iterating (there should be only one child because of limitToLast(1))
      return undefined;
    });

    return last;
  } catch (error) {
    // Re-throw or handle error as needed by the app
    console.warn('Error fetching latest reading:', error);
    return null;
  }
}

/**
 * Subscribe to the latest reading (realtime). Returns an unsubscribe function.
 * onUpdate receives the latest Reading or null when there is no data.
 */
export function subscribeToLatestReading(
  refPath = '/sensors/data',
  onUpdate: (reading: Reading | null) => void
): () => void {
  const db = getDatabase();
  const q = dbQuery(dbRef(db, refPath), orderByChild('timestamp'), limitToLast(1));

  const listener = (snapshot: any) => {
    let last: Reading | null = null;
    snapshot.forEach((childSnap: any) => {
      last = childSnap.val();
      return undefined;
    });
    onUpdate(last);
  };

  const unsubscribe = onValue(q, listener);

  return unsubscribe;
}

export default {
  getLatestReading,
  subscribeToLatestReading,
};
