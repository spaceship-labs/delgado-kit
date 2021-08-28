<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';
	export let product;
</script>

<article>
	<h3>{product.name}</h3>
	<section>
		<img src='{product.img}' alt='thumbnail' />
		<div class='details'>
			<p>SKU: {product.sku}</p>
			<p>{product.variant}</p>
		</div>
		<div>
			<p class='tag'>50% de desc.</p>
			<p class='price'>
			    <strong>$6,128.44 mx</strong>
			    <span class='original-price'>$8,128.44 mx</span>
			</p>
		</div>
		<div>
	        <QuantityPicker />
		</div>
	</section>
</article>

<style>
	article{
		border:  2px solid #b6b6b6;
		padding: 3px 23px 22px 41px;
		margin-bottom: 23px;
	}
	h3{
		font-size: 19.5px;
		color: #757575;
		margin: 20px 0 7px;
	}
	section{
		display: flex;
	}
	img{
		margin-right: 33px;
	}
	.details{
		font-size: 13px;
		text-transform: uppercase;
		font-weight: bold;
		line-height: 1.54;
		margin: 4px 37px 0 0;
	}
	.details p{
		margin: 0;
		color: #757575;
	}
	.tag{
		margin-bottom: 1px;
	}
	.price{
		margin: 10px 30px 0 0;
	}
</style>