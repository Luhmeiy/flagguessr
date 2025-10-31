import { HandleSettings } from "./HandleSettings";
import { Settings } from "./Settings";

export interface TypeSettingsInterface {
	type: "mode" | "style";
	settings: Settings;
	handleSettings: HandleSettings;
}

export interface ButtonContainerInterface extends TypeSettingsInterface {
	array: string[];
}
