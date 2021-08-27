<script context="module">
	export const prerender = true;
</script>

<script>
	import BreadCrumbs from	'$lib/BreadCrumbs.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import PolicyInfo from '$lib/PolicyInfo.svelte';


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
		
	</section>
	<section>
		
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
		max-width: 1153px;
		margin: 10px auto;
	}
</style>