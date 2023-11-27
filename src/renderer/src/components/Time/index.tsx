import Button from "../Button";
import { MdDelete } from "react-icons/md";

type Timer = "hour" | "min" | "sec";

interface TimeProps {
	type: Timer;
	value: number;
	onDelete?: () => void;
}

export const Time = ({ onDelete, type, value }: TimeProps) => {
	const typeName = (type: Timer) => {
		switch (type) {
			case "hour":
				return "Horas";
			case "min":
				return "Minutos";
			case "sec":
				return "Segundos";
			default:
				return "--";
		}
	};
	return (
		<div className="flex w-48 h-16 items-center justify-start border border-slate-200 p-4 px-2 rounded-lg">
			<div className="flex flex-col w-full">
				<h1 className="text-xl font-bold text-slate-700">{value}</h1>
				<p className="text-base font-bold text-slate-400">{typeName(type)}</p>
			</div>
			<Button
				variant="text"
				title="delete"
				icon={<MdDelete size={24} color="#FF3C3C"/>}
				onClick={onDelete}
			/>
		</div>
	);
};
