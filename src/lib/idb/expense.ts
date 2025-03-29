import type { Expense } from "@/types/expense";
import { STORE_NAME, addOne, get, getAll } from "./idb";

export async function getExpense(
	expenseId: number,
): Promise<Expense | undefined> {
	return get<Expense>(STORE_NAME.EXPENSE, expenseId);
}

export function getAllExpenses(): Promise<Expense[] | undefined> {
	return getAll<Expense>(STORE_NAME.EXPENSE);
}

export async function addExpense(
	expense: Omit<Expense, "expenseId">,
): Promise<number> {
	const expenseId = await addOne(STORE_NAME.EXPENSE, expense);
	return expenseId;
}
