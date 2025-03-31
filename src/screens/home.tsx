'use client'
import Editor from './editor';
import Menu from './menu';
import PluginManager from './plugin_manager';
import './home.css'

export default function Home() {
	return (
		<div className="container">
			<PluginManager />
			<Menu />
			<Editor />
		</div>
	);
}