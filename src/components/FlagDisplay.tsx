import { useEffect, useState } from "react";
import Image from "next/image";

const FlagDisplay = ({ answer }: { answer: string }) => {
	const [flag, setFlag] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/flagImage?query=${answer}`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				setFlag(data.imageUrl);
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

		if (answer) fetchData();
	}, [answer]);

	if (error) return <div className="text-red-500">{error}</div>;
	if (!flag || isLoading) return null;

	return (
		<div className="w-full h-96 flex bg-slate-200 px-8 py-7 rounded dark:bg-neutral-800">
			<Image
				src={flag}
				width="0"
				height="0"
				alt={`Flag of ${answer}`}
				className="object-contain w-full"
				priority
				onError={(e) => {
					(e.target as HTMLImageElement).style.display = "none";
					setError("Failed to load flag image");
				}}
			/>
		</div>
	);
};

export default FlagDisplay;
