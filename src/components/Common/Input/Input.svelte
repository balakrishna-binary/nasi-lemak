<script>
	export let id, placeholder, label, value, error = '';
</script>

<div class={`form__group mr-1 ${error ? 'has-error' : ''}`}>
	<input type="text" class="form__input width-100" {id} {placeholder} bind:value />
	<label for="name" class="form__label">{label}</label>
	{#if !!error}
		<span class="error">{error}</span>
	{/if}
</div>
