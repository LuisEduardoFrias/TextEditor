"use client"

import dynamic from 'next/dynamic';
import React from 'react';

export async function importFile(fileName) {
	try {
		const LoadableComponent = dynamic(() => import(`../plugins/${fileName}`), {
			ssr: false,
			loading: () => <p>"Loading plugin..." </p>,
		});

		const module = await import(`../plugins/${fileName}`);

		const defaultValue = module.default;

		const exportValue = { ...module };

		delete exportValue.default;

		return {
			default: defaultValue,
			exportValue,
		};
	} catch (error) {
		console.error("Error al importar el archivo:", error);
		return null;
	}
}
