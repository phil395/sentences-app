import type { FC } from "react";
import { useSentence } from "../../hooks";
import { Controls } from "./Controls";
import { OriginalText } from "./OriginalText";
import { Output } from "./Output";
import { Textarea } from "./Textarea";

interface Props {

}

export const SentenceBox: FC<Props> = () => {
	const { setInput, setOutput } = useSentence("Hello world");
	return (
		<article>
			<OriginalText />
			<Textarea setInput={setInput} />
			<Output setOutput={setOutput} />
			<Controls />
		</article>
	);
};
