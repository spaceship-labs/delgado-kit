<script context="module">
	export const prerender = true;
</script>

<script>
	import BreadCrumbs from '$lib/BreadCrumbs.svelte';
	import ProductDetail from '$lib/ProductDetail.svelte';
</script>

<svelte:head>
	<title>Producto - Manuel Delgado</title>
</svelte:head>
<main>
	<BreadCrumbs />
	<ProductDetail />
</main>

<style>
	main{
		max-width: 1084px;
		margin: 38px auto;
	}
</style>