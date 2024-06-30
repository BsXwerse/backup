function traversal(node) {
	if (node && node.nodeType === 1) {
		console.log(node.tagName);
		for (const i of node.childNodes) i.nodeType === 1 && traversal(i);
	}
}
