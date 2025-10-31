import { JSX, useState } from "react";
import { TypeSettingsInterface } from "@/interfaces/SettingComponents";
import SettingsNumberInput from "./SettingsNumberInput";
import SettingsCheckbox from "./SettingsCheckbox";

const TypeSettings = ({
	type,
	settings,
	handleSettings,
}: TypeSettingsInterface) => {
	const [isVisible, setIsVisible] = useState(false);

	const typeString = type === "mode" ? settings.mode : settings.style;

	const handleTypeSettings = (option: string, value: number | boolean) => {
		handleSettings({
			option: typeString,
			value: {
				[option]: value,
			},
		});
	};

	const typeMap: { [key: string]: JSX.Element } = {
		survival: (
			<>
				<SettingsNumberInput
					text="Number of lives:"
					option="lives"
					value={settings.survival.lives}
					handleTypeSettings={handleTypeSettings}
				/>

				<SettingsCheckbox
					text="Skip question after losing life?"
					option="skipOnLoss"
					checked={settings.survival.skipOnLoss}
					handleTypeSettings={handleTypeSettings}
				/>
			</>
		),
		timed: (
			<>
				<SettingsCheckbox
					text="Is time per flag?"
					option="isTimePerFlag"
					checked={settings.timed.isTimePerFlag}
					handleTypeSettings={handleTypeSettings}
				/>

				{settings.timed.isTimePerFlag ? (
					<SettingsNumberInput
						text="Time for each flag:"
						option="timePerFlag"
						value={settings.timed.timePerFlag}
						handleTypeSettings={handleTypeSettings}
					/>
				) : (
					<SettingsNumberInput
						text="Time for the whole quiz:"
						option="totalTime"
						value={settings.timed.totalTime}
						handleTypeSettings={handleTypeSettings}
					/>
				)}

				<SettingsCheckbox
					text="Skip question after wrong answer?"
					option="skipOnLoss"
					checked={settings.timed.skipOnLoss}
					handleTypeSettings={handleTypeSettings}
				/>
			</>
		),
		multiple: (
			<SettingsNumberInput
				text="Number of options:"
				option="options"
				value={settings.multiple.options}
				handleTypeSettings={handleTypeSettings}
			/>
		),
		written: (
			<SettingsCheckbox
				text="Turn on autocomplete?"
				option="autoComplete"
				checked={settings.written.autoComplete}
				handleTypeSettings={handleTypeSettings}
			/>
		),
	};

	return (
		<>
			<button
				onClick={() => setIsVisible((prev) => !prev)}
				className="text-neutral-500 text-sm self-start font-semibold hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 cursor-pointer transition-colors duration-300"
			>
				{!isVisible ? "Open" : "Close"} {type} settings
			</button>

			{isVisible && (
				<div className="flex flex-col gap-2 text-sm bg-slate-100 p-1.5 rounded dark:bg-neutral-900">
					{typeMap[typeString]}
				</div>
			)}
		</>
	);
};

export default TypeSettings;
