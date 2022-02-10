<script>
	import Input from '../Common/Input';
	import QRCodeWrapper from '../Common/QRCodeWrapper';
	import './index.css';
	import { initialData } from './constants';
	import { generateVCard, generateQRCode } from './helpers';
  import * as Validator from '../../utils/validations';

	let data = { ...initialData };
	let base64_image;
	let QRCODE;
	let has_generated_qrcode;
	let image;

	const dragNdrop = (event) => {
		image = URL.createObjectURL(event.target.files[0]);
		const FR = new FileReader();
		FR.onloadend = async () => {
			base64_image = FR.result;
		};
		FR.readAsDataURL(event.target.files[0]);
	};

	const drag = () => {
		document.getElementById('uploadFile').classList.add('draging', 'dragBox');
	};

	const drop = () => {
		document.getElementById('uploadFile').classList.add('dragBox');
	};

	const onSubmit = async () => {
    if(!(data.email && Validator.validateEmail(data.email))) return;
    if(!(data.phone && Validator.validatePhone(data.phone))) return;
		const vcard = await generateVCard(data); // vcard v4
		const qrcode_options = {
			vcard,
			logo: base64_image,
			color: '#4267b2', //
			backgroundColor: '#ffffff' //
		};
		QRCODE = await generateQRCode(qrcode_options);

		const wrapper = document.getElementById('canvas');
		if (!wrapper) return;
		wrapper.innerHTML = '';
		QRCODE.append(wrapper);
		has_generated_qrcode = true;
	};

	const reset = () => {
		data = { ...initialData };
		base64_image = '';
	};

	$: full_name = [data.first_name, data.last_name]
		.filter((n) => n)
		.join(' ')
		.replace(/./g, '');

	const download = () => {
		QRCODE.download({
			name: full_name,
			extension: 'svg'
		});
	};
</script>

<div class="parent">
	<div class="container">
		<div class="parent-wrapper flex-row">
			<div class="form-wrapper">
				<form action="" class="width-100 d-flex jc-center ai-center flex-column">
					<div class="width-100">
						<div class="width-100 d-flex jc-center input-wrapper">
							<p class="text-center text-black">vCard QR Code</p>
						</div>
						<div class="width-100 d-flex flex-column jc-center">
							<div class="width-100 d-flex jc-center">
								{#if image}
									<div id="preview">
										<img src={image} alt="" />
									</div>
								{/if}
							</div>
							<div class="width-100 d-flex jc-center">
								<div class="uploadOuter">
									<span class="dragBox text-black">
										Drag and Drop Profile Picture
										<input
											type="file"
											on:change={(e) => dragNdrop(e)}
											on:dragover={() => drag()}
											on:drop={() => drop()}
											id="uploadFile"
										/>
									</span>
								</div>
							</div>
						</div>
						<div class="width-100 d-flex jc-center flex-row input-wrapper">
							<Input
								id="first_name"
								bind:value={data.first_name}
								placeholder="First Name"
								label="First Name"
							/>
							<Input
								id="last_name"
								bind:value={data.last_name}
								placeholder="Last Name"
								label="Last Name"
							/>
						</div>

						<div class="width-100 d-flex jc-center flex-row input-wrapper">
							<Input id="phone" bind:value={data.phone} placeholder="Phone" label="Phone" />
							<Input
								id="work_phone"
								bind:value={data.work_phone}
								placeholder="Work Phone"
								label="Work Phone"
							/>
						</div>

						<div class="width-100 d-flex jc-center input-wrapper">
							<Input id="fax" bind:value={data.fax} placeholder="Fax" label="Fax" />
						</div>

						<div class="width-100 d-flex jc-center flex-row input-wrapper">
							<Input id="email" bind:value={data.email} placeholder="Email" label="Email" />
						</div>

						<div class="width-100 d-flex jc-center flex-row input-wrapper">
							<Input id="company" bind:value={data.company} placeholder="Company" label="Company" />
							<Input
								id="designation"
								bind:value={data.designation}
								placeholder="Designation"
								label="Designation"
							/>
						</div>

						<div class="width-100 d-flex jc-center input-wrapper">
							<Input
								id="street"
								bind:value={data.address.street}
								placeholder="Street"
								label="Street"
							/>
							<Input id="zip" bind:value={data.address.zip} placeholder="Zip" label="Zip" />
						</div>

						<div class="width-100 d-flex jc-center input-wrapper">
							<Input id="state" bind:value={data.address.state} placeholder="State" label="State" />
							<Input
								id="country"
								bind:value={data.address.country}
								placeholder="Country"
								label="Country"
							/>
						</div>

						<div class="width-100 d-flex jc-center input-wrapper">
							<Input id="website" bind:value={data.website} placeholder="Website" label="Website" />
						</div>
					</div>
					<div class="width-100 d-flex flex-row jc-center ai-center m-2">
						<button class="btn btn-primary mr-1" on:click|preventDefault={onSubmit}>
							Generate
						</button>
						<button class="btn btn-secondary" on:click|preventDefault={reset}>Reset</button>
					</div>
				</form>
			</div>
			<div class="qr-code-wrapper d-flex flex-column jc-center">
				<QRCodeWrapper />
				{#if has_generated_qrcode}
					<div class="px-2 d-flex jc-center py-2">
						<button class="btn btn-primary" on:click|preventDefault={download}> download </button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
