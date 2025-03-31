
type EventHandler = (data: any) => void;

const core = {

	events: {} as { [key: string]: EventHandler[] },

	on(eventName: string, handler: EventHandler) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(handler);
	},

	emit(eventName: string, data: any) {
		if (this.events[eventName]) {
			this.events[eventName].forEach((handler) => handler(data));
		}
	},

	off(eventName: string, handler: EventHandler) {
		if (this.events[eventName]) {
			this.events[eventName] = this.events[eventName].filter(
				(h) => h !== handler
			);
		}
	},
};

export default core;
