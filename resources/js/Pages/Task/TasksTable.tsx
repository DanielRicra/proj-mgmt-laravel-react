import type { KeyboardEvent } from "react";
import { Link, router } from "@inertiajs/react";

import Pagination from "@/Components/Pagination";
import {
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/table";
import type { Task, TasksResponse } from "@/types/task";
import { taskStatusClass } from "../constants";
import { TableHeadContent } from "@/Components/table-head-content";
import TextInput from "@/Components/TextInput";
import { SelectInput } from "@/Components/SelectInput";

type TaskTableProps = {
	tasks: TasksResponse;
	queryParams: { [key: string]: string } | null;
	showProjectColumn?: boolean;
};

function TasksTable({
	tasks,
	queryParams,
	showProjectColumn = true,
}: TaskTableProps) {
	const searchFieldChanged = (name: string, value: string): void => {
		const qParams = queryParams ?? {};
		if (value) {
			qParams[name] = value;
		} else {
			delete qParams[name];
		}
		router.get(route("task.index"), qParams);
	};

	const handleKeyDown = (
		name: string,
		e: KeyboardEvent<HTMLInputElement>,
	): void => {
		if (e.key !== "Enter") return;
		const value = (e.target as HTMLInputElement).value;
		searchFieldChanged(name, value);
	};

	const handleSort = (column: string): void => {
		const qP = queryParams ?? {};
		if (column === qP.sort_field) {
			qP.sort_direction = qP.sort_direction === "asc" ? "desc" : "asc";
		} else {
			qP.sort_field = column;
			qP.sort_direction = "asc";
		}
		router.get(route("task.index"), qP);
	};

	const handleDeleteTask = (task: Task) => {
		if (
			!window.confirm(
				`Are you sure you want to delete this Task "${task.name}"?`,
			)
		) {
			return;
		}
		router.delete(route("task.destroy", task.id));
	};

	return (
		<>
			<div className="overflow-auto">
				<div className="mb-1 flex">
					<div className="px-3 py-3 flex items-center gap-1">
						<span className="">Search:</span>
						<TextInput
							placeholder="Task name"
							className="w-full"
							defaultValue={queryParams?.name}
							onBlur={(e) => searchFieldChanged("name", e.target.value)}
							onKeyDown={(e) => handleKeyDown("name", e)}
						/>
					</div>
					<div className="px-3 py-3 flex gap-1 items-center">
						<span className="text-nowrap">Filter by status:</span>
						<SelectInput
							className="w-full"
							defaultValue={queryParams?.status}
							onChange={(e) => searchFieldChanged("status", e.target.value)}
						>
							<option value="">All</option>
							<option value="pending">Pending</option>
							<option value="in_progress">In progress</option>
							<option value="completed">Completed</option>
						</SelectInput>
					</div>
				</div>
				<table className="w-full">
					<TableHeader className="border-b-2 dark:border-gray-400 text-left">
						<TableRow className="text-nowrap mb-2">
							<TableHead>
								<TableHeadContent
									handleSort={() => handleSort("id")}
									title="ID"
								/>
							</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>
								<TableHeadContent
									handleSort={() => handleSort("name")}
									title="name"
								/>
							</TableHead>
							{showProjectColumn && <TableHead>Project Name</TableHead>}
							<TableHead>
								<TableHeadContent
									handleSort={() => handleSort("status")}
									title="status"
								/>
							</TableHead>
							<TableHead>
								<TableHeadContent
									handleSort={() => handleSort("created_at")}
									title="created at"
								/>
							</TableHead>
							<TableHead>
								<TableHeadContent
									handleSort={() => handleSort("due_date")}
									title="due date"
								/>
							</TableHead>
							<TableHead className="px-2">Created By</TableHead>
							<TableHead className="px-2">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<tbody className="">
						{tasks.data.length ? (
							tasks.data.map((task) => (
								<TableRow
									key={`task-${task.id}`}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
								>
									<TableCell className="py-1 px-2">{task.id}</TableCell>
									<TableCell className="py-1 px-2">
										<div className="w-12">
											<img
												src={task.image_path}
												alt={task.name + "avatar"}
												width={64}
												height={64}
												className="w-12 h-12 rounded-full object-cover"
											/>
										</div>
									</TableCell>
									<TableCell className="py-1 px-2">
										<Link
											href={route("task.show", task.id)}
											className="hover:underline"
										>
											{task.name}
										</Link>
									</TableCell>
									{showProjectColumn && (
										<TableCell className="py-1 px-2">
											{task.project.name}
										</TableCell>
									)}
									<TableCell className="py-1 px-2 text-nowrap">
										<span
											className={`px-2 py-1 rounded-xl text-sm leading-3 text-white capitalize ${
												taskStatusClass[task.status]
											}`}
										>
											{task.status.split("_").join(" ")}
										</span>
									</TableCell>
									<TableCell className="py-1 px-2 text-sm">
										{task.created_at}
									</TableCell>
									<TableCell className="py-1 px-2 text-sm">
										{task.due_date}
									</TableCell>
									<TableCell className="py-1 px-2">
										{task.created_by?.name}
									</TableCell>
									<TableCell className="py-1 px-2">
										<div className="flex justify-around items-center">
											<Link
												href={route("task.edit", task.id)}
												className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-blue-500 sm:w-auto"
											>
												Edit
											</Link>
											<button
												type="button"
												onClick={() => handleDeleteTask(task)}
												className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
											>
												Delete
											</button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={showProjectColumn ? 9 : 8}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</tbody>
				</table>
			</div>
			<Pagination links={tasks.meta.links} />
		</>
	);
}
export default TasksTable;
