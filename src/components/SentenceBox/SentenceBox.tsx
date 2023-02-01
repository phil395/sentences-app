import type { FC } from "react";
import { Controls } from "./Controls";
import { OriginalText } from "./OriginalText";
import { Output } from "./Output";
import { Textarea } from "./Textarea";

interface Props {

}

export const SentenceBox: FC<Props> = () => {
	return (
		<article>
			<OriginalText />
			<Textarea />
			<Output />
			<Controls />
		</article>
	);
};
