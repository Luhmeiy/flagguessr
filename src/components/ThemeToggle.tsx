"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded-lg bg-slate-200 dark:bg-neutral-800"
		>
			{theme === "light" ? "🌙" : "☀️"}
		</button>
	);
};

export default ThemeToggle;
