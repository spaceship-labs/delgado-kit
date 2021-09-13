<script context="module">
	export const prerender = true;
</script>

<script>
	import BreadCrumbs from	'$lib/BreadCrumbs.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import PolicyInfo from '$lib/PolicyInfo.svelte';
	import CartItem from '$lib/CartItem.svelte';
	import CartSummary from '$lib/CartSummary.svelte';

	import {removeFromCart, updateCart} from '../../store';

	import { onMount } from 'svelte';

	import { tick } from "svelte";
    
    let done = false;
    let cart;
    let cartItems = [];
    onMount(() => {
        // get cart details from localStorage
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        cartItems = cart.lines.edges;

    });


	let routes = [
		{label: 'Inicio', link: '/'},
		{label: 'Carrito', link: '/cart'},
	]
    


</script>

<svelte:head>
	<title>Carrito - Manuel Delgado</title>
</svelte:head>
<nav>
	<BreadCrumbs {routes} />
</nav>
<main>
	<section>
		{#if cart != null}
		  {#each cartItems as product}
			<CartItem  product={product} removeFromCart={removeFromCart} updateCart={updateCart}/>
		  {/each}

		{/if}
		<a href='/products' class='button mute'>añadir mas al carrito</a>	
		<PolicyInfo />	
	</section>
	<section>
		{#if cart != null}
		  <CartSummary estimated={cart.estimatedCost} items={cartItems.length} checkout={cart.checkoutUrl} />
		{/if}
	</section>
</main>
<ProductSlider />
<ContactRibbon />

<style>
	nav{
		max-width: 1084px;
		margin: 38px auto;
	}
	main{
		display: flex;
		max-width: 1350px;
		margin: 0 auto;
		justify-content: space-between;
	}
	.button{
		display: inline-block;
		margin: 31px 0 27px;
		width: 236px;
		text-align: center;
		font-size: 11.5px;
		padding: 13px 0 8px;
	}
	section{
		margin-bottom: 33px;
	}
</style>