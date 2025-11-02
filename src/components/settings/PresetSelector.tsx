import { useEffect, useState } from "react";
import { HandleSettings } from "@/interfaces/HandleSettings";
import { Preset, PresetGroup } from "@/interfaces/Preset";
import { capitalize } from "@/utils/capitalize";

const presetTypes = ["countries", "states"];

const PresetSelector = ({
	handleSettings,
}: {
	handleSettings: HandleSettings;
}) => {
	const [presets, setPresets] = useState<PresetGroup[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [selected, setSelected] = useState<Preset>();

	useEffect(() => {
		const fetchPresets = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/presets", {
					next: { revalidate: 3600 },
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = (await response.json()) as PresetGroup[];
				const defaultPreset = data.find((c) => c._id === "countries")!
					.presets[0];

				setSelected(defaultPreset);
				handleSettings({
					option: "selectedPreset",
					value: defaultPreset,
				});
				setPresets(data);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to load presets"
				);
			} finally {
				setIsLoading(false);
			}
		};

		if (!presets) fetchPresets();
	}, []);

	useEffect(() => {
		if (selected) {
			handleSettings({ option: "selectedPreset", value: selected });
		}
	}, [selected]);

	return (
		<div className="flex flex-col gap-2">
			{error && <div className="text-red-500">{error}</div>}

			{!isLoading &&
				presets &&
				presetTypes.map((presetType) => (
					<div key={presetType} className="flex flex-col gap-0.5">
						<h4 className="font-semibold">
							{capitalize(presetType)}
						</h4>

						<div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-100 rounded dark:bg-neutral-900">
							{presets
								.find((c) => c._id === presetType)
								?.presets.map((preset) => (
									<button
										key={preset._id}
										onClick={() => setSelected(preset)}
										className={`flex-1 px-2 py-1 rounded-sm hover:bg-slate-400 dark:hover:bg-neutral-600 cursor-pointer transition-colors duration-300 ${
											selected?._id === preset._id &&
											"bg-slate-300 dark:bg-neutral-700"
										}`}
									>
										{preset.name}
									</button>
								))}
						</div>
					</div>
				))}
		</div>
	);
};

export default PresetSelector;
