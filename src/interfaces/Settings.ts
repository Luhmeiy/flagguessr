import { Flag } from "./Flag";

export interface Settings {
	mode: "casual" | "survival" | "timed";
	style: "multiple" | "written";
	selectedFlags: Flag[];
	survival: {
		lives: number;
		skipOnLoss: boolean;
	};
	timed: {
		totalTime: number;
		timePerFlag: number;
		isTimePerFlag: boolean;
		skipOnLoss: boolean;
	};
	multiple: {
		options: number;
	};
	written: {
		autoComplete: boolean;
	};
}
