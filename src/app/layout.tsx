import { ExpenseContextProvider } from "@/hooks/use-expense";
import { ExpenseCategoryContextProvider } from "@/hooks/use-expense-category";
import { ExpenseCategoryGroupContextProvider } from "@/hooks/use-expense-category-group";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "pennypork",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ExpenseContextProvider>
					<ExpenseCategoryContextProvider>
						<ExpenseCategoryGroupContextProvider>
							{children}
						</ExpenseCategoryGroupContextProvider>
					</ExpenseCategoryContextProvider>
				</ExpenseContextProvider>
			</body>
		</html>
	);
}
