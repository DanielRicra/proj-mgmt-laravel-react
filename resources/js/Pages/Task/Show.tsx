import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { Task } from "@/types/task";
import { taskPriorityClass, taskStatusClass } from "../constants";

type TaskDetailProps = {
	task: Task;
} & PageProps;

function TaskDetail({ task, auth }: TaskDetailProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Task {task.name}
				</h2>
			}
		>
			<Head title={`Task ${task.name}`} />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div>
							<img
								src={task.image_path}
								alt={task.name}
								className="w-full h-64 object-cover"
							/>
						</div>
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<div className="grid gap-1 grid-cols-2 mt-2">
								<div className="flex flex-col gap-2">
									<div>
										<span className="font-bold text-lg">Name</span>
										<p>{task.name}</p>
									</div>
									<div>
										<p className="font-bold text-lg">Status</p>
										<span
											className={`px-2 py-1 rounded-xl text-sm leading-3 text-white capitalize ${
												taskStatusClass[task.status]
											}`}
										>
											{task.status.split("_").join(" ")}
										</span>
									</div>
									<div>
										<p className="font-bold text-lg">Priority</p>
										<span
											className={`px-2 py-1 rounded-xl text-sm leading-3 text-white capitalize ${
												taskPriorityClass[task.priority]
											}`}
										>
											{task.priority}
										</span>
									</div>
									<div>
										<span className="font-bold text-lg">Created by</span>
										<p>{task.created_by.name}</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<div>
										<span className="font-bold text-lg">Due Date</span>
										<p>{task.due_date}</p>
									</div>
									<div>
										<span className="font-bold text-lg">Created At</span>
										<p>{task.name}</p>
									</div>

									<div>
										<span className="font-bold text-lg">Updated by</span>
										<p>{task.updated_by.name}</p>
									</div>

									<div>
										<span className="font-bold text-lg">Project</span>
										<Link
											href={route("project.show", task.project.id)}
											className="hover:underline capitalize text-blue-400 font-bold"
										>
											<p>{task.project.name}</p>
										</Link>
									</div>

									<div>
										<span className="font-bold text-lg">Assigned to</span>
										<p>{task.assigned_user.name}</p>
									</div>
								</div>
							</div>

							<div className="mt-4">
								<div>
									<span className="font-bold text-lg">Description</span>
									<p>{task.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default TaskDetail;
