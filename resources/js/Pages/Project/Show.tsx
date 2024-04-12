import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { Project } from "@/types/project";
import { taskStatusClass } from "../constants";
import TasksTable from "../Task/TasksTable";
import type { TasksResponse } from "@/types/task";

type ProjectDetailProps = {
	project: Project;

	tasks: TasksResponse;
	queryParams: { [key: string]: string } | null;
} & PageProps;

function ProjectDetail({
	project,
	auth,
	tasks,
	queryParams,
}: ProjectDetailProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Project "{project.name}"
					</h2>
					<Link
						href={route("project.edit", project.id)}
						className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-blue-500 sm:w-auto"
					>
						Edit
					</Link>
				</div>
			}
		>
			<Head title={`Project ${project.name}`} />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div>
							<img
								src={project.image_path}
								alt={project.name}
								className="w-full h-64 object-cover"
							/>
						</div>
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<div className="grid gap-1 grid-cols-2 mt-2">
								<div className="flex flex-col gap-2">
									<div>
										<span className="font-bold text-lg">Name</span>
										<p>{project.name}</p>
									</div>
									<div>
										<p className="font-bold text-lg">Status</p>
										<span
											className={`px-2 py-1 rounded-xl text-sm leading-3 text-white capitalize ${
												taskStatusClass[project.status]
											}`}
										>
											{project.status.split("_").join(" ")}
										</span>
									</div>
									<div>
										<span className="font-bold text-lg">Created by</span>
										<p>{project.created_by.name}</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<div>
										<span className="font-bold text-lg">Due Date</span>
										<p>{project.due_date}</p>
									</div>
									<div>
										<span className="font-bold text-lg">Created At</span>
										<p>{project.name}</p>
									</div>

									<div>
										<span className="font-bold text-lg">Updated by</span>
										<p>{project.updated_by.name}</p>
									</div>
								</div>
							</div>

							<div className="mt-4">
								<div>
									<span className="font-bold text-lg">Description</span>
									<p>{project.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="pb-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<h3 className="mb-2 font-bold text-2xl">Project Tasks</h3>
							<TasksTable
								queryParams={queryParams}
								tasks={tasks}
								showProjectColumn={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default ProjectDetail;
