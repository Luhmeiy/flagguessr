"use client";

import { KeyboardEvent, ReactNode, RefObject, useRef } from "react";
import MultipleOptions from "./MultipleOptions";
import { useSettings } from "../SettingsProvider";
import WrittenOptions from "./WrittenOptions";

const ModeMap = ({
	submitButtonRef,
	modeKey,
}: {
	submitButtonRef: RefObject<HTMLButtonElement | null>;
	modeKey: string;
}) => {
	const { isSubmitted, settings, setSelected } = useSettings();

	const inputRef = useRef<HTMLInputElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);
	const firstOptionRef = useRef<HTMLButtonElement>(null);

	const handleOptionsNavigation = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isSubmitted) return;

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

	const modeMap: { [key: string]: ReactNode } = {
		multiple: (
			<MultipleOptions
				optionsRef={optionsRef}
				firstOptionRef={firstOptionRef}
				handleOptionsNavigation={handleOptionsNavigation}
			/>
		),
		written: (
			<WrittenOptions
				inputRef={inputRef}
				optionsRef={optionsRef}
				firstOptionRef={firstOptionRef}
				handleOptionsNavigation={handleOptionsNavigation}
			/>
		),
	};

	return modeMap[modeKey];
};

export default ModeMap;
