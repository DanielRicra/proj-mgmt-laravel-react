import { useState, useEffect, type ReactNode } from "react";

type ToastProps = {
	children: ReactNode;
	duration?: number;
	className?: string;
	message: string;
};

function Toast({ children, duration = 1000, className, message }: ToastProps) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		setShow(true);
		const timerId = setTimeout(() => {
			setShow(false);
		}, duration);

		return () => clearTimeout(timerId);
	}, [duration, message]);

	return show ? (
		<div className={className} style={{ display: show ? "block" : "none" }}>
			{children}
		</div>
	) : null;
}

export default Toast;
