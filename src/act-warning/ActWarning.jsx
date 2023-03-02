import { useState } from 'react';

export const ActWarning = () => {
	const [defaultValue, setDefaultValue] = useState('');
	const [copyText, setCopyText] = useState('Copy');

	const onChange = (event) => {
		const { value } = event.target;
		setDefaultValue(value);
	};

	const resetCopyText = () => {
		const timer = setTimeout(() => {
			setCopyText('Copy');
		}, 1000);

		return () => clearTimeout(timer);
	};

	const copyClick = async (value) => {
		await navigator.clipboard
			.writeText(value)
			.then(() => {
				setCopyText('Copied');
				resetCopyText();
			})
			.catch(() => setCopyText('Failed'));
	};

	return (
		<div>
			<label htmlFor="copy">Type and copy text</label>
			<input
				type="text"
				id="copy"
				defaultValue={defaultValue}
				onChange={onChange}
			/>
			<button onClick={() => copyClick(defaultValue)}>{copyText}</button>
		</div>
	);
};

export default ActWarning;
