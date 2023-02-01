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
		<textarea ref={area}>

		</textarea>
	);
};