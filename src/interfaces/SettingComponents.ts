import { Settings } from "./Settings";

export interface TypeSettingsInterface {
	type: "mode" | "style";
	settings: Settings;
	handleSettings: (option: string, value: string | object) => void;
}

export interface ButtonContainerInterface extends TypeSettingsInterface {
	array: string[];
}
