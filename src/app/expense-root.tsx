"use client";

import { ExpenseContext } from "@/hooks/use-expense";
import { useContext } from "react";
import { AddExpenseDialog } from "./add-expense-dialog";
import { ExpenseTable } from "./expense-table";

export function ExpenseRoot() {
	const { expenses } = useContext(ExpenseContext);

	console.log(expenses);
	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">
				<ExpenseTable expenses={expenses} />
				<AddExpenseDialog />
			</div>
		</main>
	);
}
