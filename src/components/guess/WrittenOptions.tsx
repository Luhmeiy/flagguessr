"use client";

import { KeyboardEvent, RefObject, useMemo } from "react";
import { useSettings } from "../SettingsProvider";

const WrittenOptions = ({
	inputRef,
	optionsRef,
	firstOptionRef,
	handleOptionsNavigation,
}: {
	inputRef: RefObject<HTMLInputElement | null>;
	optionsRef: RefObject<HTMLDivElement | null>;
	firstOptionRef: RefObject<HTMLButtonElement | null>;
	handleOptionsNavigation: (e: KeyboardEvent<HTMLDivElement>) => void;
}) => {
	const { flags, isSubmitted, selected, settings, setSelected } =
		useSettings();

	const filteredSuggestions = useMemo(
		() =>
			flags
				.filter(({ name }) =>
					name.toLowerCase().includes(selected.toLowerCase())
				)
				.slice(0, 4),
		[flags, selected]
	);

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isSubmitted || e.key !== "ArrowDown") return;

		e.preventDefault();
		optionsRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
	};

	return (
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

			{settings.written.autoComplete && selected && (
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
	);
};

export default WrittenOptions;
