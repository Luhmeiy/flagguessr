import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body",
});

const poppins = Poppins({
	weight: ["600", "700"],
	subsets: ["latin"],
	variable: "--font-heading",
});

export const metadata: Metadata = {
	title: "FlagGuessr",
	description: "Guess the Flag!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`min-h-screen flex flex-col ${inter.variable} ${poppins.variable} antialiased bg-neutral-50 text-neutral-950 transition-colors dark:bg-neutral-950 dark:text-neutral-50`}
			>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
