import Connex from '@vechain/connex';
import * as dotenv from 'dotenv';

dotenv.config();

const vendor = new Connex.Vendor('test');

const connectWalletBtn = document.getElementById('connect-wallet')!;

const BASE_URL = process.env.SERVER_URL;

const LOGIN_MESSAGE = 'Sign transaction to login';

const avatar = document.querySelector('.avatar')!;

connectWalletBtn.addEventListener('click', async () => {
	let signedMessageWithSigner = await signMessage(LOGIN_MESSAGE);

	let verifyResponse = await attemptLogin(signedMessageWithSigner);

	if (verifyResponse.login) {
		avatar.classList.remove('hidden');
		connectWalletBtn.classList.add('hidden');
	}
});

export async function signMessage(message: string) {
	return vendor
		.sign('cert', {
			purpose: 'identification',
			payload: {
				type: 'text',
				content: message,
			},
		})
		.request();
}

async function attemptLogin(certResponse: Connex.Vendor.CertResponse) {
	let requestOptions = {
		method: 'POST',
		body: JSON.stringify({ certResponse }),
	};

	let url = `${BASE_URL}?action=login`;

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.then((result) => result);
}
