<script context="module">
	export const prerender = true;
</script>

<script>
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import BreadCrumbs from '$lib/BreadCrumbs.svelte';
	import ProductListing from '$lib/ProductListing.svelte';
	import ProductNav from '$lib/ProductNav.svelte';

	let routes = [
		{label: 'Inicio', link: '/'},
		{label: 'Productos', link: '/products'},
	]
	let products = [1,2,3,4,5,6,1,2,3];
</script>

<svelte:head>
	<title>Productos - Manuel Delgado</title>
</svelte:head>
<main>
	<BreadCrumbs {routes} />
	<ProductNav />
	<ProductListing {products}/>
</main>
<ContactRibbon />

<style>
	main{
		max-width: 1312px;
		margin: 20px auto;
	}
</style>