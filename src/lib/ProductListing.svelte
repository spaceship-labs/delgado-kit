<script>
	import ProductSummary from '$lib/ProductSummary.svelte';
	export let title;
	const products = [1,2,3,4,5,6];
</script>
<div class='container'>
	<h3 class='strike-header'><span>{title}</span></h3>
	<section>
		{#each products as product}
			<ProductSummary {product} />
		{/each}
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