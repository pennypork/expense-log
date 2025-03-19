"use client";

import { type StoreName, addOne } from "@/lib/idb/idb";
import type { ExpenseCategoryGroup } from "@/types/expense-category-group";
import { type ReactNode, createContext, useEffect, useState } from "react";

const STORE_NAME: StoreName = "expenses";

type ExpenseCategoryGroupContextValue = {
	expenseCategoryGroups: ExpenseCategoryGroup[];
	addExpenseCategoryGroup: (
		expenses: Omit<ExpenseCategoryGroup, "expenseCategoryGroupId">,
	) => void;
};

export const ExpenseCategoryGroupContext =
	createContext<ExpenseCategoryGroupContextValue>(
		{} as ExpenseCategoryGroupContextValue,
	);

export type ExpenseCategoryGroupContextProviderProps = {
	children: ReactNode;
};

export function ExpenseCategoryGroupContextProvider({
	children,
}: ExpenseCategoryGroupContextProviderProps) {
	const [expenseCategoryGroups, setExpenseCategories] = useState<
		ExpenseCategoryGroup[]
	>([]);

	// useEffect(() => {
	// 	(async () => {
	// const allExpenseCategories = await getAllExpenseCategories();
	// if (allExpenseCategories) {
	// 	setExpenseCategories(allExpenseCategories);
	// }
	// 	})();
	// }, []);

	async function addExpenseCategoryGroup(
		newExpenseCategoryGroup: Omit<
			ExpenseCategoryGroup,
			"expenseCategoryGroupId"
		>,
	) {
		const expenseCategoryGroupId = await addOne(
			STORE_NAME,
			newExpenseCategoryGroup,
		);

		setExpenseCategories((prevExpenseCategoryGroups) => [
			...prevExpenseCategoryGroups,
			{ expenseCategoryGroupId, ...newExpenseCategoryGroup },
		]);
	}

	return (
		<ExpenseCategoryGroupContext.Provider
			value={{ expenseCategoryGroups, addExpenseCategoryGroup }}
		>
			{children}
		</ExpenseCategoryGroupContext.Provider>
	);
}
