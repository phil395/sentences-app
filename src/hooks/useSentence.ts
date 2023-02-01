import { useEffect, useState } from "react";

const setValidity = (
	input: HTMLTextAreaElement | null,
	value: 'valid' | 'invalid'
) => {
	if (!input) return;
	input.setCustomValidity(value === 'valid' ? '' : 'invalid');
};

const parseWords = (
	str: string,
	letterCase: 'lover' | 'origin' = 'lover'
) => {
	return str
		.split(' ')
		.reduce<string[]>((acc, word) => {
			if (word.length > 0) {
				acc.push(
					letterCase === 'lover' ? word.toLowerCase() : word
				);
			}
			return acc;
		}, []);
};

const checkWords = (
	words: string[],
	loverCaseWords: string[],
	originWords: string[]
) => {
	return words.map((word, index) => {
		if (loverCaseWords[index] === word) {
			return { word: originWords[index], correct: true };
		}
		return { word, correct: false };
	});
};

const constructElements = (
	words: ReturnType<typeof checkWords>
) => {
	const elements = [];
	for (const { word, correct } of words) {
		let elTagName: 'span' | 's' = correct ? 'span' : 's';
		const el = document.createElement(elTagName);
		el.textContent = word;
		const space = document.createTextNode(' ');
		elements.push(el, space);
	}
	return elements;
};

/**
 * 'Node.removeChild' is more optimized than 'Element.innerHTML'
 * @link https://rusingh.com/javascript-benchmark-removechild-vs-innerhtm
 */
const cleanupOutput = (node: HTMLElement | null) => {
	if (!node) return;
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};

const fillOutput = (
	node: HTMLElement | null,
	elements: ReturnType<typeof constructElements>
) => {
	if (!node) return;
	node.append(...elements);
};


export const useSentence = (sentence: string) => {
	const [input, setInput] = useState<HTMLTextAreaElement | null>(null);
	const [output, setOutput] = useState<HTMLOutputElement | null>(null);

	const originWords = parseWords(sentence, 'origin');
	const loverCaseWords = parseWords(sentence, 'lover');


	const onChange = () => {
		if (!input) return;
		const words = parseWords(input.value);
		if (!words) return;
		const checkedWords = checkWords(words, loverCaseWords, originWords);
		const elements = constructElements(checkedWords);
		cleanupOutput(output);
		fillOutput(output, elements);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	useEffect(() => {
		if (!input) return;
		input.addEventListener('input', onChange);
		input.addEventListener('keydown', onKeyDown);
		return () => {
			input.removeEventListener('input', onChange);
			input.removeEventListener('keydown', onKeyDown);
		};
	}, [input]);

	return { setInput, setOutput };
};