import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const GameOver = ({
	score,
	maxScore,
	setGameOver,
}: {
	score: number;
	maxScore: number;
	setGameOver: Dispatch<SetStateAction<boolean>>;
}) => {
	const router = useRouter();

	return (
		<div className="flex flex-col justify-center items-center flex-1 max-xs:gap-3 xs:gap-5">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Game Over</h1>
				<p>
					Your score was: {score}/{maxScore}
				</p>
			</div>

			<div className="flex gap-2">
				<button
					onClick={() => router.push("/")}
					className="bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2 self-center min-w-[100px] font-medium outline-none rounded"
				>
					Go back
				</button>

				<button
					onClick={() => setGameOver(false)}
					className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-2 self-center min-w-[100px] font-medium text-neutral-50 outline-none rounded"
					autoFocus
				>
					Retry
				</button>
			</div>
		</div>
	);
};

export default GameOver;
