const DB_NAME = "pennypork";
const DB_VERSION = 1;

export type StoreName =
	| "expenses"
	| "expenseCategories"
	| "expenseCategoryGroups";

export const openDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			if (event.target instanceof IDBRequest) {
				const db = event.target.result;
				db.createObjectStore("expenses", {
					keyPath: "expenseId",
					autoIncrement: true,
				});
				db.createObjectStore("expenseCategories", {
					keyPath: "expenseCategoryId",
					autoIncrement: true,
				});
				db.createObjectStore("expenseCategoryGroups", {
					keyPath: "expenseCategoryGroupId",
					autoIncrement: true,
				});
			}
		};

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

export const getOne = async <T>(
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

export const getMulti = async <T>(
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
