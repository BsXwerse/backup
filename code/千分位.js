//给数字加千分位逗号
function format(num) {
	num = num + "";
	const str = [];
	for (let i = num.length - 1, j = 1; i >= 0; i--, j++) {
		str.push(num[i]);
		j % 3 == 0 && i != 0 && str.push(",");
	}
	return str.reverse().join("");
}
