import { Head, Link, useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { SelectInput } from "@/Components/SelectInput";
import type { User } from "@/types/user";

type EditUserProps = {
	user: User;
} & PageProps;

type FormDataTypes = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	_method: "PUT";
};

function EditUser({ auth, user }: EditUserProps) {
	const { data, setData, post, errors, processing } = useForm<FormDataTypes>({
		name: user.name,
		email: user.email,
		password: "",
		password_confirmation: "",
		_method: "PUT",
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		post(route("user.update", user.id));
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					Edit User "{user.name}"
				</h2>
			}
		>
			<Head title="User" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<form
							onSubmit={handleSubmit}
							className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-4"
						>
							<div>
								<InputLabel htmlFor="user_name" value="Name" />
								<TextInput
									id="user_name"
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
								<InputLabel htmlFor="user_email" value="Email" />
								<TextInput
									id="user_email"
									type="email"
									name="email"
									value={data.email}
									className="mt-1 block w-full"
									onChange={(e) => setData("email", e.target.value)}
								/>
								<InputError message={errors.email} className="mt-2" />
							</div>

							<div>
								<InputLabel htmlFor="user_password" value="Password" />
								<TextInput
									id="user_password"
									type="password"
									name="password"
									value={data.password}
									className="mt-1 block w-full"
									onChange={(e) => setData("password", e.target.value)}
								/>
								<InputError message={errors.password} className="mt-2" />
							</div>

							<div>
								<InputLabel
									htmlFor="user_password_confirmation"
									value="Confirm Password"
								/>
								<TextInput
									id="user_password_confirmation"
									type="password"
									name="password_confirmation"
									value={data.password_confirmation}
									className="mt-1 block w-full"
									onChange={(e) =>
										setData("password_confirmation", e.target.value)
									}
								/>
								<InputError
									message={errors.password_confirmation}
									className="mt-2"
								/>
							</div>

							<div className="flex justify-end gap-2">
								<Link
									href={route("user.index")}
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
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

export default EditUser;
