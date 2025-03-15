import { Flag } from "./Flag";

export interface Settings {
	mode: "casual" | "survival" | "timed";
	style: "multiple" | "written";
	selectedFlags: Flag[];
}
