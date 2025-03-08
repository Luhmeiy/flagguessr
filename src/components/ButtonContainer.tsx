import { Settings } from "@/interfaces/Settings";

interface ButtonContainerInterface {
	array: string[];
	type: string;
	settings: Settings;
	handleSettings: (option: string, value: string) => void;
}

const ButtonContainer = ({
	array,
	type,
	settings,
	handleSettings,
}: ButtonContainerInterface) => {
	const capitalize = (text: string) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold">{capitalize(type)}</h3>

			<div className="flex gap-1 bg-slate-100 p-1.5 rounded dark:bg-neutral-900">
				{array.map((item) => (
					<button
						key={item}
						onClick={() => handleSettings(type, item)}
						className={`flex-1 rounded-sm transition-colors hover:bg-slate-400 dark:hover:bg-neutral-600 ${
							(settings.mode === item ||
								settings.style === item) &&
							"bg-slate-300 dark:bg-neutral-700"
						}`}
					>
						{capitalize(item)}
					</button>
				))}
			</div>
		</div>
	);
};

export default ButtonContainer;
