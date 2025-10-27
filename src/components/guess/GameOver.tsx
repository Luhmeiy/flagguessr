"use client";

import { useRouter } from "next/navigation";
import { useSettings } from "../SettingsProvider";

const GameOver = () => {
	const router = useRouter();
	const { score, setGameOver } = useSettings();

	return (
		<div className="flex flex-col justify-center items-center flex-1 gap-3">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Game Over</h1>
				<p>Your score was: {score}</p>
			</div>

			<div className="flex gap-2">
				<button
					className="bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2 self-center min-w-[100px] font-medium outline-none rounded cursor-pointer transition-colors duration-300"
					onClick={() => router.push("/")}
				>
					Go back
				</button>

				<button
					autoFocus
					className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-2 self-center min-w-[100px] font-medium text-neutral-50 outline-none rounded cursor-pointer transition-colors duration-300"
					onClick={() => setGameOver(false)}
				>
					Retry
				</button>
			</div>
		</div>
	);
};

export default GameOver;
