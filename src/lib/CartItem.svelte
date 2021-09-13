<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';

	export let product;
	export let removeFromCart;
	export let updateCart;
	export let clicked = false;

	let loading = false;
	let update;

	$: if (qty) {
	  if(clicked && loading == false){
	  	// clicked = false;
	  	clearInterval(update);
	  	update = setTimeout(()=>{
	  	  loading = true
          updateCart(product.node.id,product.node.merchandise.id,qty);
        },300);
	  	// loading = true;
        
      } 
    }
    
    export let qty = product.node.quantity;
    let currencyCode = product.node.merchandise.priceV2.currencyCode;
    
    let discount = 0;
    if(product.node.merchandise.compareAtPrice != null){
      discount = (100/product.node.merchandise.compareAtPrice*product.node.merchandise.priceV2.amount).toFixed(0); 
    }
</script>

<article>
	<h3>{product.node.merchandise.product.title}</h3>
	<section>
		<img src='{product.node.merchandise.image.src}' alt='thumbnail' />
		<div class='details'>
			<!-- <p>SKU: {product.sku}</p> -->
			<p>{product.node.merchandise.title}</p>
		</div>
		<div>
			{#if discount > 0}
			<p class='tag'>{discount}% de desc.</p>
			{/if}
			<p class='price'>
			    <strong>${product.node.merchandise.priceV2.amount} - {currencyCode}</strong>
			    {#if discount > 0}
			      <span class='original-price'>${product.node.merchandise.compareAtPrice} - {currencyCode}</span>
			    {/if}
			</p>
		</div>
		<div>
	        <QuantityPicker bind:disable={loading} bind:clicked={clicked} bind:qty={qty} max={product.node.merchandise.quantityAvailable} />
		</div>
		<div class="remove">
			<button on:click="{ () => { removeFromCart(product.node.id) }}">X</button>
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
		height: 100px;
		widows: 100px;
		object-fit: cover;
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
	.remove{
        padding-top: 33px;  
        margin-left: 20px;
	}
	.remove button{
		border: 2px solid #B7B7B7;
		width: 46px;
		text-align: center;
		font-size: 30px;
		line-height: 20px;
		margin: 0;
		padding: 0 12px;
		height: 43px;
		border-radius: 0;
	}
</style>