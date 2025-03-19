"use client";

import { ExpenseCategoryContext } from "@/hooks/use-expense-category";
import { useContext } from "react";

export function ExpenseCategoryRoot() {
	const { expenseCategories } = useContext(ExpenseCategoryContext);

	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">ExpenseCategoryRoot</div>
		</main>
	);
}
