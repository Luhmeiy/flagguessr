"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AnswerInput from "@/components/AnswerInput";
import FlagDisplay from "@/components/FlagDisplay";
import GameOver from "@/components/GameOver";
import PointsDisplay from "@/components/PointsDisplay";
import { Flag } from "@/interfaces/Flag";
import { Settings } from "@/interfaces/Settings";

export default function Guess() {
	const router = useRouter();

	const [answer, setAnswer] = useState("");
	const [position, setPosition] = useState(1);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [score, setScore] = useState(0);
	const [lives, setLives] = useState(0);

	const [settings, setSettings] = useState<Settings>();
	const [flags, setFlags] = useState<Flag[] | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const handleScore = useCallback(() => {
		setScore((prev) => prev + 1);
	}, []);

	const handleLives = useCallback(() => {
		const updatedLives = lives - 1;

		setLives(updatedLives);

		if (updatedLives <= 0) {
			setGameOver(true);
		}
	}, [lives]);

	useEffect(() => {
		if (gameOver) setAnswer("");

		if (!gameOver) {
			setPosition(1);
			setScore(0);

			if (settings) {
				setLives(settings.survival.lives);
			}
		}
	}, [gameOver]);

	useEffect(() => {
		if (settings) {
			setLives(settings.survival.lives);
		}
	}, [settings]);

	useEffect(() => {
		const settings = JSON.parse(
			localStorage.getItem("flagGuessrSettings")!
		) as Settings;

		if (settings.selectedFlags.length === 0) return router.push("/");
		setSettings(settings);
		setFlags(settings.selectedFlags);
		setLives(settings.survival.lives);
	}, []);

	if (gameOver && flags) {
		return (
			<GameOver
				score={score}
				maxScore={flags.length}
				setGameOver={setGameOver}
			/>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center flex-1 p-8 pb-20 gap-8">
			{settings && flags && (
				<>
					<div className="w-full max-w-screen-sm flex flex-col items-center gap-2">
						<PointsDisplay
							settings={settings}
							isTimerActive={isTimerActive}
							lives={lives}
							totalFlags={flags.length}
							position={position}
							score={score}
							setGameOver={setGameOver}
						/>

						<FlagDisplay answer={answer} />
					</div>

					<AnswerInput
						settings={settings}
						defaultOptions={flags}
						answer={answer}
						setAnswer={setAnswer}
						setPosition={setPosition}
						setIsTimerActive={setIsTimerActive}
						setGameOver={setGameOver}
						handleScore={handleScore}
						handleLives={handleLives}
					/>
				</>
			)}
		</div>
	);
}
