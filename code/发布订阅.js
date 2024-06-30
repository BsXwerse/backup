class EventHub {
	constructor() {
		this.map = {};
	}
	on(event, fn) {
		this.map[event] = this.map[event] ?? [];
		this.map[event].push(fn);
	}
	emit(event, ...args) {
		this.map[event]?.forEach((fn) => fn(...args));
	}
	off(event, fn) {
		this.map[event] = this.map[event]?.filter((f) => f !== fn) ?? [];
	}
	once(event, callback) {
		const f = (...args) => {
			callback(...args);
			this.off(event, f);
		};
		this.on(event, f);
	}
}
