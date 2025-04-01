'use client'
import { useEffect } from 'react'
import core from '../../core/index'


const handleInputChange = (content) => {
	core.emit('editor:contentFormarted', {
		content
	});
};

const span = (value, style) => {
	return `<span style='${style}'>${value}</span>`;
};

const applyFormat = (content) => {
	let text = content;

	/*
	const replacements = ['html', 'head', 'body', 'span', 'main', 'footer', 'header'];
	const regex = new RegExp(`\\b(${replacements.join('|')})\\b(?![^<]*>)`, 'g');
	text = text.replace(regex, (match) => span(match, 'color: #ff8b27'));

	text = text.replace(';', span(';', 'color: #000'))
	text = text.replace('&gt;', span('&gt;', 'color: ##ff8b27'))
	text = text.replace('&lt;', span('&lt;', 'color: #07ffc4'))
	text = text.replace(')', span(')', 'color: #07afff'))
	text = text.replace('(', span('(', 'color: #07afff'))
*/

	handleInputChange(text);
};



const htmlFormetPlugin = {
	applyFormat({ content }) {
		applyFormat(content)
	}
}

export default htmlFormetPlugin;