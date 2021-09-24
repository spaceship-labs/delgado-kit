<script context="module">
	export const prerender = true;
</script>

<script>
	import AboutValues from '$lib/AboutValues.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
</script>

<svelte:head>
	<title>Nosotros - Manuel Delgado</title>
</svelte:head>


<main>
	<AboutValues />
	
</main>
<ContactRibbon />

<style>
	main{
		max-width: 1440px;
		margin: 0px auto;
	}
</style>