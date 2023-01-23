import { Framework } from '@vechain/connex-framework';
import { Driver, SimpleNet, SimpleWallet } from '@vechain/connex-driver';
import { utils } from '@vechain/ethers';
import { Certificate } from 'thor-devkit';

export let Connex: Framework;

export const loginMessage: string = 'Sign transaction to login';

export async function vechainConnexService(url: string) {
	if (Connex !== undefined) return;

	const net = new SimpleNet(url);
	const driver = await Driver.connect(net);

	Connex = new Framework(driver);
}

export async function signMessage(message: string) {
	return Connex.vendor
		.sign('cert', {
			purpose: 'identification',
			payload: {
				type: 'text',
				content: message,
			},
		})
		.request();
}

export async function getAccount(address: string) {
	return Connex.thor.account(address).get();
}

export function verifyMessage(certReponse: Certificate): boolean {
	try {
		Certificate.verify(certReponse);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
