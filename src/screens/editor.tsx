'use client'
import { useRef, useEffect, useState } from 'react'
import core from '../core/index'
import { EditorPlugin } from '../interfaces/plugin_interface'
import './editor.css'

export default function Editor() {
	const editorRef = useRef<HTMLDivElement>(null);
	const [plugins, setPlugins] = useState<EditorPlugin[]>([]);
	const [_content_, setContext] = useState({ content: null, initialPosition: 0 });

	useEffect(() => {
		const editor = editorRef.current;

		if (editor.childNodes.length > 0) {
			const nuevoRango = document.createRange();
			const nuevaSeleccion = window.getSelection();

			const posicionCorrecta = Math.min(_content_.initialPosition, editor.childNodes[0].length);

			nuevoRango.setStart(editor.childNodes[0], posicionCorrecta);
			nuevoRango.collapse(true);

			nuevaSeleccion.removeAllRanges();
			nuevaSeleccion.addRange(nuevoRango);

			editor.focus();
		}
	}, [_content_])

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.addEventListener('input', handleInputChange);
			editorRef.current.addEventListener('select', handleSelectionChange);
		}

		core.on('editor:contentFormarted', ({ content }) => {

			const seleccion = window.getSelection();

			if (seleccion.rangeCount > 0) {
				const rango = seleccion.getRangeAt(0);
				const initialPosition = rango.startOffset;

				setContext({ content, initialPosition, });
			}
		});


		core.on('pluginManager:pluginsLoaded', (plugin) => {
			setPlugins((prev) => ([...prev, plugin]));
		});

		core.on('menu:optionSelected', (data) => {
			const plugin = plugins.find((plugin) => plugin.id === data.option);
			if (editorRef.current && plugin) {
				applyFormat(plugin.fn, data.value);
			}
		});

		return () => {
			if (editorRef.current) {
				editorRef.current.removeEventListener('input', handleInputChange);
				editorRef.current.removeEventListener('select', handleSelectionChange);
			}
		};
	}, [plugins]);

	const handleInputChange = () => {
		if (editorRef.current) {
			core.emit('editor:contentChanged', {
				content: editorRef.current.innerHTML,
			});

			core.emit('menu:editorFormat', {
				content: editorRef.current.innerHTML,
			});
		}
	};

	const handleSelectionChange = () => {
		if (editorRef.current) {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				core.emit('editor:selectionChanged', {
					start: range.startOffset,
					end: range.endOffset,
				});
			}
		}
	};

	const applyFormat = (applyFormat: EditorPlugin, value?: string) => {
		const selection = window.getSelection();

		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const selectedText = range.extractContents();

			const formattedHTML = applyFormat('', selectedText.textContent || '', '', value);

			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = formattedHTML;

			while (tempDiv.firstChild) {
				range.insertNode(tempDiv.firstChild);
			}

			selection.removeAllRanges();
			selection.addRange(range);
		}
	};


	return (
		<div className="editor__">
			<div className="page" ref={editorRef} dangerouslySetInnerHTML={{ __html: _content_.content }} contentEditable />
		</div>
	)
};

