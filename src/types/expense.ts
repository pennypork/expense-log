export type Expense = {
	expenseId: number;
	expensedAt: string;
	description: string;
	amount: number;
	expenseCategoryId: number | null;
	memo: string;
};
