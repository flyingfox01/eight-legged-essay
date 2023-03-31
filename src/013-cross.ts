const foo = (list: string[][]): string[] => {
	const ret: string[] = [];
	const length = list.length;
	const loop = (str: string, i: number) => {
		if(i >= length) {
			ret.push(str);
			return;
		}
		list[i].forEach(item => {
			loop(str + item, i+1);
		})
	}

	loop('', 0);
	
	return ret;
}

// 输入 [['A', 'B', ...], ['1', '2'], ['a', 'b'], ...]
// 输出 ['A1a', 'A1b', ....]

console.log(foo([['A', 'B', 'c'], ['1', '2', '3', '4'], ['a', 'b']]));

export default foo