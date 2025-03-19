"use client";

import {
	Dispatch,
	FormEvent,
	JSX,
	KeyboardEvent,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Flag } from "@/interfaces/Flag";
import { Settings } from "@/interfaces/Settings";

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

interface AnswerInputInterface {
	settings: Settings;
	defaultOptions: Flag[];
	answer: string;
	setAnswer: Dispatch<SetStateAction<string>>;
	setPosition: Dispatch<SetStateAction<number>>;
	setIsTimerActive: Dispatch<SetStateAction<boolean>>;
	setGameOver: Dispatch<SetStateAction<boolean>>;
	handleScore: () => void;
	handleLives: () => void;
}

const AnswerInput = ({
	settings,
	defaultOptions,
	answer,
	setAnswer,
	setPosition,
	setIsTimerActive,
	setGameOver,
	handleScore,
	handleLives,
}: AnswerInputInterface) => {
	const [selected, setSelected] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [skipQuestion, setSkipQuestion] = useState<boolean>();

	const [options, setOptions] = useState([""]);
	const [remainingOptions, setRemainingOptions] = useState([
		...defaultOptions,
	]);

	const inputRef = useRef<HTMLInputElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);
	const firstOptionRef = useRef<HTMLButtonElement>(null);

	const generateOptions = (remaining: Flag[]) => {
		const newAnswer =
			remaining[Math.floor(Math.random() * remaining.length)].name;
		const otherOptions = defaultOptions
			.filter(({ name }) => name !== newAnswer)
			.map(({ name }) => name);

		const randomOptions = shuffleArray(otherOptions).slice(0, 3);

		return {
			options: shuffleArray([newAnswer, ...randomOptions]),
			answer: newAnswer,
		};
	};

	const buildQuestion = () => {
		setIsTimerActive(true);

		const root = !answer
			? remainingOptions
			: remainingOptions.filter(
					(opt) => opt.name.toLowerCase() !== answer.toLowerCase()
			  );

		const newOptions = generateOptions(root);

		setOptions(newOptions.options);
		setAnswer(newOptions.answer);

		setRemainingOptions(root);
		setPosition(defaultOptions.length - root.length + 1);

		setSelected("");
		setIsSubmitted(false);
		setIsCorrect(null);
	};

	const verifyAnswer = () => {
		setIsSubmitted(true);
		setIsTimerActive(false);

		const correct = selected.toLowerCase() === answer.toLowerCase();
		setIsCorrect(correct);

		if (correct) {
			handleScore();
		} else {
			if (settings.mode === "survival") {
				handleLives();
			}

			if (settings.mode !== "casual" && !skipQuestion && !isCorrect) {
				setIsSubmitted(false);
				setIsTimerActive(true);
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

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isSubmitted || e.key !== "ArrowDown") return;

		e.preventDefault();
		optionsRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
	};

	const handleOptionsNavigation = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isSubmitted || !settings) return;

		const options = Array.from(
			optionsRef.current?.querySelectorAll<HTMLButtonElement>("button") ||
				[]
		);
		const currentIndex = options.findIndex(
			(opt) => opt === document.activeElement
		);
		const columns = settings.style === "written" ? 1 : 2;

		switch (e.key) {
			case "ArrowRight":
				options[(currentIndex + 1) % options.length]?.focus();
				break;
			case "ArrowLeft":
				options[
					(currentIndex - 1 + options.length) % options.length
				]?.focus();
				break;
			case "ArrowDown":
				options[
					Math.min(currentIndex + columns, options.length - 1)
				]?.focus();
				break;
			case "ArrowUp":
				if (settings.style === "written" && currentIndex === 0) {
					inputRef?.current?.focus();
					return;
				}

				options[Math.max(currentIndex - columns, 0)]?.focus();
				break;
			case "Enter":
				e.preventDefault();

				if (settings.style === "written") {
					setSelected((e.target as HTMLDivElement).innerText);
					inputRef.current?.focus();
					return;
				}

				if (!isSubmitted) submitButtonRef.current?.click();
				break;
		}
	};

	const filteredSuggestions = useMemo(
		() =>
			defaultOptions
				.filter(({ name }) =>
					name.toLowerCase().includes(selected.toLowerCase())
				)
				.slice(0, 4),
		[defaultOptions, selected]
	);

	const modeMap: { [key: string]: JSX.Element } = {
		multiple: (
			<div
				ref={optionsRef}
				className="grid grid-cols-2 gap-2"
				onKeyDown={handleOptionsNavigation}
			>
				{options.map((option, index) => (
					<button
						key={option}
						ref={index === 0 ? firstOptionRef : null}
						type="button"
						onClick={() => setSelected(option)}
						onFocus={() => setSelected(option)}
						autoFocus={index === 0 && !isSubmitted}
						className={`p-2 rounded outline-none
							${
								selected === option
									? "bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600"
									: "bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
							}`}
					>
						{option}
					</button>
				))}
			</div>
		),
		written: (
			<div className="relative">
				<input
					ref={inputRef}
					type="text"
					value={selected}
					onChange={(e) => setSelected(e.target.value)}
					autoFocus={!isSubmitted}
					onKeyDown={handleInputKeyDown}
					className="w-full p-2 bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Type your answer..."
					aria-label="Input answer"
					disabled={isSubmitted}
					required
				/>

				{selected && (
					<div
						ref={optionsRef}
						className="w-full mt-1 bg-slate-200 dark:bg-neutral-800 rounded shadow-lg"
						onKeyDown={handleOptionsNavigation}
						role="listbox"
					>
						{filteredSuggestions.map((option, index) => (
							<button
								key={option._id}
								ref={index === 0 ? firstOptionRef : null}
								type="button"
								onClick={() => setSelected(option.name)}
								className="block w-full p-2 text-left hover:bg-slate-300 focus:bg-slate-300 
								focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
								role="option"
								aria-selected
							>
								{option.name}
							</button>
						))}
					</div>
				)}
			</div>
		),
	};

	useEffect(() => {
		setSkipQuestion(
			(settings.mode === "survival" && settings.survival.skipOnLoss) ||
				(settings.mode === "timed" && settings.timed.skipOnLoss)
		);

		buildQuestion();
	}, []);

	useEffect(() => {
		if (isSubmitted) {
			submitButtonRef.current?.focus();
		}
	}, [isSubmitted]);

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-screen-sm flex flex-col gap-4"
		>
			{settings && (
				<>
					{(!isSubmitted ||
						(settings.mode !== "casual" &&
							!skipQuestion &&
							!isCorrect)) &&
						modeMap[settings.style]}
					{isCorrect !== null && (
						<div
							className={`text-center text-xl font-bold ${
								isCorrect ? "text-green-600" : "text-red-600"
							} ${(skipQuestion || isCorrect) && "mb-3"}`}
						>
							<p>{isCorrect ? "Correct! 🎉" : "Wrong! 😞"}</p>
							{(skipQuestion ||
								isCorrect ||
								settings.mode === "casual") && (
								<p>{`Flag of ${answer}`}</p>
							)}
						</div>
					)}
				</>
			)}

			<button
				ref={submitButtonRef}
				type="submit"
				className={`px-6 py-2 self-center min-w-[100px] font-medium text-neutral-50 outline-none rounded
					${
						isSubmitted && !isFinished
							? isCorrect
								? "bg-green-600/90 scale-105"
								: "bg-red-600/90 scale-105"
							: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
					}`}
			>
				{isFinished
					? "Finish Game"
					: isSubmitted
					? "Next"
					: "Submit Answer"}
			</button>
		</form>
	);
};

export default AnswerInput;
