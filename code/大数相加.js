function bigAdd(a, b) {
	(a = a + ""), (b = b + "");
	let i = a.length - 1,
		j = b.length - 1,
		c = 0;
	const ans = [];
	while (i >= 0 || j >= 0) {
		c += i >= 0 ? +a[i--] : 0;
		c += j >= 0 ? +b[j--] : 0;
		ans.push(c % 10);
		c = ~~(c / 10);
	}
	if (c) ans.push(1);
	return ans.reverse().join("");
}
