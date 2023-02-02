import { useEffect, useState } from "react";
import { ISentenceActions } from "./types";

const CLASSES = {
	valid_output: 'valid',
	hovered_world: 'cta'
};

const URL_BASES = {
	cambridge_dictionary: 'https://dictionary.cambridge.org/dictionary/english-russian/',
	yandex_translate: 'https://translate.yandex.ru/?ui=ru&source_lang=en&target_lang=ru&text='
};

const setValidity = (
	input: HTMLTextAreaElement | null,
	output: HTMLOutputElement | null,
	isValid: boolean
) => {
	if (!input || !output) return;
	// input
	input.setCustomValidity(isValid ? '' : 'invalid');
	// output
	const funcName = isValid ? 'add' : 'remove';
	output.classList[funcName](CLASSES.valid_output);
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
	let isValid = false;
	return {
		checkedWords: words.map((word, index) => {
			if (loverCaseWords[index] === word) {
				const isLastCorrectWord = index === originWords.length - 1;
				if (isLastCorrectWord) isValid = true;
				return { word: originWords[index], correct: true };
			}
			return { word, correct: false };
		}),
		isValid
	};
};

const openWindow = (
	target: 'cambridge-dictionary' | 'yandex',
	word: string
) => {
	const baseUrl = target === 'cambridge-dictionary'
		? URL_BASES.cambridge_dictionary
		: URL_BASES.yandex_translate;
	window.open(baseUrl + word, '_black', "width=480, height=620, popup=yes");
};

const constructElements = (
	words: ReturnType<typeof checkWords>['checkedWords']
) => {
	const elements = [];
	for (const { word, correct } of words) {
		let elTagName: 'span' | 's' = correct ? 'span' : 's';
		const el = document.createElement(elTagName);
		el.textContent = word;
		if (elTagName === 'span') {
			el.onclick = () => openWindow('cambridge-dictionary', word);
			el.classList.add(CLASSES.hovered_world);
		}
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

	setValidity(input, output, false); // init

	const treat = () => {
		if (!input) return;
		const words = parseWords(input.value);
		if (!words) return;
		const { checkedWords, isValid } = checkWords(words, loverCaseWords, originWords);
		setValidity(input, output, isValid);
		cleanupOutput(output);
		fillOutput(output, constructElements(checkedWords));
	};

	const actions: ISentenceActions = {
		check: treat,
		show: () => {
			const words = originWords.map(word => ({ word, correct: true }));
			cleanupOutput(output);
			fillOutput(output, constructElements(words));
		},
		reset: () => {
			if (!input) return;
			input.value = '';
			cleanupOutput(output);
			setValidity(input, output, false);
		},
		goToYandex: () => openWindow('yandex', sentence)
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	useEffect(() => {
		if (!input) return;
		input.addEventListener('input', treat);
		input.addEventListener('keydown', onKeyDown);
		return () => {
			input.removeEventListener('input', treat);
			input.removeEventListener('keydown', onKeyDown);
		};
	}, [input]);

	return { setInput, setOutput, actions };
};