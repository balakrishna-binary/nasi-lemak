<script>
	import { onMount } from 'svelte';

	const onMountCallback = async () => {
		try {
			if (typeof window !== 'undefined') {
				const QRCodeStyling = (await import('qr-code-styling')).default;
				const { FNProperty, TextType, VCARD } = await import('vcard4');

				const full_name = new FNProperty([], new TextType('John doe'));

				const vcard = new VCARD([full_name]);
				const data = vcard.repr();

				const qrCode = new QRCodeStyling({
					width: 200,
					height: 200,
					data,
					image:
						'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
				});
				qrCode.append(document.getElementById('canvas'));
			}
		} catch (err) {
			console.error(err);
		}
	};
	onMount(onMountCallback);
</script>

<div id="canvas" />
