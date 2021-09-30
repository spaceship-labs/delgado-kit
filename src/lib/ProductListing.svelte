<script>
	import ProductCard from '$lib/ProductCard.svelte';
    import {getProducts,getCollection} from '../../store';
    import { onMount } from 'svelte';

	export let title;
    // export let products = getProducts();
    export let collection = null;
    
    //si no recibe collection, regresa todos los productos

    export let coll;
    
    coll = getCollection(collection);

    
    

</script>

<div class='container'>
	{#if title}
		<h3 class='strike-header'><span>{title}</span></h3>
	{/if}

	<section class="layout-row orderS itemsS">
		{#if coll}
		{#await coll}
		{:then coll} 
		  {#each coll.products.edges as product}
		  	 <ProductCard product={product.node} />
		  {/each}
		{/await}
		{/if}
	</section>

	
</div>
<style>
	.container{
		padding-top: 29px;
		max-width: 1312px;
		margin: 0 auto;
	}
	section{
		display: flex;
		flex-wrap: wrap;
	}
	
</style>