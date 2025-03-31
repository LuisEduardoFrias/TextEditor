
export interface EditorPlugin {
	applyFormat: (
		before: string,
		selected: string,
		after: string,
		value?: string
	) => string;
}
