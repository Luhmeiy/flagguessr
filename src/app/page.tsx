export const dynamic = "force-dynamic";

import SettingsMenu from "@/components/settings/SettingsMenu";

export default async function Home() {
	const response = await fetch(`${process.env.BACKEND_URL}/api/flagCount`);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const flagCount = (await response.json()) as number;
	const roundedDownFlagCount = Math.floor(flagCount / 50) * 50;

	return (
		<div className="flex flex-col items-center justify-center flex-1 p-8 pb-20 max-sm:gap-5 sm:gap-8">
			<h1 className="text-4xl font-bold">FlagGuessr</h1>

			<div className="flex flex-col items-center">
				<p className="text-sm">Test your flag knowledge!</p>
				<p className="text-sm font-semibold">
					🌍 {roundedDownFlagCount}+ Flags
				</p>
			</div>

			<SettingsMenu />
		</div>
	);
}
