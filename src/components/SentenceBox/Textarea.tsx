import { FC, useEffect, useRef } from "react";
import autosize from "autosize";

interface Props {
	setInput: React.Dispatch<React.SetStateAction<HTMLTextAreaElement | null>>;
}

export const Textarea: FC<Props> = ({ setInput }) => {
	const area = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (area.current) autosize(area.current);
		return () => {
			if (area.current) autosize.destroy(area.current);
		};
	}, []);

	const setRef = (node: HTMLTextAreaElement | null) => {
		setInput(node);
		area.current = node;
	};

	return (
		<div className="py-2 flex rounded-t-xl shadow border border-slate-200 bg-white focus-within:app-outline">
			<textarea
				ref={setRef}
				rows={1}
				placeholder="Enter your translation"
				spellCheck='true'
				className="w-full py-2 px-3 bg-white border-none focus:ring-0 valid:text-green-900"
			>
			</textarea>
		</div>
	);
};