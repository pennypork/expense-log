"use client";

import { type StoreName, addOne } from "@/lib/idb/idb";
import type { ExpenseCategory } from "@/types/expense-category";
import { type ReactNode, createContext, useEffect, useState } from "react";

const STORE_NAME: StoreName = "expenses";

type ExpenseCategoryContextValue = {
	expenseCategories: ExpenseCategory[];
	addExpenseCategory: (expenses: Omit<ExpenseCategory, "expenseId">) => void;
};

export const ExpenseCategoryContext =
	createContext<ExpenseCategoryContextValue>({} as ExpenseCategoryContextValue);

export type ExpenseCategoryContextProviderProps = {
	children: ReactNode;
};

export function ExpenseCategoryContextProvider({
	children,
}: ExpenseCategoryContextProviderProps) {
	const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
		[],
	);

	useEffect(() => {
		(async () => {
			// const allExpenseCategories = await getAllExpenseCategories();
			// if (allExpenseCategories) {
			// 	setExpenseCategories(allExpenseCategories);
			// }
		})();
	}, []);

	async function addExpenseCategory(
		newExpenseCategory: Omit<ExpenseCategory, "expenseId">,
	) {
		const expenseId = await addOne(STORE_NAME, newExpenseCategory);

		setExpenseCategories((prevExpenseCategories) => [
			...prevExpenseCategories,
			{ expenseId, ...newExpenseCategory },
		]);
	}

	return (
		<ExpenseCategoryContext.Provider
			value={{ expenseCategories, addExpenseCategory }}
		>
			{children}
		</ExpenseCategoryContext.Provider>
	);
}
