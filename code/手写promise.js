function MyPromise(fn) {
	this.cbs = [];
	fn((value) => {
		setTimeout(() => {
			this.data = value;
			this.cbs.forEach((cb) => cb(value));
		});
	});
}

MyPromise.prototype.then = function (onResolved) {
	return new MyPromise((resolve) => {
		this.cbs.push(() => {
			const res = onResolved(this.data);
			if (res instanceof MyPromise) res.then(resolve);
			else resolve(res);
		});
	});
};

new MyPromise((res) => setTimeout(() => res("aha"), 3000)).then((data) =>
	console.log(data),
);
