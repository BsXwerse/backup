function carry(fn) {
	if (typeof fn !== "function") throw new TypeError("not fn");
	const c = (...a) => {
		if (a.length < fn.length) return (...b) => c(...a.concat(b));
		else return fn(...a);
	};
	return c;
}
