"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

const Timer = ({
	initialTime,
	position,
	isTimePerFlag,
	isTimerActive,
	setGameOver,
}: {
	initialTime: number;
	position: number;
	isTimePerFlag: boolean;
	isTimerActive: boolean;
	setGameOver: Dispatch<SetStateAction<boolean>>;
}) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;

		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isTimerActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setGameOver(true);
		}

		return () => clearInterval(interval);
	}, [isTimerActive, timeLeft]);

	useEffect(() => {
		if (isTimePerFlag) setTimeLeft(initialTime);
	}, [position]);

	return <p>Time: {formatTime(timeLeft)}</p>;
};

export default Timer;
