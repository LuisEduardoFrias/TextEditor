'use client'
import { useState, useEffect, ReactNode, cloneElement } from 'react'
import { TypeManifest } from '../entities/manifest'
import core from '../core/index'
import './menu.css'

export default function Menu() {
	const [sections, setSections] = useState<ReactNode[]>([]);

	useEffect(() => {
		core.on('pluginManager:pluginsSectionLoaded', (plugins) => setSections(plugins));
	}, []);

	return (
		<div className="menu-content">
			<Fonts />
			<Paragraph />
		</div>
	);
};

function Fonts() {
	const [pluginOptions, setPluginOptions] = useState<TypeOption[]>([]);

	useEffect(() => {
		core.on('pluginManager:fonts:pluginsLoaded', (plugins) => setPluginOptions(plugins));
	}, []);

	const handleOptionClick = (option: string, value: any) => {
		core.emit('menu:optionSelected', { option, value });
	};

	return (
		<div className="fonts_container">

			<div className="fonts">
				{pluginOptions.length >= 1 &&
					pluginOptions?.map((Option: any, index: number) => {
						const Component = Option.imports.exportValue.Icon;

						return (
							<Component key={index} onClick={handleOptionClick} />
						)
					})
				}
			</div>

			<span>Fonts</span>
		</div>
	)
}

function Paragraph() {
	const [pluginOptions, setPluginOptions] = useState<TypeOption[]>([]);

	useEffect(() => {
		core.on('pluginManager:paragraph:pluginsLoaded', (plugins) => setPluginOptions(plugins));
	}, []);

	const handleOptionClick = (option: any) => {
		core.emit('menu:optionSelected', { option });
	};

	return (
		<div className="fonts_container">

			<div className="fonts">
				{pluginOptions.length >= 1 &&
					pluginOptions?.map((Option: any, index: number) => {
						const Component = Option.imports.exportValue.Icon;

						return (
							<Component key={index} onClick={handleOptionClick} />
						)
					})
				}
			</div>
			<span>Paragraph</span>
		</div>
	)
}
