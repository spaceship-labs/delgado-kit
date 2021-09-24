<script context="module">
	export let collection;
    export async function load(ctx) {
        collection = ctx.page.params.collection;
        
        return { props: { collection } };
    }
</script>

<script>
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import BreadCrumbs from '$lib/BreadCrumbs.svelte';
	import ProductListing from '$lib/ProductListing.svelte';
	import ProductNav from '$lib/ProductNav.svelte';

	let routes = [
		{label: 'Inicio', link: '/'},
		{label: collection, link: '/collection/'+collection},
	]

</script>

<svelte:head>
	{#await collection}
	{:then collection} 
	  <title>Collection {collection} - Manuel Delgado</title>
	{/await}
</svelte:head>
<main>
	<BreadCrumbs {routes} />
	<ProductNav />
	{#await collection}
	{:then collection} 
	  <ProductListing title="" collection={collection}/>
	  
	{/await}
</main>
<ContactRibbon />

<style>
	main{
		max-width: 1312px;
		margin: 20px auto;
	}
</style>