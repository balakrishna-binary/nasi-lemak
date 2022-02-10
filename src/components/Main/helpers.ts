import type { CornerSquareType } from 'qr-code-styling';
import * as Validator from '../../utils/validations';

export async function generateVCard(user, logo) {
	try {
		const VCardJS = (await import('vcards-js')).default;
		const vcard = VCardJS();
		if (user?.first_name) vcard.firstName = user.first_name;
		if (user?.last_name) vcard.lastName = user.last_name;
		if (user?.email) vcard.email = user.email;
		if (user?.company) vcard.organization = user.company;
		if (user?.work_phone) vcard.workPhone = user.work_phone;
		if (user?.phone) vcard.cellPhone = user.phone;
		if (user?.designation) vcard.role = user.designation;
		if (user?.website) vcard.url = user.website;
		if (user?.address?.street) vcard.homeAddress.street = user?.address?.street;
		if (user?.address?.city) vcard.homeAddress.city = user?.address?.city;
		if (user?.address?.zip) vcard.homeAddress.postalCode = user?.address?.zip;
		if (user?.address?.countryRegion) vcard.homeAddress.countryRegion = user?.address?.street;
		if (user?.gender) vcard.gender = user?.gender;

		return vcard.getFormattedString();
	} catch (err) {
		throw new Error(err);
	}
}

export async function generateQRCode(data) {
	try {
		const QRCodeStyling = (await import('qr-code-styling')).default;
		const { vcard, color, backgroundColor, logo } = data;

		const options = {
			width: 300,
			height: 300,
			data: vcard,
			dotsOptions: {
				color
			},
			backgroundOptions: {
				color: backgroundColor
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 4,
				imageSize: 0.3
			},
			cornersSquareOptions: {
				type: 'square' as CornerSquareType, // dot, square, extra-rounded
				color: '#000000'
			},
			margin: 0
		};

		if (logo) {
			options['image'] = logo;
		}

		return new QRCodeStyling(options);
	} catch (err) {
		throw new Error(err);
	}
}

export function validate(data) {
  let errors = {};
	
  if (data.email && !Validator.validateEmail(data.email)) {
    errors['email'] = 'Invalid Email!';
  };

  if (data.phone && !Validator.validatePhone(data.phone)) {
		errors['phone'] = 'Invalid Phone!';
  };

  if (data.work_phone && !Validator.validatePhone(data.work_phone)) {
		errors['work_phone'] = 'Invalid Phone!'
  }

  if(data.website && !Validator.validateURI(data.website)) {
		errors['website'] = 'Invalid URL!'
  }

  return {
    is_valid: Object.keys(errors).length === 0,
    errors
  }
}
