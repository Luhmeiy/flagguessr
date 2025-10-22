import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!, {
			dbName: "flagguessr",
		});
	} catch (err) {
		console.log(err);
	}
};
