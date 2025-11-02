"use client";

import { useEffect, useRef } from "react";
import ModeMap from "./ModeMap";
import { useSettings } from "../SettingsProvider";

const AnswerInput = () => {
	const {
		answer,
		isCorrect,
		isFinished,
		isSubmitted,
		settings,
		skipQuestion,
		handleSubmit,
	} = useSettings();

	const submitButtonRef = useRef<HTMLButtonElement>(null);

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
			{(!isSubmitted ||
				(settings.mode !== "casual" &&
					!skipQuestion &&
					!isCorrect)) && (
				<ModeMap
					submitButtonRef={submitButtonRef}
					modeKey={settings.style}
				/>
			)}
			{isCorrect !== null && (
				<div
					className={`text-center text-xl font-bold ${
						isCorrect ? "text-green-600" : "text-red-600"
					} ${(skipQuestion || isCorrect) && "xs:mb-3"}`}
				>
					<p>{isCorrect ? "Correct! 🎉" : "Wrong! 😞"}</p>
					{(skipQuestion ||
						isCorrect ||
						settings.mode === "casual") && (
						<p>{`Flag of ${answer?.name}`}</p>
					)}
				</div>
			)}

			<button
				ref={submitButtonRef}
				type="submit"
				className={`px-6 py-2 self-center min-w-[100px] font-medium text-neutral-50 outline-none rounded cursor-pointer
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
