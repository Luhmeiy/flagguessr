"use client";

import { KeyboardEvent, RefObject } from "react";
import { useSettings } from "../SettingsProvider";

const MultipleOptions = ({
	optionsRef,
	firstOptionRef,
	handleOptionsNavigation,
}: {
	optionsRef: RefObject<HTMLDivElement | null>;
	firstOptionRef: RefObject<HTMLButtonElement | null>;
	handleOptionsNavigation: (e: KeyboardEvent<HTMLDivElement>) => void;
}) => {
	const { isSubmitted, options, selected, setSelected } = useSettings();

	return (
		<div
			ref={optionsRef}
			className="grid grid-cols-2 gap-2"
			onKeyDown={handleOptionsNavigation}
		>
			{options.map((option, index) => (
				<button
					key={option._id}
					ref={index === 0 ? firstOptionRef : null}
					type="button"
					onClick={() => setSelected(option._id)}
					onFocus={() => setSelected(option._id)}
					autoFocus={index === 0 && !isSubmitted}
					className={`p-2 rounded outline-none
							${
								selected === option._id
									? "bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600"
									: "bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
							}`}
				>
					{option.name}
				</button>
			))}
		</div>
	);
};

export default MultipleOptions;
