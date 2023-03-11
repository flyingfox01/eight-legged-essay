type Item = {
	[key: string]: any
}

const foo = (arr: Item[]) => {
	const map: Record<string, Item> = {
		0: {
			children: []
		}
	}
	for(let item of arr) {
		const parent = map[item.parentId];
		if(parent) {
			if(parent.children) parent.children.push(item);
			parent.children = [item]
		} else {
			map[0].children.push(item);
		}
		map[item.id] = item;
	}

	return map[0];
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