const sleep = (delay: number) => {
	return new Promise((resove) => {
		setTimeout(resove, delay);
	});
}

const run = async () => {
	console.log(1)
	await sleep(1000)
	console.log(2)
}

run()

export default sleep