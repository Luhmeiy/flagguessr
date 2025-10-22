"use client";

import Image from "next/image";
import { useSettings } from "../SettingsProvider";

const FlagDisplay = () => {
	const { answer } = useSettings();

	return (
		<div className="w-full flex bg-slate-200 rounded dark:bg-neutral-800 px-8 py-8 max-xs:h-64 max-xs:py-3 xs:h-72 xs:py-7 sm:h-96">
			{answer && (
				<Image
					src={answer.imageUrl}
					width="0"
					height="0"
					alt="Flag"
					className="object-contain w-full"
					priority
				/>
			)}
		</div>
	);
};

export default FlagDisplay;
