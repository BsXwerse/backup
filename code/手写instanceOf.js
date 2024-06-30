function myInstanceOf(obj, cons) {
	let proto = Object.getPrototypeOf(obj);
	while (proto) {
		if (proto === cons.prototype) return true;
		proto = Object.getPrototypeOf(proto);
	}
	return false;
}

console.log(myInstanceOf({}, Array));
console.log(myInstanceOf([], Array));
