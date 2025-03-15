import { connectDB } from "@/lib/db";
import { Flag } from "@/models/Flag";

export async function GET() {
	try {
		await connectDB();

		const flags = await Flag.aggregate([
			{
				$sort: {
					type: 1,
					region: 1,
					subRegion: 1,
					name: 1,
				},
			},
			{
				$group: {
					_id: {
						title: "$region",
						collection: "$subRegion",
					},
					flags: {
						$push: {
							_id: "$_id",
							name: "$name",
							region: "$region",
							subRegion: "$subRegion",
						},
					},
				},
			},
			{
				$sort: {
					"_id.title": 1,
					"_id.collection": 1,
				},
			},
			{
				$group: {
					_id: "$_id.title",
					collection: {
						$push: {
							title: "$_id.collection",
							collection: "$flags",
						},
					},
				},
			},
			{
				$sort: {
					_id: 1,
				},
			},
			{
				$project: {
					_id: 0,
					title: "$_id",
					collection: 1,
				},
			},
		]);

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
