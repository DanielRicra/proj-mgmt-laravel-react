import { useState, useEffect, type ReactNode } from "react";

type ToastProps = {
	children: ReactNode;
	duration?: number;
	className?: string;
};

function Toast({ children, duration = 1000, className }: ToastProps) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setShow(false);
		}, duration);

		return () => clearTimeout(timerId);
	}, [duration]);

	return (
		<div className={className} style={{ display: show ? "block" : "none" }}>
			{children}
		</div>
	);
}

export default Toast;
