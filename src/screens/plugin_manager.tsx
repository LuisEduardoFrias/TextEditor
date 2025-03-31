'use client'
import { useEffect, useState } from 'react'
import core from '../core/index'
import { readPlugins } from "../helpers/read_files"
import { importFile } from "../helpers/import_file"
import { TypeManifest } from '../entities/manifest'

type TypePlugin = {
	_category: string,
	manifest: object,
	imports: any,
}

export default function PluginManager() {

	useEffect(() => {
		(async () => {
			const plugins: TypeManifest[] = await readPlugins();

			const _plugins: TypePlugin[] = [];

			for (const plugin of plugins) {
				const imports = await importFile(plugin.fileImport);
				_plugins.push({ imports, _category: plugin.manifest.category, manifest: plugin.manifest });
			}

			const groupPlugins = Object.entries(pluginsByCategory(_plugins));

			for (const plugin of groupPlugins) {
				core.emit(`pluginManager:${plugin[0]}:pluginsLoaded`, plugin[1]);
			}

			for (const plugin of groupPlugins) {
				plugin[1].forEach((plug) => {
					core.emit(`pluginManager:pluginsLoaded`, { id: plug.manifest.id, fn: plug.imports.default.applyFormat });
				})
			}

			for (const plugin of groupPlugins) {
				core.on(`menu:${plugin[0]}:optionSelected`, plugin[1][0].imports.default.applyFormat);
			}
		})()
	}, []);

	return null;
};

type ModuloImportadoByCategories = {
	[key: string]: TypePlugin[]
}

function pluginsByCategory(plugins: TypePlugin[]): ModuloImportadoByCategories {
	const result: ModuloImportadoByCategories = {};

	plugins.forEach(plugin => {
		const category = plugin._category;
		delete plugin._category;

		if (result[category]) {
			result[category].push(plugin);
		} else {
			result[category] = [plugin];
		}
	});

	return result;
}