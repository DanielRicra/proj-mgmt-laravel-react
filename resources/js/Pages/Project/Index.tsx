import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { ProjectResponse } from "@/types/project";
import { Head, Link, router } from "@inertiajs/react";
import { projectStatusClass } from "../constants";
import TextInput from "@/Components/TextInput";
import { SelectInput } from "@/Components/SelectInput";
import type { KeyboardEvent } from "react";
import {
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/table";
import { TableHeadContent } from "@/Components/table-head-content";
import Toast from "@/Components/Toast";

type IndexProps = {
	projects: ProjectResponse;
	queryParams: { [key: string]: string } | null;
	success?: string;
} & PageProps;

function Index({ auth, projects, queryParams, success }: IndexProps) {
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
			qP.sort_direction = qP.sort_direction === "asc" ? "desc" : "asc";
		} else {
			qP.sort_field = column;
			qP.sort_direction = "asc";
		}
		router.get(route("project.index"), qP);
	};

	const handleDeleteProject = (projectId: number) => {
		if (!window.confirm("Are you sure you want to delete this project?")) {
			return;
		}
		router.delete(route("project.destroy", projectId));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Projects
					</h2>

					<Link
						className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
						href={route("project.create")}
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
							<Toast duration={2000} message={success}>
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
							<div className="overflow-auto">
								<div className="mb-1 flex">
									<div className="px-3 py-3 flex items-center gap-1">
										<span className="">Search:</span>
										<TextInput
											placeholder="Project name"
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
											onChange={(e) =>
												searchFieldChanged("status", e.target.value)
											}
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
											<TableHead>Created By</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<tbody className="">
										{projects.data.length ? (
											projects.data.map((project) => (
												<TableRow
													key={project.id}
													className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
												>
													<TableCell className="py-1 px-2">
														{project.id}
													</TableCell>
													<TableCell className="py-1 px-2">
														<div className="w-12">
															<img
																src={project.image_path}
																alt={project.name + "avatar"}
																width={64}
																height={64}
																className="w-12 h-12 rounded-full object-cover"
															/>
														</div>
													</TableCell>
													<TableCell className="py-1 px-2">
														<Link
															href={route("project.show", project.id)}
															className="hover:underline"
														>
															{project.name}
														</Link>
													</TableCell>
													<TableCell className="py-1 px-2 text-nowrap">
														<span
															className={`px-2 py-1 rounded-xl text-sm leading-3 text-white capitalize ${
																projectStatusClass[project.status]
															}`}
														>
															{project.status.split("_").join(" ")}
														</span>
													</TableCell>
													<TableCell className="py-1 px-2 text-sm">
														{project.created_at}
													</TableCell>
													<TableCell className="py-1 px-2 text-sm">
														{project.due_date}
													</TableCell>
													<TableCell className="py-1 px-2">
														{project.created_by.name}
													</TableCell>
													<TableCell className="py-1 px-2">
														<div className="flex justify-around items-center">
															<Link
																href={route("project.edit", project.id)}
																className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-blue-500 sm:w-auto"
															>
																Edit
															</Link>
															<button
																type="button"
																onClick={() => handleDeleteProject(project.id)}
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
												<TableCell colSpan={8} className="h-24 text-center">
													No results.
												</TableCell>
											</TableRow>
										)}
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
