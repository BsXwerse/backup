function mergePromise(ajaxArray) {
	const data = [];
	let promise = Promise.resolve();
	ajaxArray.forEach((ajax) => {
		promise = promise.then(ajax).then((res) => {
			data.push(res);
			return data;
		});
	});
	return promise;
}
