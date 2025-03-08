import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Flag } from "@/models/Flag";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");

	try {
		await connectDB();

		const flags = await Flag.findOne({ name: query }, "imageUrl");

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
