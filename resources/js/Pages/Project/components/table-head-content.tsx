import ChevronUpDown from "@/Components/ChevronUpDown";

interface TableHeadContentProps {
	title: string;
	handleSort: () => void;
}

export function TableHeadContent({ title, handleSort }: TableHeadContentProps) {
	return (
		<div
			className="py-2 px-2 flex gap-1 justify-between items-center cursor-pointer active:bg-gray-700 rounded-md"
			onClick={handleSort}
		>
			<span className="capitalize">{title}</span>
			<ChevronUpDown strokeWidth={1.5} className="w-4 h-4" />
		</div>
	);
}
