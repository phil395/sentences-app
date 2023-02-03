import { FC } from "react";
import clsx from "clsx";

import styles from './Hamburger.module.css';

interface Props {
	onClick: () => void;
	active: boolean;
	color: 'white' | 'black';
	className?: string;
}

export const Hamburger: FC<Props> = ({ onClick, active, color, className }) => {
	return (
		<button
			onClick={onClick}
			className={clsx(className, styles.hamburger, {
				[styles.hamburger_white]: color === 'white',
				[styles.hamburger_black]: color === 'black',
				[styles.hamburger_active]: active
			})}
		>
			<div className="mb-1"></div>
			<div></div>
			<div className="mt-1"></div>
		</button>
	);
};
