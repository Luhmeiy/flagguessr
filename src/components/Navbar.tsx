import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => (
	<div className="flex items-center justify-between px-6 py-4">
		<Link href="/" className="font-heading font-bold text-lg">
			FlagGuessr
		</Link>
		<ThemeToggle />
	</div>
);

export default Navbar;
