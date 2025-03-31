'use client'
import { useState } from 'react'

type EditorPlugin = {
	applyFormat: (
		before: string,
		selected: string,
		after: string,
		value?: string
	) => string;
}

export function Icon({ onClick }: { onClick: (option: string) => void }) {
	const [isPressed, setIsPressed] = useState(false);

	const handleClick = () => {
		setIsPressed(true);
		onClick('underline');
		setTimeout(() => setIsPressed(false), 200);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: 'center',
				alignItems: 'center',
				width: "30px",
				height: "30px",
				WebkitTapHighlightColor: 'transparent',
				userSelect: 'none',
				backgroundColor: isPressed ? 'transparent' : 'transparent',
				scale: isPressed ? '0.9' : '1',
				boxShadow: !isPressed ? 'inset 2px 2px 5px #949494, inset -2px -2px 5px #6a6a6a' : 'inset 2px 2px 5px #949494, inset -2px -2px 5px #6a6a6a, 0px 0px 3px 3px #969696',
				cursor: 'pointer',
			}}
			onClick={handleClick}
		>
			<span style={{ textDecoration: "underline" }}>A</span>
		</div>
	);
}

const underlinePlugin: EditorPlugin = {
	applyFormat(before, selected, after) {
		return `<span style="text-decoration: underline;">${selected}</span>`;
	},
};

export default underlinePlugin;

