type Item = {
	[key: string]: any
}

const foo = (list: Item[]) => {
	const map: Record<string, Item> = {}
	const treeList: Item[] = []

	list.forEach(item => {
		if(!item.children) item.children = [];
		map[item.id] = item
	});

	list.forEach(item => {
		const parent = map[item.parentId];
		if(parent) {
			parent.children.push(item);
		} else {
			treeList.push(item);
		}
	});

	return treeList;
}

const arr = [
	{
		id: 2,
		name: '部门B',
		parentId: 0
	},
	{
		id: 3,
		name: '部门C',
		parentId: 1
	},
	{
		id: 1,
		name: '部门A',
		parentId: 2
	},
	{
		id: 4,
		name: '部门D',
		parentId: 1
	},
	{
		id: 5,
		name: '部门E',
		parentId: 2
	},
	{
		id: 6,
		name: '部门F',
		parentId: 3
	},
	{
		id: 7,
		name: '部门G',
		parentId: 2
	},
	{
		id: 8,
		name: '部门H',
		parentId: 4
	}
]

console.log(foo(arr))

export default foo