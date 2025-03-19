import { Dispatch, JSX, SetStateAction } from "react";
import Timer from "./Timer";
import { Settings } from "@/interfaces/Settings";

const PointsDisplay = ({
	settings,
	isTimerActive,
	lives,
	totalFlags,
	position,
	score,
	setGameOver,
}: {
	settings: Settings;
	isTimerActive: boolean;
	lives: number;
	totalFlags: number;
	position: number;
	score: number;
	setGameOver: Dispatch<SetStateAction<boolean>>;
}) => {
	const { isTimePerFlag, timePerFlag, totalTime } = settings.timed;
	const initialTime = isTimePerFlag ? timePerFlag : totalTime;

	const displayMap: { [key: string]: JSX.Element } = {
		casual: <p></p>,
		survival: <p>Lives: {lives}</p>,
		timed: (
			<Timer
				initialTime={initialTime}
				position={position}
				isTimePerFlag={isTimePerFlag}
				isTimerActive={isTimerActive}
				setGameOver={setGameOver}
			/>
		),
	};

	return (
		<div className="w-full max-w-96 grid grid-cols-3 font-semibold">
			{displayMap[settings.mode]}
			<p className="text-center">
				Score: {score}/{totalFlags}
			</p>
			<p className="text-end">
				Flag: {position}/{totalFlags}
			</p>
		</div>
	);
};

export default PointsDisplay;
