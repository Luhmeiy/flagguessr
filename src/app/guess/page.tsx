import AnswerInput from "@/components/guess/AnswerInput";
import FlagDisplay from "@/components/guess/FlagDisplay";
import PointsDisplay from "@/components/guess/PointsDisplay";
import { SettingsProvider } from "@/components/SettingsProvider";

export default function Guess({ answer }: { answer: string }) {
	return (
		<SettingsProvider>
			<div className="flex flex-col items-center justify-center flex-1 p-8 gap-4 xs:gap-8">
				<div className="w-full max-w-screen-sm flex flex-col items-center gap-2">
					<PointsDisplay />
					<FlagDisplay />
				</div>

				<AnswerInput />
			</div>
		</SettingsProvider>
	);
}
