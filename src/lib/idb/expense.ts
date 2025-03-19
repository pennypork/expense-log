import type { Expense } from "@/types/expense";
import { type StoreName, addOne, getMulti, getOne } from "./idb";

const STORE_NAME: StoreName = "expenses";

export function getExpense(expenseId: number): Promise<Expense | undefined> {
	return getOne<Expense>(STORE_NAME, expenseId);
}

export function getAllExpenses(): Promise<Expense[] | undefined> {
	return getMulti<Expense>(STORE_NAME);
}
