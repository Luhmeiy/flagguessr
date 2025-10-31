import { useState } from "react";
import FlagSelector from "./FlagSelector";
import PresetSelector from "./PresetSelector";
import { capitalize } from "@/utils/capitalize";

const FlagSelectionContainer = ({
	handleSettings,
}: {
	handleSettings: (
		option: string,
		value: string | { _id: string; name: string; imageUrl: string }[]
	) => void;
}) => {
	const [flagSelection, setFlagSelection] = useState("presets");

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex flex-col gap-1">
				<h3 className="font-bold">Flag Selection</h3>

				<div className="flex gap-1.5 bg-slate-100 p-1.5 rounded dark:bg-neutral-900">
					{["presets", "custom"].map((item) => (
						<button
							key={item}
							onClick={() => setFlagSelection(item)}
							className={`flex-1 py-1 rounded-sm hover:bg-slate-400 dark:hover:bg-neutral-600 cursor-pointer transition-colors duration-300 ${
								flagSelection === item &&
								"bg-slate-300 dark:bg-neutral-700"
							}`}
						>
							{capitalize(item)}
						</button>
					))}
				</div>
			</div>

			{flagSelection === "presets" && <PresetSelector />}
			{flagSelection === "custom" && (
				<FlagSelector handleSettings={handleSettings} />
			)}
		</div>
	);
};

export default FlagSelectionContainer;
