Promise.myAll = (arr) => {
	return new Promise((res, rej) => {
		if (!Array.isArray(arr)) throw new TypeError("not array");
		let count = 0,
			ans = Array(arr.length);
		for (let i = 0; i < arr.length; i++)
			arr[i]
				.then((data) => {
					(ans[i] = data), ++count === arr.length && res(ans);
				})
				.catch((err) => rej(err));
	});
};

const a = new Promise((res) => setTimeout(() => res("first promise"), 2000));
const b = new Promise((res) => setTimeout(() => res("second promise"), 3000));

Promise.myAll([a, b]).then((data) => console.log(data));
