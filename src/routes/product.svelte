<script context="module">
	export const prerender = true;
</script>

<script>
	import BreadCrumbs from '$lib/BreadCrumbs.svelte';
	import ProductDetail from '$lib/ProductDetail.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
</script>

<svelte:head>
	<title>Producto - Manuel Delgado</title>
</svelte:head>
<main>
	<BreadCrumbs />
	<ProductDetail />
</main>

<ProductSlider title='Articulos recomendados' />
<ContactRibbon />

<style>
	main{
		max-width: 1084px;
		margin: 38px auto;
	}
</style>