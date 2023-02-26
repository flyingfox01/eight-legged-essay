const foo = (str: string = '') => {
	const map: Record<string, number> = {}
	for(let i = 0; i < str.length; i++) {
		const char = str[i];
		map[char] = (map[char] || 0) + 1;
	}
	
	let min = Number.MAX_VALUE;

	const keys = Object.keys(map);
	for(let i = 0; i < keys.length; i++) {
		const k = keys[i]
		if(map[k] < min) {
			min = map[k];
		}
	}

	if(min === Number.MAX_VALUE) return str;

	let ret = ''
	for(let i = 0; i < str.length; i++) {
		const char = str[i];
		if(map[char] === min) continue;
		ret += char;
	}
	
	return ret;
}

console.log(foo('abcdd'))
console.log(foo('aabbcc'))

export default foo