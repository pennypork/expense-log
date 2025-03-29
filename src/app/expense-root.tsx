"use client";

import { ExpenseContext } from "@/hooks/use-expense";
import { useContext } from "react";
import { AddExpenseDialog } from "./add-expense-dialog";
import { ExpenseTable } from "./expense-table";

export function ExpenseRoot() {
	const { expenses, addExpense } = useContext(ExpenseContext);

	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">
				<ExpenseTable expenses={expenses} />
				<div className="mt-5 text-center">
					<AddExpenseDialog addExpense={addExpense} />
				</div>
			</div>
		</main>
	);
}
