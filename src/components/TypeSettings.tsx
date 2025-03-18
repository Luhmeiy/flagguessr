import { JSX, useState } from "react";
import { TypeSettingsInterface } from "@/interfaces/SettingComponents";

const TypeSettings = ({
	type,
	settings,
	handleSettings,
}: TypeSettingsInterface) => {
	const [isVisible, setIsVisible] = useState(false);

	const typeString = type === "mode" ? settings.mode : settings.style;

	const handleTypeSettings = (option: string, value: number | boolean) => {
		handleSettings(typeString, {
			[option]: value,
		});
	};

	const typeMap: { [key: string]: JSX.Element } = {
		survival: (
			<div className="flex flex-col gap-2 text-sm bg-slate-100 p-1.5 rounded dark:bg-neutral-900">
				<label className="flex flex-col gap-1">
					Number of lives:
					<input
						type="number"
						onChange={(e) =>
							handleTypeSettings("lives", +e.currentTarget.value)
						}
						value={settings.survival.lives}
						className="px-2.5 py-1.5 bg-slate-200 dark:bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</label>

				<label className="flex flex-col gap-1">
					Skip question after losing life?
					<div className="self-start">
						<input
							type="checkbox"
							onChange={() =>
								handleTypeSettings(
									"skipOnLoss",
									!settings.survival.skipOnLoss
								)
							}
							checked={settings.survival.skipOnLoss}
						/>{" "}
						Yes
					</div>
				</label>
			</div>
		),
		timed: <div></div>,
	};

	return (
		<>
			<button
				onClick={() => setIsVisible((prev) => !prev)}
				className="text-neutral-500 text-sm self-start font-semibold transition-colors hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
			>
				{!isVisible ? "Open" : "Close"} {type} settings
			</button>

			{isVisible && typeMap[typeString]}
		</>
	);
};

export default TypeSettings;
