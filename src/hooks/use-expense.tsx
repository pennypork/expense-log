"use client";

import { getAllExpenses } from "@/lib/idb/expense";
import { type StoreName, addOne } from "@/lib/idb/idb";
import type { Expense } from "@/types/expense";
import { type ReactNode, createContext, useEffect, useState } from "react";

const STORE_NAME: StoreName = "expenses";

type ExpenseContextValue = {
	expenses: Expense[];
	addExpense: (expenses: Omit<Expense, "expenseId">) => void;
};

export const ExpenseContext = createContext<ExpenseContextValue>(
	{} as ExpenseContextValue,
);

export type ExpenseContextProviderProps = {
	children: ReactNode;
};

export function ExpenseContextProvider({
	children,
}: ExpenseContextProviderProps) {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	useEffect(() => {
		(async () => {
			const allExpenses = await getAllExpenses();
			// const allExpenses = mockExpenses;

			if (allExpenses) {
				setExpenses(allExpenses);
			}
		})();
	}, []);

	async function addExpense(newExpense: Omit<Expense, "expenseId">) {
		const expenseId = await addOne(STORE_NAME, newExpense);

		setExpenses((prevExpenses) => [
			...prevExpenses,
			{ expenseId, ...newExpense },
		]);
	}

	return (
		<ExpenseContext.Provider value={{ expenses, addExpense }}>
			{children}
		</ExpenseContext.Provider>
	);
}
