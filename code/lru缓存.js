function LinkNode(val) {
	this.val = val;
	this.next = null;
	this.prev = null;
	this.key = null;
}

function remove(node) {
	node.next.prev = node.prev;
	node.prev.next = node.next;
}

function insert(p, node) {
	node.next = p.next;
	p.next.prev = node;
	p.next = node;
	node.prev = p;
}

const LRUCache = function (capacity) {
	this.capacity = capacity;
	this.map = new Map();
	this.head = new LinkNode(0);
	this.tail = new LinkNode(0);
	this.head.next = this.tail;
	this.tail.prev = this.head;
};

LRUCache.prototype.get = function (key) {
	if (!this.map.has(key)) return -1;
	const node = this.map.get(key);
	remove(node);
	insert(this.head, node);
	return node.val;
};

LRUCache.prototype.put = function (key, value) {
	if (!this.map.has(key)) {
		const node = new LinkNode(value);
		node.key = key;
		this.map.set(key, node);
		insert(this.head, node);
		if (this.map.size > this.capacity) {
			this.map.delete(this.tail.prev.key);
			remove(this.tail.prev);
		}
	} else {
		const node = this.map.get(key);
		node.val = value;
		remove(node);
		insert(this.head, node);
	}
};
