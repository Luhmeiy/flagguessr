import { Schema, model } from "mongoose";

const flagSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	region: { type: String, required: true },
	subregion: { type: String, required: true },
	imageUrl: { type: String, required: true },
});

export const Flag = model("Flag", flagSchema);
