import { Flag } from "./Flag";

export interface GroupedFlags {
	title: string;
	collection: GroupedFlags[] | Flag[];
}
