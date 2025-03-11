import { AddExpenseDialog } from "./add-expense-dialog";
import { ExpenseTable } from "./expense-table";

const expenses = [
	{
		expenseId: "1",
		expensedAt: "2025-03-06",
		description: "Coffee",
		memo: "",
		amount: 3,
		expenseCategoryId: "1",
	},
	{
		expenseId: "2",
		expensedAt: "2025-03-06",
		description: "Train Fare",
		amount: 8,
		memo: "",
		expenseCategoryId: "1",
	},
	{
		expenseId: "3",
		expensedAt: "2025-03-06",
		description: "Book",
		amount: 20,
		memo: "",
		expenseCategoryId: "2",
	},
];

export default function Page() {
	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">
				<ExpenseTable expenses={expenses} />
				<AddExpenseDialog />
			</div>
		</main>
	);
}
