import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { TasksResponse } from "@/types/task";
import { Head, Link } from "@inertiajs/react";

import TasksTable from "./TasksTable";
import Toast from "@/Components/Toast";

type IndexProps = {
	tasks: TasksResponse;
	queryParams: { [key: string]: string } | null;
	success?: string;
} & PageProps;

function TaskList({ auth, tasks, queryParams, success }: IndexProps) {
	console.log(success);
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Tasks
					</h2>

					<Link
						className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
						href={route("task.create")}
					>
						Add new
					</Link>
				</div>
			}
		>
			<Head title="Project" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{success && (
						<div className="flex justify-center">
							<Toast duration={3000} message={success}>
								<div className="bg-green-600 py-2 px-4 text-white font-bold text-sm rounded-md mb-6 flex gap-1 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<title>Check</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
									<span className="capitalize">{success}</span>
								</div>
							</Toast>
						</div>
					)}

					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<TasksTable tasks={tasks} queryParams={queryParams} />
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default TaskList;
