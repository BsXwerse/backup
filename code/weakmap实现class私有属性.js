const classZ = (() => {
	const map = new WeakMap();
	class ClassZ {
		constructor(val) {
			map.set(this, val);
		}
		getVal() {
			return map.get(this);
		}
	}
	return ClassZ;
})();

const a = new classZ("test");
console.log(a.getVal());
const b = new classZ("testb");
console.log(b.getVal());
