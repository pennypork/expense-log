import type { ColorName, ColorTone } from "@/lib/color";

export type ExpenseCategory = {
	expenseCategoryId: number;
	name: string;
	colorName: ColorName;
	colorTone: ColorTone;
	expenseCategoryGroupId: number | null;
};
