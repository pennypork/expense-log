const DB_NAME = "pennypork";
const DB_VERSION = 1;

export const STORE_NAME = {
	EXPENSE: "expenses",
	EXPENSE_CATEGORY: "expenseCategories",
	EXPENSE_CATEGORY_GROUP: "expenseCategoryGroups",
} as const;

export type StoreName = (typeof STORE_NAME)[keyof typeof STORE_NAME];

type StoreConfig = {
	storeName: StoreName;
	keyPath: string;
	autoIncrement?: boolean;
	indexes?: IndexConfig[];
};

type IndexConfig = {
	name: string;
	keyPath: string | string[];
	unique?: boolean;
};

const configs: StoreConfig[] = [
	{
		storeName: STORE_NAME.EXPENSE,
		keyPath: "expenseId",
		autoIncrement: true,
	},
	{
		storeName: STORE_NAME.EXPENSE_CATEGORY,
		keyPath: "expenseCategoryId",
		autoIncrement: true,
	},
	{
		storeName: STORE_NAME.EXPENSE_CATEGORY_GROUP,
		keyPath: "expenseCategoryGroupId",
		autoIncrement: true,
	},
];

export function initDB(db: IDBDatabase) {
	for (const config of configs) {
		db.createObjectStore(config.storeName, {
			keyPath: config.keyPath,
			autoIncrement: config.autoIncrement,
		});
	}
}

export const openDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = (event) => {
			if (event.target instanceof IDBOpenDBRequest) {
				initDB(event.target.result);
			}
		};
		request.onerror = () => reject();
		request.onsuccess = (event) => {
			if (event.target instanceof IDBOpenDBRequest) {
				resolve(event.target.result);
			} else {
				reject();
			}
		};
	});
};

export const get = async <T>(
	storeName: StoreName,
	key: IDBValidKey,
): Promise<T | undefined> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.get(key);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};

export const getAll = async <T>(
	storeName: StoreName,
	query?: IDBValidKey | IDBKeyRange | null,
	count?: number,
): Promise<T[] | undefined> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.getAll(query, count);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};

export const addOne = async <T>(
	storeName: StoreName,
	data: T,
): Promise<number> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, "readwrite");
		const store = transaction.objectStore(storeName);
		const request = store.add(data);
		request.onsuccess = (event) => {
			if (event.target instanceof IDBRequest) {
				resolve(event.target.result);
			}
		};
		request.onerror = () => reject(request.error);
	});
};

export const deleteOne = async <T>(
	storeName: StoreName,
	key: IDBValidKey,
): Promise<T | undefined> => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.delete(key);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};
