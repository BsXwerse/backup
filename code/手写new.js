function _new(cons, ...rest) {
	const newObj = Object.create(cons.prototype);
	const result = cons.apply(newObj, rest);
	return typeof result === "object" ? result : newObj;
}
