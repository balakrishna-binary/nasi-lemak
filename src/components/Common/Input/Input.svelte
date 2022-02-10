<script>
	export let id, placeholder, label, value;
</script>

<div class="form__group mr-1">
	<input type="text" class="form__input width-100" {id} {placeholder} bind:value />
	<label for="name" class="form__label">{label}</label>
</div>
