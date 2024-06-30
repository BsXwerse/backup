function unique(arr) {
	if (!Array.isArray(arr)) return;
	arr.sort();
	const res = [arr[0]];
	for (let i = 1; i < arr.length; i++)
		if (arr[i] !== res.at(-1)) res.push(arr[i]);
	return res;
}

console.log(unique([1, 2, 2, 2, null, null]));
