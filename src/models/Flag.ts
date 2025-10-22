import { Schema, model } from "mongoose";

const flagSchema = new Schema({
	name: { type: String },
	type: { type: String },
	region: { type: String },
	subregion: { type: String },
	imageUrl: { type: String },
});

export const Flag = model("Flag", flagSchema);
