import type { FC } from "react";

interface Props {
	setOutput: React.Dispatch<React.SetStateAction<HTMLOutputElement | null>>;
}

export const Output: FC<Props> = ({ setOutput }) => {
	return (
		<output
			ref={setOutput}
			className="block py-4 px-3 rounded-b-xl shadow border border-slate-200 bg-slate-100 empty:h-[3.625rem] [&>s]:underline [&>s]:decoration-wavy [&>s]:decoration-red-800 transition-colors duration-500"
		>
		</output>
	);
};