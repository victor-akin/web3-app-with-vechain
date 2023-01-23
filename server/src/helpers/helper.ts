type InMemState = {
	[key: string]: string | number;
};

export let appState: InMemState = {};

export function keepInMem(data: any) {
	for (const key in data) {
		if (typeof data[key] === 'string' || typeof data[key] === 'number') {
			appState[key] = data[key];
		} else if (typeof data[key] === 'object') {
			keepInMem(data[key]);
		}
	}
}
