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
	const [showColor, setShowColor] = useState(false);
	const [color, setColor] = useState('#000');

	const handleClick = () => {
		setIsPressed(true);
		onClick("color", color);
		setTimeout(() => setIsPressed(false), 200);
	};

	const handleShowColor = () => {
		setShowColor(true);
	};

	const handleColor = (event: ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value)
		onClick("color", event.target.value);
		setShowColor(false);
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

		>
			{
				showColor && <div style={{ position: "absolute" }}>
					<input type="color" value={color} onChange={handleColor} />
				</div>
			}
			<span style={{ height: "18px", color }} onClick={handleClick}>A</span>
			<span style={{ backgroundColor: color, width: "70%", height: "5px" }} onClick={handleShowColor} ></span>
		</div>
	);
}


const colotPlugin: EditorPlugin = {
	applyFormat(before, selected, after, value) {
		return before + `<span style="color: ${value}">${selected}</span>` + after;
	},
};

export default colotPlugin;

