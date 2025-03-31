'use client'
import { useState, ChangeEvent } from 'react'

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
		onClick("alignRight");
		setTimeout(() => setIsPressed(false), 200);
	};

	return (
		<div
			style={{
				position: 'relative',
				display: "flex",
				flexDirection: 'column',
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
			<img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/align-right.png" alt="align-right" />
		</div>
	);
}


const alignRightPlugin: EditorPlugin = {
	applyFormat(before, selected, after, value) {
		return before+`<p style="text-align: right;">${selected}</p>`+after;
	},
};

export default alignRightPlugin;

