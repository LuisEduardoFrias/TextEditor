"use server";

import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { TypeManifest } from '../entities/manifest'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function readPlugins(): Promise<TypeManifest[]> {
	try {
		const absoluteFolderPath = path.join(__dirname, "../plugins");

		const pluginFolders = await fs.readdir(absoluteFolderPath, { withFileTypes: true, });

		const plugins: TypeManifest[] = [];

		for (const folder of pluginFolders) {

			if (folder.isDirectory()) {

				const manifestPath = path.join(
					absoluteFolderPath,
					folder.name,
					"manifest.json"
				);

				const manifestContent = await fs.readFile(manifestPath, "utf-8");
				const manifest = JSON.parse(manifestContent);

				const files = await fs.readdir(path.join(absoluteFolderPath, folder.name));

				const fileImport = files.find((file) => file !== "manifest.json");

				plugins.push({ manifest, fileImport: path.join(folder.name, fileImport) });
			}
		}

		return plugins;

	} catch (error) {
		console.error("Error al leer plugins:", error);
		return [];
	}
}
