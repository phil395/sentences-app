import type { FC } from "react";

interface Props {

}

export const Output: FC<Props> = () => {
	return (
		<output className="block py-4 px-3 rounded-b-xl shadow border border-slate-200 bg-slate-100">
			Hello my name
		</output>
	);
};