import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div className="flex flex-col items-center py-6 text-sm text-center">
			<p>Made with 💙 in 🇧🇷 for vexillology buffs.</p>
			<p className="text-xs">
				by{" "}
				<Link
					href="https://github.com/Luhmeiy"
					className="underline transition-colors hover:text-neutral-500 dark:hover:text-neutral-300"
				>
					Luhmeiy
				</Link>
			</p>
		</div>
	);
};

export default Footer;
