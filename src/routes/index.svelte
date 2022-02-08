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

	const dragNdrop = (event) => {
		var fileName = URL.createObjectURL(event.target.files[0]);

		var preview = document.getElementById("preview");
		preview.setAttribute("style", "margin-top: 24px;width: 150px; height: 150px; border-radius: 50%;display: flex; justify-content:center; align-items:center;");

		var previewImg = document.createElement("img");
		previewImg.setAttribute("style", "height: 100%;");
		previewImg.setAttribute("src", fileName);
		preview.innerHTML = "";
		preview.appendChild(previewImg);
	}
	const drag = () =>{
	document.getElementById("uploadFile").classList.add("draging","dragBox");
	}
	const drop = () => {
	document.getElementById("uploadFile").classList.add("dragBox");
	}
</script>

<div class="parent">
<div class="container">
	<div class="parent-wrapper flex-row">
	  <div class="form-wrapper">
		<form
		  action=""
		  class="width-100 d-flex jc-center ai-center flex-column"
		>
		  <div class="width-100">
			<div class="width-100 d-flex jc-center input-wrapper">
			  <p class="text-center text-black">vCard QR Code</p>
			</div>

			<div class="width-100 d-flex flex-column jc-center">
			  <div class="width-100 d-flex jc-center">
				<div id="preview"></div>
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
			  <div class="form__group mr-1">
				<input
				  type="text"
				  class="form__input width-100"
				  id="name"
				  placeholder="Full Name"
				/>
				<label for="name" class="form__label">Full Name</label>
			  </div>
			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="last_name"
				  placeholder="Last Name"
				/>
				<label for="name" class="form__label">Last Name</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center flex-row input-wrapper">
			  <div class="form__group mr-1">
				<input
				  type="text"
				  class="form__input width-100"
				  id="mobile"
				  placeholder="Mobile"
				/>
				<label for="name" class="form__label">Mobile</label>
			  </div>
			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="phone"
				  placeholder="Phone"
				/>
				<label for="name" class="form__label">Phone</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center input-wrapper">
			  <div class="form__group">
				<input
				  type="number"
				  class="form__input width-100"
				  id="fax"
				  placeholder="FAX"
				/>
				<label for="name" class="form__label">FAX</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center flex-row input-wrapper">
			  <div class="form__group">
				<input
				  type="email"
				  class="form__input width-100"
				  id="email"
				  placeholder="Email"
				/>
				<label for="name" class="form__label">Email</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center flex-row input-wrapper">
			  <div class="form__group mr-1">
				<input
				  type="text"
				  class="form__input width-100"
				  id="company"
				  placeholder="Company"
				/>
				<label for="name" class="form__label">Company</label>
			  </div>
			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="job"
				  placeholder="Job"
				/>
				<label for="name" class="form__label">Job</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center input-wrapper">
			  <div class="form__group mr-1">
				<input
				  type="text"
				  class="form__input width-100"
				  id="street"
				  placeholder="Street"
				/>
				<label for="name" class="form__label">Street</label>
			  </div>

			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="zip"
				  placeholder="Zip"
				/>
				<label for="name" class="form__label">Zip</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center input-wrapper">
			  <div class="form__group mr-1">
				<input
				  type="text"
				  class="form__input width-100"
				  id="state"
				  placeholder="State"
				/>
				<label for="name" class="form__label">State</label>
			  </div>
			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="country"
				  placeholder="Country"
				/>
				<label for="name" class="form__label">Country</label>
			  </div>
			</div>

			<div class="width-100 d-flex jc-center input-wrapper">
			  <div class="form__group">
				<input
				  type="text"
				  class="form__input width-100"
				  id="website"
				  placeholder="Website"
				/>
				<label for="name" class="form__label">Website</label>
			  </div>
			</div>
		  </div>
		  <div class="width-100 d-flex flex-row jc-center ai-center m-2">
			<button class="btn btn-primary mr-1">Generate</button>
			<button class="btn btn-secondary">Reset</button>
		  </div>
		</form>
	  </div>
	  <div class="qr-code-wrapper d-flex flex-column jc-center">
		<div class="width-100 d-flex flex-column jc-center">
		  <div class="width-100 d-flex jc-center">
			<div class="dummy-img-wrapper">
				<div id="canvas" />
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</div>

<style>
	*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-size: 62, 5%;
}

.parent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Roboto", sans-serif;
  overflow: auto;
}

/* utilities */
.width-100 {
  width: 100%;
}
.width-50 {
  width: 50%;
}
.width-60 {
  width: 60%;
}
.width-40 {
  width: 40%;
}
.d-flex {
  display: flex;
}
.jc-center {
  justify-content: center;
}
.ai-center {
  align-items: center;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.p-1 {
  padding: 1rem;
}
.p-2 {
  padding: 2rem;
}
.p-3 {
  padding: 3rem;
}
.p-4 {
  padding: 4rem;
}
.px-1 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-2 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.px-3 {
  padding-left: 3rem;
  padding-right: 3rem;
}
.px-4 {
  padding-left: 4rem;
  padding-right: 4rem;
}
.m-1 {
  margin: 1rem;
}
.m-2 {
  margin: 2rem;
}
.m-3 {
  margin: 3rem;
}
.m-4 {
  margin: 4rem;
}
.mr-1 {
  margin-right: 1rem;
}
.mr-2 {
  margin-right: 2rem;
}
.mr-3 {
  margin-right: 3rem;
}
.mr-4 {
  margin-right: 4rem;
}
.mb-1 {
  margin-bottom: 1rem;
}
.mx-1 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mx-2 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.mx-3 {
  margin-left: 3rem;
  margin-right: 3rem;
}
.mx-4 {
  margin-left: 4rem;
  margin-right: 4rem;
}
.mx-auto {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.form__label {
  font-size: 12px;
  margin-left: 4px;
  margin-top: 4px;
  color: #8e8e8e;
  margin-bottom: 6px;
  display: block;
  transition: all 0.3s;
  transform: translateY(0rem);
}
.form__group {
  width: 100%;
  margin: 0 8px;
  padding: 0 8px;
  overflow: hidden;
}
.form__input {
  color: #333;
  font-size: 14px;
  margin: 0 auto;
  padding: 10px 16px;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: -webkit-fill-available;
  display: flex;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
}

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(-4rem);
  transform: translateY(-4rem);
}

/* utilities ends */

.container {
  width: auto;
  box-shadow: 0px 5px 40px rgb(0 0 0 / 40%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
}
.parent-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f2f0;
  border: 1px solid rgba(167, 167, 167, 0.7);
  border-top-color: rgba(167, 167, 167, 0.5);
  padding: 16px 24px;
}
.form-wrapper {
  width: 60%;
}
.qr-code-wrapper {
  height: 100%;
  width: 40%;
}

.uploadOuter {
  text-align: center;
  padding: 20px;
}
.uploadOuter strong {
  padding: 0 10px;
}
.dragBox {
  width: 250px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  font-weight: bold;
  line-height: 95px;
  color: #999;
  border: 2px dashed #ccc;
  display: inline-block;
  transition: transform 0.3s;
}
.dragBox input[type="file"] {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}
.draging {
  transform: scale(1.1);
}
#preview {
  text-align: center;
  overflow: hidden;
}
.preview_img_wrapper {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.input-wrapper {
  margin-top: 4px;
  align-items: center;
  height: 100%;
}
.text-black {
  color: black;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.dummy-img-wrapper {
  width: 300px;
  height: 300px;
}
@media only screen and (max-width: 992px) {
  .container {
    width: 95%;
  }

  .parent-wrapper {
    flex-direction: column !important;
  }

  .form-wrapper {
    width: 100%;
  }
  .qr-code-wrapper {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
}

</style>