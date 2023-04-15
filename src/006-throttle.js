// 用了定时器，所以最后一次会触发
export const throtte1 = (fn, wait) => {
	let flag = true
	return function(){
		if(flag) {
			flag = false// 每次执行后关闭阀门
			setTimeout(() => {
				fn()
				flag = true;// wait后开阀门
			}, wait);
		}
	}
	
}

// 计算时间的，所以第一次会执行
export const throtte2 = (fn, wait) => {
	let pre = 0;
	return function() {
		const now = new Date().getTime();
		if(now - pre > wait) {
			fn();
			pre = now;
		}
	}
}

const Component = () => {
	const onClick = throtte2(() => {
		console.log('节流')
	}, 1000);

	return <button onClick={onClick}>测试</button>
}

export default Component;