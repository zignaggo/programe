import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { MdKeyboardArrowDown } from "react-icons/md";
export interface IDropdownOption {
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	name?: string;
	selectedItem: IDropdownOption | undefined;
	setSelectedItem: Dispatch<SetStateAction<IDropdownOption>>;
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	type?: "arrow-down";
	placeHolder?: string;
	labelName?: string;
	selectedShow?: "label" | "labelValue";
}

function Dropdown({
	options,
	placeHolder,
	type,
	className,
	tabIndex,
	selectedItem,
	setSelectedItem,
	selectedShow = "labelValue",
}: IDropdownProps) {
	const [isFocused, setIsFocused] = useState(false);
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setIsFocused(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	const onValueChange = (selectedValue: IDropdownOption) => {
		setSelectedItem(selectedValue);
		setIsFocused(false);
	};
	useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

	return (
		<div
			ref={wrapperRef}
			className={clsx("border-[#979797] relative", className)}
		>
			<div
				tabIndex={tabIndex}
				className={clsx(
					"w-full h-[41px] px-2 justify-start gap-2 rounded-lg drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex items-center hover:cursor-pointer",
					{
						"rounded-b-[0]": isFocused,
					},
					className,
				)}
				onClick={() => setIsFocused(!isFocused)}
			>
				{type === "arrow-down" && <MdKeyboardArrowDown size={24} />}
				{selectedShow === "label" ? (
					<span className="text-lg">
						{selectedItem?.label ?? placeHolder}
					</span>
				) : (
					<span className="text-lg">
						{selectedItem?.labelValue ?? placeHolder}
					</span>
				)}
			</div>
			{isFocused && (
				<ul className="items-center p-2 gap-4 block absolute w-full rounded-md bg-white shadow-xl">
					{options.map((item, index) => (
						<li
							key={index}
							onClick={() => onValueChange(item)}
							className="rounded-md  drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex hover:bg-slate-200 hover:cursor-pointer px-2 py-2"
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;

Dropdown.defaultProps = {
	name: "",
	type: "",
	className: "",
	placeHolder: "",
	required: false,
	tabIndex: 0,
	labelName: "",
};
