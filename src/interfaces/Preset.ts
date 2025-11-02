export interface Preset {
	_id: string;
	name: string;
	flags: string[];
}

export interface PresetGroup {
	_id: string;
	presets: Preset[];
}
