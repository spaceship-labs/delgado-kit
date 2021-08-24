<script >
	import ProductSummary from '$lib/ProductSummary.svelte';
	let products = [7,8,9]
</script>
<section>
	<h3>Nuevos diseños</h3>
	<div class='products'>
		{#each products as product}
			<ProductSummary {product}/>
		{/each}
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
