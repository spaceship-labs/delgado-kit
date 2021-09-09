<script context="module">
	export const prerender = true;
</script>

<script>
	import LocationList from '$lib/LocationList.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
</script>

<svelte:head>
	<title>Sucursales - Manuel Delgado</title>
</svelte:head>


<main>
	<LocationList />
	
</main>
<ContactRibbon />

<style>
	main{
		max-width: 1440px;
		margin: 0px auto;
	}
</style>