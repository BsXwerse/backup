function flat(arr) {
	if (!Array.isArray(arr)) return;
	const res = [];
	for (const n of arr) {
		if (Array.isArray(n)) res.push(...flat(n));
		else res.push(n);
	}
	return res;
}

console.log(flat([1, 2, [3, 4, [5, 6, [7]], 8], 9]));
