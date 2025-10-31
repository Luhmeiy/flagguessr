import { Schema, model } from "mongoose";

const presetSchema = new Schema({
	name: { type: String },
	flags: { type: [String] },
});

export const Preset = model("Preset", presetSchema);
