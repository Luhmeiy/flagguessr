"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded-lg bg-slate-200 hover:bg-slate-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 cursor-pointer transition-colors duration-300"
		>
			{theme === "light" ? "🌙" : "☀️"}
		</button>
	);
};

export default ThemeToggle;
