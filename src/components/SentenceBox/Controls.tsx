import type { FC } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiSpeakerWave } from 'react-icons/hi2';

interface Props {

}

export const Controls: FC<Props> = () => {
	return (
		<div className="mt-2 flex justify-end items-center">
			<button className="btn">Check</button>
			<button className="btn-outline">Show</button>
			<button className="btn-outline">Reset</button>
			<button className="btn-outline rounded-full p-2"><HiSpeakerWave size={15} /></button>
			<button className="btn-outline rounded-full p-1"><BsThreeDotsVertical size={22} /></button>
		</div>
	);
};