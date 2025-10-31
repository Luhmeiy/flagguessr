import { connectDB } from "@/lib/db";
import { Flag } from "@/models/Flag";

export async function POST(req: Request) {
	try {
		await connectDB();

		const data = await req.json();
		const ids = data.ids || [];

		const flags = await Flag.find({ _id: { $in: ids } }).lean();

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
