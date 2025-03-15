import { useEffect, useState } from "react";
import { Triangle } from "@phosphor-icons/react/dist/ssr";
import { Flag } from "@/interfaces/Flag";
import { GroupedFlags } from "@/interfaces/GroupedFlags";

const isFlagArray = (x: GroupedFlags | Flag): x is Flag => "name" in x;

const FlagSelector = ({
	flags,
	handleSettings,
}: {
	flags: GroupedFlags[];
	handleSettings: (option: string, value: string | Flag[]) => void;
}) => {
	const [selected, setSelected] = useState<Flag[]>([]);
	const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

	const handleToggle = (flagsKey: string) => {
		const keys = flagsKey.split("-");

		const addToSelectedGroups = (
			name: string,
			isGroupSelection?: boolean,
			group?: string
		) => {
			const isDuplicate = selectedGroups.some((item) => item === name);

			if (!isGroupSelection) {
				setSelectedGroups((prev) =>
					isDuplicate
						? prev.filter((item) => item !== name)
						: [...prev, name]
				);
			} else {
				if (group && selectedGroups.includes(group)) {
					setSelectedGroups((prev) =>
						prev.filter((item) => item !== name)
					);
				} else {
					setSelectedGroups((prev) =>
						isDuplicate ? [...prev] : [...prev, name]
					);
				}
			}
		};

		const addUniqueObject = (
			flag: Flag,
			isGroupSelection?: boolean,
			group?: string
		) => {
			const isDuplicate = selected.some(
				(item) => item["_id"] === flag["_id"]
			);

			if (!isGroupSelection) {
				setSelected((prev) =>
					isDuplicate
						? prev.filter((item) => item["_id"] !== flag["_id"])
						: [...prev, flag]
				);
			} else {
				if (group && selectedGroups.includes(group)) {
					setSelected((prev) =>
						isDuplicate
							? prev.filter((item) => item["_id"] !== flag["_id"])
							: [...prev]
					);
				} else {
					setSelected((prev) =>
						isDuplicate ? [...prev] : [...prev, flag]
					);
				}
			}
		};

		const recursive = (
			collection: GroupedFlags[],
			addInside?: boolean,
			group?: string
		) => {
			collection.some(({ collection, title }) => {
				if (keys.includes(title) || addInside) {
					if (!isFlagArray(collection[0])) {
						if (keys.indexOf(title) === keys.length - 1) {
							addToSelectedGroups(title);
							recursive(
								collection as GroupedFlags[],
								true,
								title
							);
						} else {
							recursive(collection as GroupedFlags[], addInside);

							return true;
						}
					} else {
						if (keys.length < 3) {
							addToSelectedGroups(title, addInside, group);

							if (
								(group &&
									!selectedGroups.includes(group) &&
									selectedGroups.includes(title)) ||
								(group &&
									selectedGroups.includes(group) &&
									!selectedGroups.includes(title))
							) {
								return;
							}
						}

						(collection as Flag[]).some((flag) => {
							if (keys.length < 3) {
								addUniqueObject(flag as Flag, true, title);
							} else {
								if (keys.includes(flag.name)) {
									addUniqueObject(flag as Flag);

									return true;
								}
							}

							return false;
						});
					}
				}

				return false;
			});
		};

		recursive(flags);
	};

	useEffect(() => {
		handleSettings("selectedFlags", selected);
	}, [selected]);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-bold">Flags</h3>

			<div className="flex flex-col gap-1 py-1.5 bg-slate-100 rounded dark:bg-neutral-900">
				{flags.map(({ title, collection }) => (
					<Group
						key={title}
						title={title}
						collection={collection}
						selected={selected}
						selectedGroups={selectedGroups}
						handleToggle={handleToggle}
					/>
				))}
			</div>
		</div>
	);
};

const Group = ({
	flagKey,
	title,
	collection,
	selected,
	selectedGroups,
	handleToggle,
}: {
	flagKey?: string;
	title: GroupedFlags["title"];
	collection: GroupedFlags["collection"];
	selected: Flag[];
	selectedGroups: string[];
	handleToggle: (text: string) => void;
}) => {
	const [isVisible, setIsVisible] = useState(false);

	if (!flagKey) {
		flagKey = title;
	}

	return (
		<div className="flex flex-col gap-1 px-1.5">
			<div className="flex flex-1 items-center gap-2 bg-slate-300 dark:bg-neutral-700 px-2 py-1 rounded-sm transition-colors hover:bg-slate-400 dark:hover:bg-neutral-600">
				<input
					type="checkbox"
					checked={selectedGroups.some((item) => item === title)}
					onChange={() => handleToggle(`${flagKey}`)}
				/>

				<button
					className="flex justify-between items-center flex-1 text-left"
					onClick={() => setIsVisible((prev) => !prev)}
				>
					{title}
					<Triangle
						size={12}
						weight="fill"
						className={`${!isVisible ? "rotate-180" : "rotate-0"}`}
					/>
				</button>
			</div>

			{isVisible &&
				(isFlagArray(collection[0])
					? (collection as Flag[]).map((flag) => (
							<div key={flag.name} className="flex gap-1.5 px-3">
								<input
									type="checkbox"
									checked={selected.some(
										(item) => item["_id"] === flag["_id"]
									)}
									onChange={() =>
										handleToggle(`${flagKey}-${flag.name}`)
									}
								/>
								{flag.name}
							</div>
					  ))
					: (collection as GroupedFlags[]).map(
							({ title, collection }) => (
								<Group
									key={title}
									flagKey={`${flagKey}-${title}`}
									title={title}
									collection={collection}
									selected={selected}
									selectedGroups={selectedGroups}
									handleToggle={handleToggle}
								/>
							)
					  ))}
		</div>
	);
};

export default FlagSelector;
