import { connectDB } from "@/lib/db";
import { Preset } from "@/models/Preset";

export async function GET() {
	try {
		await connectDB();

		const presets = await Preset.find();

		return new Response(JSON.stringify(presets), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Failed to fetch presets" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
