import { Head, Link, useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { SelectInput } from "@/Components/SelectInput";

type CreateProjectProps = PageProps;

type FormDataTypes = {
	image: null | File;
	name: string;
	status: string;
	description: string;
	due_date: string;
};

function CreateProject({ auth }: {} & CreateProjectProps) {
	const { data, setData, post, errors, reset } = useForm<FormDataTypes>({
		image: null,
		name: "",
		status: "",
		description: "",
		due_date: "",
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		post(route("project.store"));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Create New Project
				</h2>
			}
		>
			<Head title="Project" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<form
							onSubmit={handleSubmit}
							className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-4"
						>
							<div>
								<InputLabel
									htmlFor="project_image_path"
									value="Project Image"
								/>
								<TextInput
									id="project_image_path"
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
								<InputLabel htmlFor="project_name" value="Name" />
								<TextInput
									id="project_name"
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
								<InputLabel htmlFor="project_description" value="Description" />
								<TextAreaInput
									id="project_description"
									name="description"
									value={data.description}
									className="mt-1 block w-full"
									onChange={(e) => setData("description", e.target.value)}
								/>
								<InputError message={errors.description} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="project_due_date" value="Due Date" />
								<TextInput
									id="project_due_date"
									type="datetime-local"
									name="due_date"
									value={data.due_date}
									className="mt-1 block w-full [-webkit-calendar-picker-indicator]"
									onChange={(e) => setData("due_date", e.target.value)}
								/>
								<InputError message={errors.due_date} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="project_status" value="Status" />
								<SelectInput
									id="project_status"
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

							<div className="flex justify-end gap-2">
								<Link
									href={route("project.index")}
									className="bg-gray-100 py-1 px-4 text-gray-800 rounded-md shadow transition-all hover:bg-gray-200"
								>
									Cancel
								</Link>

								<button
									type="submit"
									className="bg-emerald-500 py-1 px-4 text-white rounded-md shadow transition-all hover:bg-emerald-600"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default CreateProject;
