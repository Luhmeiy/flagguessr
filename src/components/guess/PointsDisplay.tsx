"use client";

import { ReactNode } from "react";
import Timer from "./Timer";
import { useSettings } from "../SettingsProvider";

const PointsDisplay = () => {
	const { settings, flags, lives, score, position } = useSettings();

	const displayMap: { [key: string]: ReactNode } = {
		casual: <p></p>,
		survival: <p>Lives: {lives}</p>,
		timed: <Timer />,
	};

	return (
		<div className="w-full max-w-96 grid grid-cols-3 font-semibold">
			{displayMap[settings.mode]}
			<p className="text-center">
				Score: {score}/{flags.length}
			</p>
			<p className="text-end">
				Flag: {position}/{flags.length}
			</p>
		</div>
	);
};

export default PointsDisplay;
