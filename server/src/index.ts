import * as http from 'http';
import * as dotenv from 'dotenv';
import { vechainConnexService } from './vechain.service';
import { send, login } from './vechain.controller';
import { keepInMem } from './helpers/helper';

dotenv.config();

const server = http.createServer(async (req, res) => {
	await vechainConnexService(process.env.VECHAIN_NODE_URL!);

	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');

	let url = new URL(`${req.headers.host}${req.url}`);

	let body = '';
	req.on('data', (data) => (body += data));

	req.on('end', () => {
		keepInMem(JSON.parse(body));

		switch (url.searchParams.get('action')) {
			case 'login':
				login(req, res);
				break;

			default: // send
				send(req, res);
				break;
		}
	});
});

server.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at ${process.env.SERVER_PORT}/`);
});
