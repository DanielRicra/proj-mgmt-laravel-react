import type { ResponseLink } from "@/types/project";
import { Link } from "@inertiajs/react";

type PaginationProps = {
	links: ResponseLink[];
};

export default function Pagination({ links }: PaginationProps) {
	return (
		<nav className="text-center mt-4">
			{links.map((link) => (
				<Link
					key={`page-${link.label}-${Math.random() * 100}`}
					dangerouslySetInnerHTML={{ __html: link.label }}
					href={link.url ?? ""}
					preserveScroll
					className={
						"inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
						(link.active ? "bg-gray-950 " : " ") +
						(!link.url
							? "text-gray-500 cursor-not-allowed "
							: " hover:bg-gray-950")
					}
				/>
			))}
		</nav>
	);
}
