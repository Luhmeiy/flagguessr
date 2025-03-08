"use client";

import { useCallback, useEffect, useState } from "react";
import AnswerInput from "@/components/AnswerInput";
import FlagDisplay from "@/components/FlagDisplay";
import GameOver from "@/components/GameOver";
import PointsDisplay from "@/components/PointsDisplay";
import { Flag } from "@/interfaces/Flag";

export default function Guess() {
	const [answer, setAnswer] = useState("");
	const [position, setPosition] = useState(1);
	const [score, setScore] = useState(0);

	const [flags, setFlags] = useState<Flag[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [gameOver, setGameOver] = useState(false);

	const handleScore = useCallback(() => {
		setScore((prev) => prev + 1);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/flags");

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (!Array.isArray(data) || data.length === 0) {
					throw new Error("No flags available");
				}

				setFlags(data);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to load flag"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (gameOver) setAnswer("");

		if (!gameOver) {
			setPosition(1);
			setScore(0);
		}
	}, [gameOver]);

	if (error) return <div className="text-red-500">{error}</div>;
	if (isLoading) return null;

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
			<div className="w-full max-w-screen-sm flex flex-col items-center gap-2">
				{flags && (
					<PointsDisplay
						totalFlags={flags.length}
						position={position}
						score={score}
					/>
				)}
				<FlagDisplay answer={answer} />
			</div>

			{flags && (
				<AnswerInput
					defaultOptions={flags}
					answer={answer}
					setAnswer={setAnswer}
					setPosition={setPosition}
					setGameOver={setGameOver}
					handleScore={handleScore}
				/>
			)}
		</div>
	);
}
