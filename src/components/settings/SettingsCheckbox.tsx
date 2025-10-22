const SettingsCheckbox = ({
	text,
	option,
	checked,
	handleTypeSettings,
}: {
	text: string;
	option: string;
	checked: boolean;
	handleTypeSettings: (option: string, value: number | boolean) => void;
}) => {
	return (
		<label className="flex flex-col gap-1">
			{text}
			<div className="self-start">
				<input
					type="checkbox"
					onChange={() => handleTypeSettings(option, !checked)}
					checked={checked}
				/>{" "}
				Yes
			</div>
		</label>
	);
};

export default SettingsCheckbox;
