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

const makeKeyHandler = (actions: ISentenceActions) => {
	return (e: KeyboardEvent) => {
		if (e.altKey) {
			switch (e.key) {
				case 'm':
				case 'M':
					return actions.changeMode();
				case 's':
				case 'S':
					return actions.show();
				case 'r':
				case 'R':
					return actions.reset();
				case 'c':
				case 'C':
					return actions.check();
				default:
					break;
			}
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			actions.check();
		}
	};
};


export const useSentence = (sentence: string) => {
	const [input, setInput] = useState<HTMLTextAreaElement | null>(null);
	const [output, setOutput] = useState<HTMLOutputElement | null>(null);

	const originWords = parseWords(sentence, 'origin');
	const loverCaseWords = parseWords(sentence, 'lover');

	const [mod, setMod] = useState<'auto' | 'manual'>('auto');

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
		changeMode: () => {
			setMod(m => m === 'auto' ? 'manual' : 'auto');
		},
		goToYandex: () => openWindow('yandex', sentence)
	};


	useEffect(() => {
		if (!input) return;
		const onKeyDown = makeKeyHandler(actions);
		input.addEventListener('keydown', onKeyDown);
		if (mod === 'auto') {
			input.addEventListener('input', treat);
		}
		return () => {
			input.removeEventListener('keydown', onKeyDown);
			input.removeEventListener('input', treat);
		};
	}, [input, mod]);

	return { setInput, setOutput, actions };
};