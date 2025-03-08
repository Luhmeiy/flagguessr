import { connectDB } from "@/lib/db";
import { Flag } from "@/models/Flag";

export async function GET() {
	try {
		await connectDB();

		const flags = await Flag.find({}, "name");

		return new Response(JSON.stringify(flags), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Failed to fetch flags" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
