<script>
	import { onMount, afterUpdate, tick } from 'svelte';

	let data = {
		first_name: '',
		last_name: '',
		company: '',
		home_phone: '',
		mobile_phone: '',
		email: '',
		url: '',
		address: {
			street: '',
			street2: '',
			city: '',
			state: '',
			zip: '',
			country: '',
		},
		birthday: '',
		related_name: '',
		social_profile: '',
		notes: '',
	}

	// const onMountCallback = async () => {
	// 	try {
	// 		if (typeof window !== 'undefined') {
	// 			const QRCodeStyling = (await import('qr-code-styling')).default;
	// 			const {
	// 				FNProperty,
	// 				TextType,
	// 				VCARD,
	// 				PhotoProperty,
	// 				URIType,
	// 				GenderProperty,
	// 				SexType,
	// 				BdayProperty,
	// 				DateTimeType
	// 			} = await import('vcard4');

	// 			const full_name = new FNProperty([], new TextType('John doe'));
	// 			const img = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
	// 			const photo = new PhotoProperty([], new URIType(image || img));
	// 			const gender = new GenderProperty([], new SexType('M'));
	// 			const bday = new BdayProperty([], new DateTimeType("--0203", "dateandortime"));

	// 			const vcard = new VCARD([
	// 				full_name,
	// 				photo,
	// 				gender,
	// 				bday
	// 			]);
	// 			const data = vcard.repr();

	// 			tick()
	// 			const qrCode = new QRCodeStyling({
	// 				width: 200,
	// 				height: 200,
	// 				data,
	// 				image: image || img,
	// 			});
	// 			qrCode.append(document.getElementById('canvas'));
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// onMount(onMountCallback);

	// afterUpdate(onMountCallback);

	const onSubmit = async () => {
		try {
			if (typeof window !== 'undefined') {
				const QRCodeStyling = (await import('qr-code-styling')).default;
				const {
					FNProperty,
					TextType,
					VCARD,
					PhotoProperty,
					URIType,
					GenderProperty,
					SexType,
					BdayProperty,
					DateTimeType,
					OrgProperty,
					TypeParameter,
					SpecialValueType,
					AdrProperty,
					TelProperty,
					ValueParameter,
					TextListType,
					PrefParameter,
					IntegerType,
					EmailProperty,
					NProperty
				} = await import('vcard4');

				const full_name = new FNProperty([], new TextType([data.first_name, data.last_name].filter(i => i).join(' ')));
				const gender = new GenderProperty([], new SexType('M'));
				const bday = new BdayProperty([], new DateTimeType("19920806T0800-0500", "dateandortime"));

				const nArr = new Array(5);
				nArr[0] = new TextType(data.last_name);
				nArr[1] = new TextType(data.first_name);
				const n = new NProperty([], new SpecialValueType(nArr, "nproperty"));

				const org = new OrgProperty(
					[new TypeParameter(new TextType("work"), "orgproperty")],
					new SpecialValueType([new TextType(data?.company)], "orgproperty")
				);

				const aArr = new Array(7);
				aArr[1] = new TextType(data?.address?.street || '');
				aArr[2] = new TextType(data?.address?.street2 || '');
				aArr[3] = new TextType(data?.address?.city || '');
				aArr[4] = new TextType(data?.address?.city_abbr || '');
				aArr[5] = new TextType(data?.address?.zip || '');
				aArr[6] = new TextType(data?.address?.country || '');
				const adr = new AdrProperty(
					[new TypeParameter(new TextType("work"), "adrproperty")],
					new SpecialValueType(aArr, "adrproperty")
				);

				const tel1 = new TelProperty(
					[
						new ValueParameter(new URIType("tel:" + data?.home_phone || '')),
						new TypeParameter(
							new TextListType([new TextType("HOME"), new TextType("voice")]),
							"telproperty"
						),
						new PrefParameter(new IntegerType(1)),
					],
					new URIType("tel:" + data?.home_phone || '')
				);

				const tel2 = new TelProperty(
					[
						new ValueParameter(new URIType("tel:" + data?.mobile_phone || '')),
						new TypeParameter(
							new TextListType([
								new TextType("WORK"),
								new TextType("CELL"),
								new TextType("VOICE"),
								new TextType("VIDEO"),
							]),
							"telproperty"
						),
					],
					new URIType("tel:" + data?.mobile_phone || '')
				);

				const email = new EmailProperty(
					[new TypeParameter(new TextType("WORK"), "emailproperty")],
					new TextType(data?.email || '')
				);

				// not working //
				const p = new PhotoProperty(
					[],
					new URIType('http://www.example.com/pub/photos/jqpublic.gif')
				);


				const vcard_raw = [
					full_name,
					n,
					gender,
					bday,
					org,
					adr,
					tel1,
					tel2,
					email,
					p
				]

				if(image) {
					console.log(image.length, 'image.length')
					// vcard_raw.push(new PhotoProperty([], new URIType(image)));
				}

				const vcard = new VCARD(vcard_raw);
				console.log(vcard, vcard_raw)
				const repr = vcard.repr();
				const options = {
					width: 300,
					height: 300,
					data: repr,
				}
				if(image_raw) {
					options.image = image_raw
				}
				console.log(options, 'options');
				const qrCode = new QRCodeStyling(options);
				qrCode.append(document.getElementById('canvas'));
			}
		} catch (err) {
			console.error(err);
		}
	}

	let image;
	let image_raw;

	$: console.log(image, 'image');

	const onChangeImage = (files = []) => {
		const file = files[0];
		const FR = new FileReader();
		let baseURL;
		FR.onloadend = () => {
			baseURL = FR.result;
			image_raw = baseURL;
			// image = baseURL;
			// console.log(baseURL, 'baseURL');
			const canvas = document.createElement('canvas');
			canvas.style.height = '100px';
			canvas.style.width = '100px';
			const context = canvas.getContext('2d');
			const img = document.createElement('img');
			img.src = baseURL;
			img.onload = () => {
				context.scale(100/img.width, 100/img.height);
				context.drawImage(img, 0, 0);
				image = canvas.toDataURL();
			}
		}
		FR.readAsDataURL(file);
	}

</script>

<style>
#vcard {
	display: flex;
}
</style>



<div id="vcard">
	<div class="form">
		<form on:submit|preventDefault={onSubmit}>
			<div>
				<input bind:value={data.first_name} placeholder="First name" />
			</div>
			<div>
				<input bind:value={data.last_name} placeholder="Last name" />
			</div>
			<div>
				<input bind:value={data.company} placeholder="Company" />
			</div>
			<div>
				<input bind:value={data.address.street} placeholder="Address line 1" />
			</div>
			<div>
				<input bind:value={data.address.street2} placeholder="Address line 2" />
			</div>
			<div>
				<input bind:value={data.address.state} placeholder="State" />
			</div>
			<div>
				<input bind:value={data.address.city_abbr} placeholder="City Abbr" />
			</div>
			<div>
				<input bind:value={data.address.city} placeholder="City" />
			</div>
			<div>
				<input bind:value={data.address.zip} placeholder="Zipcode" />
			</div>
			<div>
				<input bind:value={data.address.country} placeholder="Country" />
			</div>
			<div>
				<input bind:value={data.home_phone} placeholder="Work Phone" />
			</div>
			<div>
				<input bind:value={data.mobile_phone} placeholder="Mobile Phone" />
			</div>
			<div>
				<input bind:value={data.email} placeholder="Email" />
			</div>

			<input
				type="file"
				name="myImage"
				accept="image/png, image/gif, image/jpeg"
				on:change={({ target: { files = [] }}) => onChangeImage(files)}
			/>

			<button type="submit">Submit</button>
		</form>
	</div>

	<div class="qr-container">
		<div id="canvas" />
	</div>
</div>
