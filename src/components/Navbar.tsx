import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between px-6 py-4">
			<Link href="/" className="font-heading font-bold text-lg">
				FlagGuessr
			</Link>
			<ThemeToggle />
		</div>
	);
};

export default Navbar;
