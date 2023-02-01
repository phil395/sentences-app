import { FC, useEffect, useRef } from "react";
import autosize from "autosize";

interface Props {

}

export const Textarea: FC<Props> = () => {
	const area = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (area.current) autosize(area.current);
		return () => {
			if (area.current) autosize.destroy(area.current);
		};
	}, []);

	return (
		<div className="pt-2 rounded-t-xl shadow border border-slate-200 bg-white focus-within:app-outline">
			<textarea ref={area} rows={1} className="w-full py-2 px-3 bg-white border-none focus:ring-0"></textarea>
		</div>
	);
};