import QRCodeStyling from 'qr-code-styling';
import { generateVCard, generateQRCode } from '../helpers';

describe('test helpers', () => {
	test('generateVCard', async () => {
		const result = await generateVCard({
			first_name: 'Test',
			last_name: '',
			company: '',
			designation: '',
			address: { street: '', state: '', zip: '', country: '' },
			website: '',
			phone: '',
			work_phone: '',
			email: ''
		},"");
		expect(result).toContain('Test');
	});

	test('generateQRCode', async () => {
		const result = await generateQRCode({
			vcard:
				'BEGIN:VCARD\r\nVERSION:4.0\r\nFN:Test\r\nN:;Test;;;\r\nORG…,VOICE,VIDEO":tel:\r\nEMAIL;TYPE=WORK:\r\nEND:VCARD\r\n',
			logo: undefined,
			color: '',
			backgroundColor: ''
		});
		expect(result).toBeInstanceOf(QRCodeStyling);
	});
});
