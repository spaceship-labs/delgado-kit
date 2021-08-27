<script context="module">
	export const prerender = true;
</script>

<script>
	import ContactForm from '$lib/ContactForm.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
</script>

<svelte:head>
	<title>Contacto - Manuel Delgado</title>
</svelte:head>


<main>
	<ContactForm />
	
</main>
<ContactRibbon />

<style>
	main{
		max-width: 1084px;
		margin: 38px auto;
	}
</style>