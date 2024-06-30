function t(fn, wait) {
	let timer;
	return function (...args) {
		if (timer) return;
		fn.apply(this, args);
		timer = setTimeout(() => (timer = null), wait);
	};
}
