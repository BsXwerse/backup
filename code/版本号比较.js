function cmp(astr, bstr) {
	const a = astr.split("."),
		b = bstr.split("."),
		ml = Math.max(a.length, b.length);
	for (let i = 0; i < ml; i++) {
		let an = i < a.length ? a[i] : 0;
		an = isNaN(an) ? an.charCodeAt() : +an;
		let bn = i < b.length ? b[i] : 0;
		bn = isNaN(bn) ? bn.charCodeAt() : +bn;
		if (an < bn) return -1;
		else if (an > bn) return 1;
	}
	return 0;
}

console.log(cmp("1.2.3", "1.2.3"));
console.log(cmp("1.3.3", "1.2.3"));
