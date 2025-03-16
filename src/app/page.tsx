import SettingsMenu from "@/components/SettingsMenu";

export default async function Home() {
	const response = await fetch(`${process.env.BACKEND_URL}/api/flagCount`);
	const flagCount = (await response.json()) as number;
	const roundedDownFlagCount = Math.floor(flagCount / 50) * 50;

	return (
		<div className="flex flex-col items-center justify-center flex-1 p-8 pb-20 gap-8">
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
