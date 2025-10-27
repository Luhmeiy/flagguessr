"use client";

import { useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	FormEvent,
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

interface ISettingsContext {
	answer: Flag | null;
	flags: Flag[];
	isCorrect: boolean | null;
	isFinished: boolean;
	isSubmitted: boolean;
	isTimerActive: boolean;
	lives: number;
	options: Flag[];
	position: string;
	score: string;
	selected: string;
	settings: Settings;
	skipQuestion: boolean;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	setGameOver: Dispatch<SetStateAction<boolean>>;
	setSelected: Dispatch<SetStateAction<string>>;
}

// @ts-ignore
const SettingsContext = createContext<ISettingsContext>(null);

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [flags, setFlags] = useState<Flag[] | null>(null);
	const [answer, setAnswer] = useState<Flag | null>(null);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [gameOver, setGameOver] = useState(false);

	const [isTimerActive, setIsTimerActive] = useState(false);
	const [skipQuestion, setSkipQuestion] = useState(false);
	const [lives, setLives] = useState(0);
	const [position, setPosition] = useState(1);
	const [score, setScore] = useState(0);

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const [selected, setSelected] = useState("");
	const [options, setOptions] = useState<Flag[]>([]);
	const [remainingOptions, setRemainingOptions] = useState<Flag[]>([]);

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

	const generateOptions = (remaining: Flag[]) => {
		const newAnswer =
			remaining[Math.floor(Math.random() * remaining.length)];
		const otherOptions = flags!.filter(
			({ name }) => name !== newAnswer.name
		);

		const randomOptions = shuffleArray(otherOptions).slice(
			0,
			settings.multiple.options - 1
		);

		return {
			options: shuffleArray([newAnswer, ...randomOptions]),
			answer: newAnswer,
		};
	};

	const buildQuestion = (oldFlags?: Flag[]) => {
		setIsTimerActive(true);

		const root = oldFlags
			? oldFlags
			: !answer
			? remainingOptions
			: remainingOptions.filter(
					(opt) =>
						opt.name.toLowerCase() !== answer.name.toLowerCase()
			  );

		const newOptions = generateOptions(root);

		setOptions(newOptions.options);
		setAnswer(newOptions.answer);

		setRemainingOptions(root);
		setPosition(flags!.length - root.length + 1);
		setIsCorrect(null);
		setSelected("");
		setIsSubmitted(false);
	};

	const verifyAnswer = () => {
		setIsSubmitted(true);
		setIsTimerActive(false);

		const correct = selected.toLowerCase() === answer!._id.toLowerCase();
		setIsCorrect(correct);

		if (correct) {
			handleScore();
		} else {
			if (settings.mode === "survival") {
				handleLives();
			}

			if (settings.mode !== "casual" && !skipQuestion) {
				setIsTimerActive(true);
				setIsSubmitted(false);
			}
		}

		if (remainingOptions.length <= 1) setIsFinished(true);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFinished) {
			setGameOver(true);
		} else {
			if (isSubmitted) {
				buildQuestion();
			} else {
				verifyAnswer();
			}
		}
	};

	useEffect(() => {
		if (gameOver) setAnswer(null);

		if (!gameOver) {
			setPosition(1);
			setScore(0);
			setLives(settings.survival.lives);

			if (flags) {
				buildQuestion(flags);
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
		setRemainingOptions(settings.selectedFlags);
		setLives(settings.survival.lives);
		setSkipQuestion(
			(settings.mode === "survival" && settings.survival.skipOnLoss) ||
				(settings.mode === "timed" && settings.timed.skipOnLoss)
		);
	}, []);

	useEffect(() => {
		if (flags) buildQuestion();
	}, [flags]);

	if (!SettingsContext || !settings || !flags) {
		return;
	}

	return (
		<SettingsContext
			value={{
				answer,
				flags,
				isCorrect,
				isFinished,
				isSubmitted,
				isTimerActive,
				lives,
				options,
				position: `${position}/${flags?.length || 0}`,
				score: `${score}/${flags?.length || 0}`,
				selected,
				settings,
				skipQuestion,
				handleSubmit,
				setGameOver,
				setSelected,
			}}
		>
			{gameOver ? <GameOver /> : children}
		</SettingsContext>
	);
}

export const useSettings = () => useContext(SettingsContext);
