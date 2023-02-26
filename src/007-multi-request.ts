type Result = {
	success: boolean;
	url: string;
}

class MultiRequest {
	private max: number = 3;
	private queue: string[] = [];
	private curr: number = 0;

	constructor(urls: string[] = [], max: number = 3) {
		this.queue = [...urls];
		this.max = max;
	}

	private ajax(url: string): Promise<Result> {
		return new Promise((resove) => {
			setTimeout(() => {
				if (Math.random() > 0.5) {
					console.log(`url:${url} runded`);
					resove({ success: true, url });
				} else {
					resove({ success: false, url });
				}
			}, Math.random() * 100)
		});
	}

	private pick(remain: string[]): string[] {
		let count = remain.length;
		const { length } = this.queue
		const todo = remain;
		while (count < this.max && this.curr < length) {
			const ele = this.queue[this.curr++];
			if (!ele) break;
			count++
			todo.push(ele)
		}

		return todo;
	}

	public next(results: Result[] = []) {
		const remain = results.filter(d => !d.success).map(result => result.url);

		const todo = this.pick(remain);

		if(todo.length) {
			console.log(`batch: ${String(todo)}`)
			Promise.all(todo.map(d => this.ajax(d))).then(arr => {
				this.next(arr)
			});
		}
	}

	public add(url: string) {
		console.log(`add: ${url}`);
		this.queue.push(url);
	}

	public run() {
		this.next(undefined);
	}

}

// const mq = new MultiRequest(['url-1', 'url-2', 'url-3', 'url-4', 'url-5', 'url-6', 'url-7', 'url-8', 'url-9'])
// mq.run();
// setTimeout(() => {
// 	mq.add('url-10')
// }, 200);

export default MultiRequest;