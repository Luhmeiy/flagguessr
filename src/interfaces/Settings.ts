import { Flag } from "./Flag";
import { Preset } from "./Preset";

export interface Settings {
	mode: "casual" | "survival" | "timed";
	style: "multiple" | "written";
	selectedFlags: Flag[];
	selectedPreset: Preset;
	isPreset: true;
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
