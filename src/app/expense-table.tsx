import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import type { Expense } from "@/type/expense";

export type ExpenseTableProps = {
	expenses: Expense[];
};

export function ExpenseTable({ expenses }: ExpenseTableProps) {
	const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-20">Date</TableHead>
					<TableHead>Target</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{expenses.map((expense) => (
					<TableRow key={expense.expenseId}>
						<TableCell>{formatDate(expense.expensedAt, "M/D")}</TableCell>
						<TableCell>{expense.target}</TableCell>
						<TableCell className="text-right">
							{expense.amount.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							})}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell className="text-right">
						{total.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
