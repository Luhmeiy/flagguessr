"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import ButtonContainer from "./ButtonContainer";
import FlagSelector from "./FlagSelector";
import { GroupedFlags } from "@/interfaces/GroupedFlags";
import { Settings } from "@/interfaces/Settings";

export const defaultSettings: Settings = {
	mode: "casual",
	style: "multiple",
	selectedFlags: [],
	survival: {
		lives: 3,
		skipOnLoss: false,
	},
	timed: {
		totalTime: 2050,
		timePerFlag: 10,
		isTimePerFlag: false,
		skipOnLoss: false,
	},
	multiple: {
		options: 4,
	},
	written: {
		autoComplete: true,
	},
};

const gameModes = ["casual", "survival", "timed"];
const styles = ["multiple", "written"];

const SettingsMenu = () => {
	const router = useRouter();

	const [flags, setFlags] = useState<GroupedFlags[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [isVisible, setIsVisible] = useState(false);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [savedSettings, setSavedSettings] = useState<Settings | null>(null);

	const handleSettings = (
		option: string,
		value:
			| string
			| { _id: string; name: string; imageUrl: string }[]
			| object
	) => {
		setSettings((prev) => {
			if (option === "survival" || option === "timed") {
				return {
					...prev,
					[option]: {
						...prev[option],
						...(value as object),
					},
				};
			} else {
				return { ...prev, [option]: value };
			}
		});
	};

	const handleStart = (settings: Settings) => {
		localStorage.setItem("flagGuessrSettings", JSON.stringify(settings));
		router.push("/guess");
	};

	useEffect(() => {
		const savedSettings = JSON.parse(
			localStorage.getItem("flagGuessrSettings")!
		);

		if (savedSettings) setSavedSettings(savedSettings);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/flags");

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				setFlags(data);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to load flag"
				);
			} finally {
				setIsLoading(false);
			}
		};

		if (isVisible && !flags) fetchData();
	}, [isVisible]);

	return (
		<>
			<div className="min-w-32 flex flex-col gap-2">
				<button
					onClick={() => setIsVisible(true)}
					className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition-colors duration-300"
				>
					Play
				</button>

				{savedSettings && (
					<button
						onClick={() => handleStart(savedSettings)}
						className="text-sm font-semibold text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400 cursor-pointer transition-colors duration-300"
					>
						Use saved settings
					</button>
				)}
			</div>

			{isVisible && (
				<div className="absolute w-xl flex flex-col gap-4 bg-slate-200 p-4 rounded overflow-auto dark:bg-neutral-800 max-xs:top-0 max-xs:h-full max-xs:justify-center xs:max-w-96 xs:max-h-[35rem]">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Settings</h2>

						<XIcon
							size={20}
							weight="bold"
							onClick={() => setIsVisible(false)}
							className="right-4 top-3 text-zinc-300 hover:text-zinc-950 dark:text-zinc-600 dark:hover:text-zinc-50 cursor-pointer transition-colors duration-300"
						/>
					</div>

					<ButtonContainer
						array={gameModes}
						type="mode"
						settings={settings}
						handleSettings={handleSettings}
					/>

					<ButtonContainer
						array={styles}
						type="style"
						settings={settings}
						handleSettings={handleSettings}
					/>

					{error && <div className="text-red-500">{error}</div>}
					{!isLoading && flags && (
						<FlagSelector
							flags={flags}
							handleSettings={handleSettings}
						/>
					)}

					<button
						onClick={() => handleStart(settings)}
						className="self-center px-8 py-2 rounded bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition-colors duration-300"
					>
						Start
					</button>
				</div>
			)}
		</>
	);
};

export default SettingsMenu;
