const debounce = (fn, delay) => {
	let hander = null;

	return function(){
		if(hander) clearTimeout(hander);

		hander = setTimeout(() => {
			fn()
		}, delay);
	}
	
}

const Component = () => {
	const onClick = debounce(() => {
		console.log('防抖')
	}, 1000);

	return <button onClick={onClick}>测试</button>
}

export default Component;