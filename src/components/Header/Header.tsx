import { FC, useState } from "react";
import { Sidebar } from "../Sidebar";
import { Hamburger } from "../Hamburger";

interface Props {

}

export const Header: FC<Props> = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);



	return (
		<>
			<Sidebar active={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<header className="fixed py-3 top-0 w-full bg-cyan-700">
				<div className="container relative flex justify-end items-center">
					<Hamburger onClick={() => setSidebarOpen(v => !v)} active={sidebarOpen} color="white" className="mr-3 focus-visible:app-outline-light" />
				</div>
			</header>
		</>
	);
};
