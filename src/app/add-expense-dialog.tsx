"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Expense } from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addExpenseFormSchema = z.object({
	expensedAt: z.preprocess(
		(v) =>
			formatDate(v instanceof Date ? new Date(v) : new Date(), "YYYY-MM-DD"),
		z.string().date(),
	),
	description: z.string().min(1),
	memo: z.string(),
	amount: z.preprocess((v) => Number(v), z.number().int()),
	expenseCategoryId: z.preprocess(
		(v) => Number(v),
		z.number().int().nullable(),
	),
});

export type AddExpenseDialog = {
	addExpense: (expenses: Omit<Expense, "expenseId">) => void;
};

export function AddExpenseDialog({ addExpense }: AddExpenseDialog) {
	const form = useForm<z.infer<typeof addExpenseFormSchema>>({
		resolver: zodResolver(addExpenseFormSchema),
		mode: "onBlur",
		defaultValues: {
			expensedAt: formatDate(new Date(), "YYYY-MM-DD"),
			description: "",
			amount: undefined,
			expenseCategoryId: null,
			memo: "",
		},
	});

	function onSubmit(values: z.infer<typeof addExpenseFormSchema>) {
		form.reset();
		addExpense(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<PlusIcon /> Add Expense
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<DialogHeader>
							<DialogTitle>Add Expense</DialogTitle>
						</DialogHeader>
						<FormField
							control={form.control}
							name="expensedAt"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>expensedAt</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														formatDate(field.value, "YYYY-MM-DD")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={new Date(field.value)}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>description</FormLabel>
									<FormControl>
										<Input placeholder="coffee" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="100"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="expenseCategoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>expenseCategoryId</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="not categorized" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="1">category 1</SelectItem>
											<SelectItem value="2">category 2</SelectItem>
											<SelectItem value="3">category 3</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="memo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>memo</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
