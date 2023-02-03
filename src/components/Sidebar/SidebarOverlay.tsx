import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, PropsWithChildren } from "react";
import { Hamburger } from "../Hamburger";

export interface SidebarOverlayProps {
	onClose: () => void;
	active: boolean;
}

type Props = PropsWithChildren<SidebarOverlayProps>;

export const SidebarOverlay: FC<Props> = ({ children, active, onClose }) => {

	return (
		<Transition appear show={active} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 -translate-x-full"
						enterTo="opacity-100 translate-x-0"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-x-0"
						leaveTo="opacity-0 -translate-x-full"
					>
						<div className="container p-0">
							<Dialog.Panel tabIndex={0} className="h-screen overflow-y-auto py-3 sm:py-11 px-4 w-full sm:w-96  bg-light-bg sm:border-r border-slate-300 sm:rounded-r-xl shadow-xl transition-transform">
								<Hamburger active={true} onClick={onClose} color="black" className="block sm:hidden mb-3 ml-auto focus-visible:app-outline" />
								{children}
							</Dialog.Panel>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};