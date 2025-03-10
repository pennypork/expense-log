import { ExpenseTable } from "./expense-table";

const expenses = [
	{
		expenseId: "1",
		target: "Coffee",
		amount: 3,
		expensedAt: "2025-03-06",
	},
	{
		expenseId: "2",
		target: "Train Fare",
		amount: 8,
		expensedAt: "2025-03-06",
	},
	{
		expenseId: "3",
		target: "Book",
		amount: 20,
		expensedAt: "2025-03-06",
	},
];

export default function Page() {
	return (
		<main className="p-5">
			<div className="mx-auto max-w-xl">
				<ExpenseTable expenses={expenses} />
			</div>
		</main>
	);
}
