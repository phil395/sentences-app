import type { FC } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiSpeakerWave } from 'react-icons/hi2';
import { ISentenceActions } from "../../hooks";

interface Props {
	actions: ISentenceActions;
}

export const Controls: FC<Props> = ({ actions: { check, show, reset, goToYandex } }) => {
	return (
		<div className="mt-2 flex justify-end items-center">
			<button onClick={check} className="btn rounded-full px-3">Check</button>
			<button onClick={show} className="btn-outline rounded-full px-3">S</button>
			<button onClick={reset} className="btn-outline rounded-full px-3">R</button>
			{/* <button onClick={goToYandex} className="btn-outline">{'S -> T'}</button> */}
			<button className="btn-outline rounded-full px-3">M</button>
			<button className="btn-outline rounded-full px-3">Y</button>
			<button className="btn-outline rounded-full px-3">C</button>
			<button className="btn-outline rounded-full p-2"><HiSpeakerWave size={15} /></button>
			<button className="btn-outline rounded-full p-1"><BsThreeDotsVertical size={22} /></button>
		</div>
	);
};