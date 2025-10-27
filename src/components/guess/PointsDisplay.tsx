"use client";

import { ReactNode } from "react";
import { useSettings } from "../SettingsProvider";
import Timer from "./Timer";

const PointsDisplay = () => {
	const { lives, position, score, settings } = useSettings();

	const displayMap: { [key: string]: ReactNode } = {
		casual: <p></p>,
		survival: <p>Lives: {lives}</p>,
		timed: <Timer />,
	};

	return (
		<div className="w-full max-w-96 grid grid-cols-3 font-semibold">
			{displayMap[settings.mode]}
			<p className="text-center">Score: {score}</p>
			<p className="text-end">Flag: {position}</p>
		</div>
	);
};

export default PointsDisplay;
