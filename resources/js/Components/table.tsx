function TableHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }) {
	return <thead className={`[&_tr]:border-b ${className}`} {...props} />;
}

function TableBody({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }) {
	return (
		<tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
	);
}

function TableRow({
	className,
	...props
}: React.HTMLAttributes<HTMLTableRowElement> & { className?: string }) {
	return (
		<tr className={`border-b transition-colors ${className}`} {...props} />
	);
}

function TableHead({
	className,
	...props
}: React.HTMLAttributes<HTMLTableCellElement> & { className?: string }) {
	return (
		<th
			className={`text-left align-left font-medium text-muted-foreground ${className}`}
			{...props}
		/>
	);
}

function TableCell({
	className,
	...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { className?: string }) {
	return <td className={`align-middle ${className}`} {...props} />;
}

export { TableBody, TableHeader, TableRow, TableHead, TableCell };
