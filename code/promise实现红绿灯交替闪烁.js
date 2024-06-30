function red() {
	console.log("red");
}
function green() {
	console.log("green");
}
function yellow() {
	console.log("yellow");
}
const light = (timer, cb) =>
	new Promise((resolve) => {
		setTimeout(() => {
			cb();
			resolve();
		}, timer);
	});
const step = () =>
	light(3000, red)
		.then(() => {
			return light(2000, green);
		})
		.then(() => {
			return light(1000, yellow);
		})
		.then(() => {
			step();
		});

step();
