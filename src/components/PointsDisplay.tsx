const PointsDisplay = ({
	mode,
	lives,
	totalFlags,
	position,
	score,
}: {
	mode: string;
	lives: number;
	totalFlags: number;
	position: number;
	score: number;
}) => {
	return (
		<div className="w-full max-w-96 grid grid-cols-3">
			<p>{mode === "survival" && `Lives: ${lives}`}</p>
			<p className="text-center font-semibold">
				Score: {score}/{totalFlags}
			</p>
			<p className="text-end font-semibold">
				Flag: {position}/{totalFlags}
			</p>
		</div>
	);
};

export default PointsDisplay;
