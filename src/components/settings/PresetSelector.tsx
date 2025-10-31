import { useEffect, useState } from "react";
import { Preset } from "@/interfaces/Preset";

const PresetSelector = () => {
	const [presets, setPresets] = useState<Preset[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [selected, setSelected] = useState<string>();

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

				const data = await response.json();

				setSelected(data[0]._id);
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

	return (
		<div className="flex flex-col gap-2">
			{error && <div className="text-red-500">{error}</div>}

			<div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-100 rounded dark:bg-neutral-900">
				{!isLoading &&
					presets &&
					presets.map((preset) => (
						<button
							key={preset._id}
							onClick={() => setSelected(preset._id)}
							className={`flex-1 px-2 py-1 rounded-sm hover:bg-slate-400 dark:hover:bg-neutral-600 cursor-pointer transition-colors duration-300 ${
								selected === preset._id &&
								"bg-slate-300 dark:bg-neutral-700"
							}`}
						>
							{preset.name}
						</button>
					))}
			</div>
		</div>
	);
};

export default PresetSelector;
