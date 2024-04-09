import type { SVGAttributes } from "react";

interface SvgProps {
	width?: number;
	height?: number;
	className?: string;
	fill?: string;
	stroke?: string;
	title?: string;
}

export default function ChevronUpDown({
	width = 24,
	height = 24,
	className = "",
	title = "Icon",
	stroke = "currentColor",
	fill = "none",
	...props
}: SVGAttributes<SVGElement> & SvgProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox={`0 0 ${width} ${height}`} // Dynamic viewBox based on props
			stroke={stroke}
			className={className}
			{...props}
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
			/>
		</svg>
	);
}
