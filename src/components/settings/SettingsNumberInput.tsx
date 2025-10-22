const SettingsNumberInput = ({
	text,
	option,
	value,
	handleTypeSettings,
}: {
	text: string;
	option: string;
	value: number;
	handleTypeSettings: (option: string, value: number | boolean) => void;
}) => {
	return (
		<label className="flex flex-col gap-1">
			{text}
			<input
				type="number"
				onChange={(e) =>
					handleTypeSettings(option, +e.currentTarget.value)
				}
				value={value}
				className="px-2.5 py-1.5 bg-slate-200 dark:bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</label>
	);
};

export default SettingsNumberInput;
