import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { ProjectResponse } from "@/types/project";
import { Head, Link, router } from "@inertiajs/react";
import { projectStatusClass } from "../constants";
import TextInput from "@/Components/TextInput";
import { SelectInput } from "@/Components/SelectInput";
import type { ChangeEvent, KeyboardEvent } from "react";

type IndexProps = {
	projects: ProjectResponse;
	queryParams: { [key: string]: string } | null;
} & PageProps;

function Index({ auth, projects, queryParams }: IndexProps) {
	const searchFieldChanged = (name: string, value: string): void => {
		const qParams = queryParams ?? {};
		if (value) {
			qParams[name] = value;
		} else {
			delete qParams[name];
		}
		router.get(route("project.index"), qParams);
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
			if (qP.sort_direction === "asc") {
				qP.sort_direction = "desc";
			} else {
				qP.sort_direction = "asc";
			}
		} else {
			qP.sort_field = column;
			qP.sort_direction = "asc";
		}
		router.get(route("project.index"), qP);
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Projects
				</h2>
			}
		>
			<Head title="Project" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<div className="overflow-auto">
								<table className="w-full">
									<thead className="border-b-2 dark:border-gray-400 mb-1">
										<tr className="text-nowrap text-left">
											<th
												onClick={() => handleSort("id")}
												className="px-3 py-3"
											>
												ID
											</th>
											<th className="px-3 py-3">Image</th>
											<th
												onClick={() => handleSort("name")}
												className="px-3 py-3"
											>
												Name
											</th>
											<th
												onClick={() => handleSort("status")}
												className="px-3 py-3"
											>
												Status
											</th>
											<th
												onClick={() => handleSort("created_at")}
												className="px-3 py-3"
											>
												Created Date
											</th>
											<th
												onClick={() => handleSort("due_date")}
												className="px-3 py-3"
											>
												Due Date
											</th>
											<th className="px-3 py-3">Created By</th>
											<th className="px-3 py-3">Actions</th>
										</tr>
									</thead>
									<thead className="border-b-2 dark:border-gray-400 mb-1">
										<tr className="text-nowrap text-left">
											<th className="px-3 py-3" />
											<th className="px-3 py-3" />
											<th className="px-3 py-3">
												<TextInput
													placeholder="Project name"
													className="w-full"
													defaultValue={queryParams?.name}
													onBlur={(e) =>
														searchFieldChanged("name", e.target.value)
													}
													onKeyDown={(e) => handleKeyDown("name", e)}
												/>
											</th>
											<th className="px-3 py-3">
												<SelectInput
													className="w-full"
													defaultValue={queryParams?.status}
													onChange={(e) =>
														searchFieldChanged("status", e.target.value)
													}
												>
													<option value="">Select Status</option>
													<option value="pending">Pending</option>
													<option value="in_progress">In progress</option>
													<option value="completed">Completed</option>
												</SelectInput>
											</th>
											<th className="px-3 py-3" />
											<th className="px-3 py-3" />
											<th className="px-3 py-3" />
											<th className="px-3 py-3" />
										</tr>
									</thead>
									<tbody className="">
										{projects.data.map((project) => (
											<tr
												key={project.id}
												className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
											>
												<td className="py-1 px-2">{project.id}</td>
												<td className="py-1 px-2">
													<img
														src={project.image_path}
														alt={project.name + "avatar"}
														width={64}
														height={64}
														className="w-12 h-12 rounded-full object-cover"
													/>
												</td>
												<td className="py-1 px-2">{project.name}</td>
												<td className="py-1 px-2 capitalize">
													<span
														className={`px-2 py-1 rounded-xl text-sm leading-3 text-white ${
															projectStatusClass[project.status]
														}`}
													>
														{project.status.split("_").join(" ")}
													</span>
												</td>
												<td className="py-1 px-2">{project.created_at}</td>
												<td className="py-1 px-2">{project.due_date}</td>
												<td className="py-1 px-2">{project.created_by.name}</td>
												<td className="py-1 px-2 ">
													<div className="flex justify-around items-center">
														<Link
															href={route("project.edit", project.id)}
															className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-blue-500 sm:w-auto"
														>
															Edit
														</Link>
														<Link
															href={route("project.destroy", project.id)}
															className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
														>
															Delete
														</Link>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<Pagination links={projects.meta.links} />
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default Index;
