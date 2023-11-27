import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

interface ButtonOptions {
	/**
	 * Button display variants
	 * @default "primary"
	 * @type ButtonVariant
	 */
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: ReactNode;
	rightIcon?: ReactNode;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	ButtonOptions;

type ButtonVariant = "primary" | "secondary" | "danger" | "text";
type ButtonSize = "small" | "default";

const getVariant = (variant: ButtonVariant) => {
	switch (variant) {
		case "primary":
			return "bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white";
		case "secondary":
			return "bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white";
		case "text":
			return "hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white";
		case "danger":
			return "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white";
		default:
			return undefined;
	}
};

const getSize = (size: ButtonSize) => {
	switch (size) {
		case "small":
			return "h-9 w-9 min-w-fit gap-2";
		case "default":
			return "h-12 w-12 min-w-fit gap-2";
		default:
			return undefined;
	}
};
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
	const {
		variant = "primary",
		type = "button",
		size = "default",
		icon,
		rightIcon,
		className,
		children,
		...rest
	} = props;
	const paddingX = (rightIcon || icon) && !children ? "" : "px-4";
	const merged = clsx(
		"rounded-lg flex items-center justify-center",
		getVariant(variant),
		getSize(size),
		paddingX,
		className,
	);
	return (
		<button ref={ref} className={merged} type={type} {...rest}>
			{icon}
			{children}
			{rightIcon}
		</button>
	);
});

Button.displayName = "Button";
export default Button;
