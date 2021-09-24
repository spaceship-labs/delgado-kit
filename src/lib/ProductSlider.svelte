<script >


	import ProductCard from '$lib/ProductCard.svelte';
    import {getProducts,getCollection} from '../../store';

	export let title;
    // export let products = getProducts();
    export let collection = null;
    
    //si no recibe collection, regresa todos los productos
    export let coll = getCollection(collection);


    import { onMount } from 'svelte'
	let swiper;
	let gall;
	onMount(async () => {
		swiper = (await import('https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js')).default;

		gall = new swiper('.productsSlider',{
      	 slidesPerView:1,
         loop: false,
         centeredSlides: false,
         spaceBetween: 30,
         breakpoints: {
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1344: {
            slidesPerView: 3,
          },
         },
        });

	});
</script>
<section>
	{#if title}
		<h3>{title}</h3>
	{/if}
	<div class='products productsSlider swiper'>
	  <div class="swiper-wrapper">
		<!-- {#each products as product}
			<ProductSummary {product}/>
		{/each} -->
		{#await coll}
		{:then coll} 
		  {#each coll.products.edges as product}
		     <div class="swiper-slide">
		  	   <ProductCard product={product.node} classes="full" />
		  	 </div>
		  {/each}
		{/await}
	  </div>
	</div>
</section>
<style>
	section{
		width: 100%;
		margin: 46px auto;
		padding: 30px 0 3px;		
		box-sizing: border-box;
		position: relative;
	}
	section:before{
		width: 100%;
		height: 415px;
		position: absolute;
		top: 0;
		content: '';
		background-image: linear-gradient(to left, #e16d6d, #e08f59), linear-gradient(to left, #001a47, #001a47);
		z-index: 0;

	}
	.products{
		display: flex;
		max-width: 1311px;
		margin: 0 auto;
		z-index: 1;
		position: relative;
		padding-right: 10px;
		padding-left: 10px;
	}
	h3{
		color: white;
		text-transform: uppercase;
		font-size: 20px;
		letter-spacing: 1.5px;
		margin: 8px auto 39px;
		max-width: 660px;
		display: block;
		text-align: center;
		z-index: 1;
		position: relative;
	}
</style>
