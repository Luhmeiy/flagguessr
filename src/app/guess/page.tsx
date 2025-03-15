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
	const [score, setScore] = useState(0);

	const [flags, setFlags] = useState<Flag[] | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const handleScore = useCallback(() => {
		setScore((prev) => prev + 1);
	}, []);

	useEffect(() => {
		if (gameOver) setAnswer("");

		if (!gameOver) {
			setPosition(1);
			setScore(0);
		}
	}, [gameOver]);

	useEffect(() => {
		const { selectedFlags } = JSON.parse(
			localStorage.getItem("flagGuessrSettings")!
		) as Settings;

		if (selectedFlags.length === 0) return router.push("/");
		setFlags(selectedFlags);
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
