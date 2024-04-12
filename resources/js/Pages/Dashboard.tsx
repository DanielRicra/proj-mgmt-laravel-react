import { Head, Link } from "@inertiajs/react";

import {
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { Task } from "@/types/task";
import { taskPriorityClass, taskStatusClass } from "./constants";

type DashboardProps = {
	tasksCounts: {
		totalPendingTasks: string;
		totalInProgressTasks: string;
		totalCompletedTasks: string;
		userPendingTasks: string;
		userCompletedTasks: string;
		userInProgressTasks: string;
	};
	activeTasks: {
		data: Task[];
	};
} & PageProps;

export default function Dashboard({
	auth,
	tasksCounts,
	activeTasks,
}: DashboardProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Dashboard
				</h2>
			}
		>
			<Head title="Dashboard" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
							<h3 className="text-amber-600 font-semibold text-2xl">
								Pending Tasks
							</h3>
							<p className="flex gap-2 text-xl">
								<span>{tasksCounts.userPendingTasks}</span>/
								<span>{tasksCounts.totalPendingTasks}</span>
							</p>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
							<h3 className="text-blue-500 font-semibold text-2xl">
								In Progress Tasks
							</h3>
							<p className="flex gap-2 text-xl">
								<span>{tasksCounts.userInProgressTasks}</span>/
								<span>{tasksCounts.totalInProgressTasks}</span>
							</p>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
							<h3 className="text-green-600 font-semibold text-2xl">
								Completed Tasks
							</h3>
							<p className="flex gap-2 text-xl">
								<span>{tasksCounts.userCompletedTasks}</span>/
								<span>{tasksCounts.totalCompletedTasks}</span>
							</p>
						</div>
					</div>

					<div className="col-span-1 sm:col-span-2 md:col-span-3">
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
								<h3 className="text-gray-200 font-semibold text-2xl">
									My actives tasks
								</h3>

								<div className="overflow-y-auto">
									<table className="w-full">
										<TableHeader className="border-b-2 dark:border-gray-400 text-left">
											<TableRow className="*:capitalize">
												<TableHead className="py-2 px-2">ID</TableHead>
												<TableHead className="py-2 px-2">name</TableHead>
												<TableHead className="py-2 px-2">status</TableHead>
												<TableHead className="py-2 px-2">priority</TableHead>
												<TableHead className="py-2 px-2">due date</TableHead>
												<TableHead className="py-2 px-2">
													project name
												</TableHead>
											</TableRow>
										</TableHeader>
										<tbody>
											{activeTasks.data.map((task) => (
												<TableRow
													key={task.id}
													className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900 *:py-1 *:px-1 *:text-gray-300"
												>
													<TableCell>{task.id}</TableCell>
													<TableCell>
														<Link
															href={route("task.show", task.id)}
															className="text-slate-400 font-semibold hover:underline"
														>
															{task.name}
														</Link>
													</TableCell>
													<TableCell>
														<span
															className={`px-2 py-1 rounded-xl text-xs leading-3 text-white capitalize text-nowrap ${
																taskStatusClass[task.status]
															}`}
														>
															{task.status.split("_").join(" ")}
														</span>
													</TableCell>
													<TableCell>
														<span
															className={`px-2 py-1 rounded-xl text-xs leading-3 text-white capitalize ${
																taskPriorityClass[task.priority]
															}`}
														>
															{task.priority}
														</span>
													</TableCell>
													<TableCell>{task.due_date}</TableCell>
													<TableCell>
														<Link
															href={route("project.show", task.project.id)}
															className="text-blue-400 hover:underline"
														>
															{task.project.name}
														</Link>
													</TableCell>
												</TableRow>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
