import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, memo, useMemo } from "react";
import { SidebarOverlay, SidebarOverlayProps } from "./SidebarOverlay";

interface Props extends SidebarOverlayProps { }

export const Sidebar: FC<Props> = (props) => {

	return (
		<SidebarOverlay {...props}>
			<div>Hello world</div>
		</SidebarOverlay>
	);
};

// export const Sidebar = memo(Component, (prevProps, nextProps) => {
// 	if (prevProps.active && !nextProps.active) return true;
// 	return false;
// });