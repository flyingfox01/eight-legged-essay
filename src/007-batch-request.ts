async function batchRequest(
	urls: string[],
	maxConcurrent: number,
	timeout: number
): Promise<any[]> {
	const results: any[] = [];
	const pendingRequests: Promise<any>[] = [];
	
	// 单个请求
	async function fetchUrl(url: string) {
		// 用AbortController控制超时
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);

		// 用fetch创建一个异步请求任务
		const promise = fetch(url, { signal: controller.signal })
			.then((response) => response.json())
			.catch((error) => ({ error }))
			.finally(() => clearTimeout(id));
		
		// 把这个任务加入到pending列表，便于后面请求并发请求
		pendingRequests.push(promise);

		// 等待请求结果
		const result = await promise;
		return result;
	}
	
	// 首先按url挨个加入请求。
	for (const url of urls) {
		// 一旦超过max数量，就开始并发
		if (pendingRequests.length >= maxConcurrent) {
			await Promise.race(pendingRequests);
		}

		// 将请求结果返回
		const result = await fetchUrl(url);
		results.push(result);
	}

	// 对剩下的进行Promise.all并发请求
	await Promise.all(pendingRequests);
	return results;
}

const urls = [
	'https://jsonplaceholder.typicode.com/todos/1',
	'https://jsonplaceholder.typicode.com/todos/2',
	'https://jsonplaceholder.typicode.com/todos/3',
	'https://jsonplaceholder.typicode.com/todos/4',
	'https://jsonplaceholder.typicode.com/todos/5',
	'https://jsonplaceholder.typicode.com/todos/6',
	'https://jsonplaceholder.typicode.com/todos/7',
	'https://jsonplaceholder.typicode.com/todos/8',
	'https://jsonplaceholder.typicode.com/todos/9',
	'https://jsonplaceholder.typicode.com/todos/10',
];

const test = async () => {
	const maxConcurrent = 3;
	const timeout = 1000;
	const results = await batchRequest(urls, maxConcurrent, timeout);
	console.log(results);
}

test();

export default batchRequest;