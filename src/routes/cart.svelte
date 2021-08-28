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


	let routes = [
		{label: 'Inicio', link: '/'},
		{label: 'Carrito', link: '/cart'},
	]

	let products = [
		{
			name : 'MESA MULTIUSOS',
			sku : 'AL-2627',
			variant : 'COLOR CLARO',
			discount : '50%',
			price : '',
			discountedPrice : '',
			quantity : '8',
			img : '/img/temp/product0-mid.png'
		},
		{
			name : 'MESA MULTIUSOS',
			sku : 'AL-2627',
			variant : 'COLOR CLARO',
			discount : '50%',
			price : '',
			discountedPrice : '',
			quantity : '8',
			img : '/img/temp/product0-mid.png'
		}
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
		{#each products as product}
			<CartItem {product}/>
		{/each}
		<a href='/products' class='button mute'>añadir mas al carrito</a>	
		<PolicyInfo />	
	</section>
	<section>
		<CartSummary />
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