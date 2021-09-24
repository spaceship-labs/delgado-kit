<script context="module">
	// export const prerender = true;

	export let handle;
    export async function load(ctx) {
    	// console.log(ctx.page.params.handle);
        handle = ctx.page.params.handle;
        return { props: { handle } };
    }

    // export async function load(ctx) {
    //     let handle = ctx.page.params.handle;
    //     await getProductDetails(handle);
    //     return { props: { productDetails } };
    // }
</script>

<script>
	import BreadCrumbs from '$lib/BreadCrumbs.svelte';
	import ProductDetail from '$lib/ProductDetail.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';

    import {getProductDetails, addToCart} from '../../../store';
    
	export let productDetails = getProductDetails(handle);
    


</script>

<svelte:head>
	<title>Producto - Manuel Delgado</title>
</svelte:head>
<main>
	<BreadCrumbs />
	{#await productDetails}
		{:then productDetails} 
	      <ProductDetail product={productDetails} addToCart={addToCart}/>
	{/await}
</main>

<ProductSlider title='Articulos recomendados' collection="Best Buys"/>
<ContactRibbon />

<style>
	main{
		max-width: 1084px;
		margin: 38px auto;
	}
</style>