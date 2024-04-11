import { Head, Link, useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { SelectInput } from "@/Components/SelectInput";
import type { ProjectResponse } from "@/types/project";
import type { UserResponse } from "@/types/user";

type CreateTaskProps = {
	projects: ProjectResponse;
	users: UserResponse;
} & PageProps;

type FormDataTypes = {
	image: null | File;
	name: string;
	status: string;
	priority: string;
	description: string;
	due_date: string;
	assigned_user_id: number | null;
	project_id: number | null;
};

function CreateTask({ auth, projects, users }: CreateTaskProps) {
	const { data, setData, post, errors, processing } = useForm<FormDataTypes>({
		image: null,
		name: "",
		status: "",
		priority: "",
		description: "",
		due_date: "",
		assigned_user_id: null,
		project_id: null,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		post(route("task.store"));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Create New Task
				</h2>
			}
		>
			<Head title="Task" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<form
							onSubmit={handleSubmit}
							className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-4"
						>
							<div>
								<InputLabel htmlFor="task_project_id" value="Project" />
								<SelectInput
									id="task_project_id"
									name="project_id"
									className="mt-1 block w-full"
									onChange={(e) =>
										setData("project_id", Number(e.target.value))
									}
								>
									<option value="">Select Project ID</option>
									{projects.data.map((project) => (
										<option key={project.id} value={project.id}>
											{project.name}
										</option>
									))}
								</SelectInput>
								<InputError message={errors.project_id} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_image_path" value="Task Image" />
								<TextInput
									id="task_image_path"
									type="file"
									name="image"
									className="mt-1 block w-full"
									onChange={(e) =>
										setData("image", e.target.files?.[0] ?? null)
									}
								/>
								<InputError message={errors.image} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_name" value="Name" />
								<TextInput
									id="task_name"
									type="text"
									name="name"
									value={data.name}
									className="mt-1 block w-full"
									onChange={(e) => setData("name", e.target.value)}
									isFocused
								/>
								<InputError message={errors.name} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_description" value="Description" />
								<TextAreaInput
									id="task_description"
									name="description"
									value={data.description}
									className="mt-1 block w-full"
									onChange={(e) => setData("description", e.target.value)}
								/>
								<InputError message={errors.description} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_due_date" value="Due Date" />
								<TextInput
									id="task_due_date"
									type="datetime-local"
									name="due_date"
									value={data.due_date}
									className="mt-1 block w-full [-webkit-calendar-picker-indicator]"
									onChange={(e) => setData("due_date", e.target.value)}
								/>
								<InputError message={errors.due_date} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_status" value="Status" />
								<SelectInput
									id="task_status"
									name="status"
									className="mt-1 block w-full"
									onChange={(e) => setData("status", e.target.value)}
								>
									<option value="">Select a status</option>
									<option value="pending">Pending</option>
									<option value="in_progress">In progress</option>
									<option value="completed">Completed</option>
								</SelectInput>
								<InputError message={errors.status} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="task_priority" value="Priority" />
								<SelectInput
									id="task_priority"
									name="priority"
									className="mt-1 block w-full"
									onChange={(e) => setData("priority", e.target.value)}
								>
									<option value="">Select a priority</option>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</SelectInput>
								<InputError message={errors.priority} className="mt-2" />
							</div>

							<div>
								<InputLabel
									htmlFor="task_assigned_user"
									value="Assigned User"
								/>
								<SelectInput
									id="task_assigned_user"
									name="assigned_user"
									className="mt-1 block w-full"
									onChange={(e) =>
										setData("assigned_user_id", Number(e.target.value))
									}
								>
									<option value="">Select User ID</option>
									{users.data.map((user) => (
										<option key={user.id} value={user.id}>
											{user.name}
										</option>
									))}
								</SelectInput>
								<InputError
									message={errors.assigned_user_id}
									className="mt-2"
								/>
							</div>
							<div className="flex justify-end gap-2">
								<Link
									href={route("task.index")}
									className="bg-gray-100 py-1 px-4 text-gray-800 rounded-md shadow transition-all hover:bg-gray-200"
								>
									Cancel
								</Link>

								<button
									type="submit"
									className={`bg-emerald-500 py-1 px-4 text-white rounded-md shadow transition-all hover:bg-emerald-600 disabled:bg-gray-600 ${
										processing ? "animate-pulse" : ""
									}`}
									disabled={processing}
								>
									{processing ? "Saving" : "Save"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default CreateTask;
