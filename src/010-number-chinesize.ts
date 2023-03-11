const foo = (num: number): string => {
	const name = '零壹贰叁肆伍陆柒捌玖拾'.split('');
	const unit = '亿万千百十'.split('');
	const times = [100000000, 10000, 1000, 100, 10];

	const mod = (n: number, i: number = 0): string => {
		while(i < times.length) {
			const m = times[i]
			if(n >= m) {
				const a = Math.floor(n / m)
				const b = n % m
				const suffix = (i + 1 < times.length && 10 * b / times[i] < 1) ? name[0] : '';
				// 按当前位切分成除数和余数，然后计算后一位是否存在（补零）
				return mod(a, i) + unit[i] + suffix + mod(b, i++);
			}
			i++;
		}

		return name[n]
	}

	return mod(num);
}

console.log(123456, foo(123456));
console.log(100010001, foo(100010001));

export default foo