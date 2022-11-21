import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
	res.end('Hello World');
});

server.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at ${process.env.SERVER_PORT}/`);
});
