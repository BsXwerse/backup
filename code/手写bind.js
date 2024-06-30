Function.prototype.myBind = function (context, ...args) {
	if (typeof this !== "function") throw new TypeError("not fn");
	context = Object(context ?? window);
	context.fn = this;
	return function Fn(...args2) {
		const result = context.fn(...args.concat(args2));
		delete context.fn;
		return result;
	};
};

function log(...args) {
	console.log(this, ...args);
}
const boundLog = log.myBind("this value", 1, 2);
const boundLog2 = boundLog.myBind("new this value", 3, 4);
boundLog2(5, 6); // "this value", 1, 2, 3, 4, 5, 6
