//tasks为任务函数数组，返回promise或普通值
async function asyncPool(poolLimit, tasks) {
	const ret = [];
	const executing = [];
	for (const task of tasks) {
		const p = Promise.resolve().then(task);
		ret.push(p);
		if (poolLimit <= tasks.length) {
			const e = p.then(() => executing.splice(executing.indexOf(e), 1));
			executing.push(e);
			if (executing.length >= poolLimit) await Promise.race(executing);
		}
	}
	return Promise.all(ret);
}
