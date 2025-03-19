"use client";

import { ExpenseCategoryGroupContext } from "@/hooks/use-expense-category-group";
import { useContext } from "react";

export function ExpenseCategoryGroupRoot() {
	const { expenseCategoryGroups } = useContext(ExpenseCategoryGroupContext);

	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">ExpenseCategoryGroupRoot</div>
		</main>
	);
}
