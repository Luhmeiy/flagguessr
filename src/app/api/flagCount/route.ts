import { connectDB } from "@/lib/db";
import { Flag } from "@/models/Flag";

export async function GET() {
	try {
		await connectDB();

		const flagCount = await Flag.countDocuments();

		return new Response(JSON.stringify(flagCount), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Failed to fetch flag count" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
