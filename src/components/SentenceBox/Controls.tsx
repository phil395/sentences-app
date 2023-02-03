import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiSpeakerWave } from 'react-icons/hi2';
import { ISentenceActions } from "../../hooks";

interface Props {
	actions: ISentenceActions;
}

const More: FC<{}> = () => {
	return (
		<Menu>
			<Menu.Button title="More" className="btn-outline rounded-full p-1"><BsThreeDotsVertical size={22} /></Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute top-14 right-0 py-1 flex flex-col bg-white rounded-xl shadow border border-slate-200 focus-visible:app-outline">
					<Menu.Item>
						<button className="w-full p-2 ui-active:bg-slate-100 xs:hidden">Change Mode <kbd>Alt</kbd> + <kbd>M</kbd></button>
					</Menu.Item>
					<Menu.Item>
						<button className="w-full p-2 ui-active:bg-slate-100 sm:hidden">Yandex <kbd>Alt</kbd> + <kbd>Y</kbd></button>
					</Menu.Item>
					<Menu.Item>
						<button className="w-full p-2 ui-active:bg-slate-100 sm:hidden">Cambridge Dictionary <kbd>Alt</kbd> + <kbd>C</kbd></button>
					</Menu.Item>
					<Menu.Item>
						<button className="w-full p-2 ui-active:bg-slate-100">Open sentence in Yandex</button>
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export const Controls: FC<Props> = ({ actions: { check, show, reset, goToYandex } }) => {
	return (
		<div className="relative mt-2 flex justify-end items-center">
			<button onClick={check} className="btn rounded-full px-3">Check</button>
			<button title="Show (Alt + S)" onClick={show} className="btn-outline rounded-full px-3">S</button>
			<button title="Reset (Alt + R)" onClick={reset} className="btn-outline rounded-full px-3">R</button>
			<button title="Change Mode (Alt + M)" className="btn-outline rounded-full px-3 max-xs:hidden">M</button>
			<button title="Open Yandex (Alt + Y)" className="btn-outline rounded-full px-3 max-sm:hidden">Y</button>
			<button title="Open Cambridge Dictionary (Alt + C)" className="btn-outline rounded-full px-3 max-sm:hidden">C</button>
			<button title="Play (Alt + P)" className="btn-outline rounded-full p-2"><HiSpeakerWave size={15} /></button>

			<More />
		</div>
	);
};