import TypeSettings from "./TypeSettings";
import { ButtonContainerInterface } from "@/interfaces/SettingComponents";
import { capitalize } from "@/utils/capitalize";

const ButtonContainer = ({
	array,
	type,
	settings,
	handleSettings,
}: ButtonContainerInterface) => (
	<div className="flex flex-col gap-1">
		<h3 className="font-bold">{capitalize(type)}</h3>

		<div className="flex gap-1.5 bg-slate-100 p-1.5 rounded dark:bg-neutral-900">
			{array.map((item) => (
				<button
					key={item}
					onClick={() =>
						handleSettings({ option: type, value: item })
					}
					className={`flex-1 py-1 rounded-sm hover:bg-slate-400 dark:hover:bg-neutral-600 cursor-pointer transition-colors duration-300 ${
						(settings.mode === item || settings.style === item) &&
						"bg-slate-300 dark:bg-neutral-700"
					}`}
				>
					{capitalize(item)}
				</button>
			))}
		</div>

		{(type === "style" || settings.mode !== "casual") && (
			<TypeSettings
				type={type}
				settings={settings}
				handleSettings={handleSettings}
			/>
		)}
	</div>
);

export default ButtonContainer;
