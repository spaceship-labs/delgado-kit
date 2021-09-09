<script>
	export let product;
    
    let productVariants = product.variants.edges.map((v) => v.node);
    let currCode = productVariants[0].priceV2.currencyCode;
    
    // obtener el mejor descuento de las variantes
    let bestDiscount = 0;
    for(let variant of productVariants){
      if(variant.compareAtPrice != null){
        let temp = (100/variant.compareAtPrice*variant.priceV2.amount).toFixed(0); 
        if(temp > bestDiscount){
          bestDiscount = temp;
        }
      }
    }



</script>
<article>
<a href="{`/product/${product.handle}`}">
    <header>
        <p class='category'>{product.productType}</p>
        {#if bestDiscount > 0}
        <p class='tag'>{bestDiscount}% de desc.</p>
        {/if }
    </header>
    <p class='center'><img src='{product.images.edges[0].node.src}' alt='{product.handle}'/></p>
    <h4>{product.title}</h4>
    
    {#if productVariants.length < 1 && productVariants[0].sku != null}
        <h5>SKU: {productVariants[0].sku}</h5>
    {/if}
    <p class='price'>
    	{#if productVariants.length > 1}
    	  <strong>{product.priceRange.minVariantPrice} {currCode} - {product.priceRange.maxVariantPrice} {currCode}</strong>
    	{:else}
          <strong>{productVariants[0].priceV2.amount} {currCode}</strong>
          {#if productVariants[0].compareAtPrice != null}
          <span class='original-price'>{productVariants[0].compareAtPrice} {currCode}</span>
          {/if}
        {/if}
    </p>
    <p class='options'>
        <a href='/' class='button mute'>Añadir al carrito </a>
        <a href='/' class='button'>Comprar ahora </a>
    </p>
  </a>
</article>
<style>
	article{
		background-color: white;
		border-radius: 20px;
		width: calc(33.33% - 17.33px);
		margin-right: 26px;
		margin-bottom: 28px;
		min-width: 410px;
	}
	article:nth-child(3n+3){
		margin-right: 0;
	}

	article header{
		display: flex;
		color: #757575;
		font-weight: bold;
		font-size: 13px;
		padding: 30px 21px 26px;
	}
	article header .category{
		flex: 1;
		text-transform: capitalize;
	}
	article header .tag{
		display: block;
		background-color: #76c082;
		color: #206a2c;
		padding: 0 17px;
		line-height: 25px;
		font-size: 11px;
		text-transform: uppercase;
		margin-top: -6px;
	}
	article img{
		max-height: 240px;
		width: auto;
		height: auto;
	}
	h4{
		font-size: 15px;
		font-weight: bold;
		color: #757575;
		line-height: 23px;
		margin: 5px 40px 0px;
	}
	h5{
		font-size: 13px;
		line-height: 20px;
		font-weight: bold;
		margin: 0 40px;
	}
	p{
		margin: 0;
	}
	.price {
	    margin: 1px 40px;
	}
	.options{
		margin: 18px 40px 35px;
	}
	.options .button{
		display: inline-block;
		font-size: 11.5px;
		padding: 12px 19px 9px;
		text-align: center;
	}
	.options .button:first-child{
		margin-right: 12px;
	}
</style>
