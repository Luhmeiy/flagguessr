import { Preset } from "./Preset";

export interface HandleSettingsArgs {
	option: string;
	value:
		| string
		| { _id: string; name: string; imageUrl: string }[]
		| object
		| Preset
		| boolean;
}

export type HandleSettings = (args: HandleSettingsArgs) => void;
