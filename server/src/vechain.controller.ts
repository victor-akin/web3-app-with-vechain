import http from 'http';
import { Certificate } from 'thor-devkit';
import { appState } from './helpers/helper';
import { verifyMessage, loginMessage } from './vechain.service';

type Req = http.IncomingMessage;
type Res = http.ServerResponse;

const login_data = {
	purpose: 'identification',
	payload: {
		type: 'text',
		content: loginMessage,
	},
};

export async function send(req: Req, res: Res) {
	console.log(appState.address);

	res.end('send');
}

export async function login(req: Req, res: Res) {
	let verify = verifyMessage({
		...login_data,
		domain: appState.domain,
		timestamp: appState.timestamp,
		signer: appState.signer,
		signature: appState.signature,
	} as Certificate);

	verify
		? res.end(JSON.stringify({ login: true }))
		: res.end(JSON.stringify({ login: false }));
}
