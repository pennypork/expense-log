import type { Color } from "@/lib/color";

export type ExpenseCategory = {
	expenseCategoryId: number;
	name: string;
	color: Color;
	expenseCategoryGroupId: number | null;
};
