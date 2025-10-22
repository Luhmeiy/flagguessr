"use client";

import { useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import GameOver from "./guess/GameOver";
import { defaultSettings } from "./settings/SettingsMenu";
import { Flag } from "@/interfaces/Flag";
import { Settings } from "@/interfaces/Settings";

const SettingsContext = createContext<{
	answer: Flag;
	flags: Flag[];
	settings: Settings;
	lives: number;
	gameOver: boolean;
	score: number;
	position: number;
	isTimerActive: boolean;
	handleLives: () => void;
	handleScore: () => void;
	setAnswer: Dispatch<SetStateAction<Flag | null>>;
	setPosition: Dispatch<SetStateAction<number>>;
	setGameOver: Dispatch<SetStateAction<boolean>>;
	setIsTimerActive: Dispatch<SetStateAction<boolean>>;
}>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [flags, setFlags] = useState<Flag[] | null>(null);
	const [answer, setAnswer] = useState<Flag | null>(null);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [gameOver, setGameOver] = useState(false);

	const [isTimerActive, setIsTimerActive] = useState(false);
	const [lives, setLives] = useState(0);
	const [position, setPosition] = useState(1);
	const [score, setScore] = useState(0);

	const handleLives = useCallback(() => {
		const updatedLives = lives - 1;

		setLives(updatedLives);

		if (updatedLives <= 0) {
			setGameOver(true);
		}
	}, [lives]);

	const handleScore = useCallback(() => {
		setScore((prev) => prev + 1);
	}, []);

	useEffect(() => {
		if (gameOver) setAnswer(null);

		if (!gameOver) {
			setPosition(1);
			setScore(0);

			if (settings) {
				setLives(settings.survival.lives);
			}
		}
	}, [gameOver]);

	useEffect(() => {
		const settings = JSON.parse(
			localStorage.getItem("flagGuessrSettings")!
		) as Settings;

		if (settings.selectedFlags.length === 0) return router.push("/");

		setSettings(settings);
		setFlags(settings.selectedFlags);
		setLives(settings.survival.lives);
	}, []);

	return (
		<SettingsContext
			value={{
				answer,
				flags,
				settings,
				lives,
				gameOver,
				score,
				position,
				isTimerActive,
				handleLives,
				handleScore,
				setAnswer,
				setPosition,
				setGameOver,
				setIsTimerActive,
			}}
		>
			{settings && flags && (gameOver ? <GameOver /> : children)}
		</SettingsContext>
	);
}

export const useSettings = () => useContext(SettingsContext);
