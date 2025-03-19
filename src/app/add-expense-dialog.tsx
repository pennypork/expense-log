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
import { ExpenseContext } from "@/hooks/use-expense";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addExpenseFormSchema = z.object({
	expensedAt: z.date(),
	description: z.string(),
	memo: z.string(),
	amount: z.preprocess((v) => {
		console.log("debug", Number(v));
		return Number(v);
	}, z.number().int()),
	expenseCategoryId: z.string(),
});

export function AddExpenseDialog() {
	const { addExpense } = useContext(ExpenseContext);

	const form = useForm<z.infer<typeof addExpenseFormSchema>>({
		resolver: zodResolver(addExpenseFormSchema),
		mode: "onBlur",
		defaultValues: {
			expensedAt: new Date(),
			description: "",
			memo: "",
			amount: 0,
			expenseCategoryId: "",
		},
	});

	function onSubmit(values: z.infer<typeof addExpenseFormSchema>) {
		console.log(values);
		addExpense({
			expensedAt: "2025-03-06",
			description: "Lunch",
			memo: "",
			amount: 10,
			expenseCategoryId: 1,
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Expense</Button>
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
												selected={field.value}
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
										<Input type="number" {...field} />
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
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a verified email to display" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">m@google.com</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
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
										<Input {...field} />
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
