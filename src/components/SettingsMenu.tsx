"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Settings } from "@/interfaces/Settings";
import ButtonContainer from "./ButtonContainer";

const defaultSettings: Settings = {
	mode: "casual",
	style: "multiple",
};

const gameModes = ["casual", "survival", "timed"];
const styles = ["multiple", "written"];

const SettingsMenu = () => {
	const router = useRouter();

	const [isVisible, setIsVisible] = useState(false);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [savedSettings, setSavedSettings] = useState<Settings | null>(null);

	const handleSettings = (option: string, value: string) => {
		setSettings((prev) => ({
			...prev,
			[option]: value,
		}));
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

	return (
		<>
			<div className="flex flex-col gap-2">
				<button
					onClick={() => setIsVisible(true)}
					className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600"
				>
					Play
				</button>

				{savedSettings ? (
					<button
						onClick={() => handleStart(savedSettings)}
						className="text-sm font-semibold text-neutral-400 hover:text-neutral-500 transition-colors dark:text-neutral-500 dark:hover:text-neutral-400"
					>
						Use saved settings
					</button>
				) : (
					<button onClick={() => handleStart(defaultSettings)}>
						Use default settings
					</button>
				)}
			</div>

			{isVisible && (
				<div className="absolute w-full max-w-96 flex flex-col gap-4 bg-slate-200 px-4 py-3 rounded dark:bg-neutral-800">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Settings</h2>

						<X
							size={20}
							weight="bold"
							onClick={() => setIsVisible(false)}
							className="right-4 top-3 cursor-pointer"
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

					<button
						onClick={() => handleStart(settings)}
						className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-neutral-50 dark:bg-blue-700 dark:hover:bg-blue-600"
					>
						Start
					</button>
				</div>
			)}
		</>
	);
};

export default SettingsMenu;
