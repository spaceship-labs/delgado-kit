<script>
	export let product;
	export let classes = "";
	
    let productVariants = product.variants.edges.map((v) => v.node);
    let currCode = product.priceRange.maxVariantPrice.currencyCode;
    
    // obtener el mejor descuento de las variantes
    let bestDiscount = 0;
    let bestVariant = {"amount":productVariants[0].price,"compare": null};
    for(let variant of productVariants){
      if(variant.compareAtPrice != null){
        let temp = 100-(100/variant.compareAtPrice*variant.price).toFixed(0); 
        if(temp >= bestDiscount){
          bestDiscount = temp;
          bestVariant = {"amount":variant.price,"compare": variant.compareAtPrice};
        }
      }
    }


</script>
<article class="{classes}">
<a href="{`/product/${product.handle}`}"  target="_self">
    <header class="layout-row orderC">
        <p class='category'>{product.productType}</p>
        {#if bestDiscount > 0}
        <p class='tag'>{bestDiscount}% de desc.</p>
        {/if }
    </header>
    <p class='center'><img src='{product.images.edges[0].node.src}' alt='{product.handle}'/></p>
    <h4>{product.title}</h4>
    
    {#if productVariants.length == 1 && productVariants[0].sku != null}
        <h5>SKU: {productVariants[0].sku}</h5>
    {/if}
    <p class='price'>
    	{#if productVariants.length > 1}
    	  {#if product.priceRange.minVariantPrice.amount != product.priceRange.maxVariantPrice.amount}
    	    <strong>{product.priceRange.minVariantPrice.amount} {currCode} - {product.priceRange.maxVariantPrice.amount} {currCode}</strong>
    	  {:else}
    	    <strong>{bestVariant.amount} {currCode}</strong>
            {#if bestVariant.compare != null}
            <span class='original-price'>{bestVariant.compare} {currCode}</span>
            {/if}
    	  {/if}
    	{:else}
          <strong>{productVariants[0].price} {currCode}</strong>
          {#if productVariants[0].compareAtPrice != null}
          <span class='original-price'>{productVariants[0].compareAtPrice} {currCode}</span>
          {/if}
        {/if}
    </p>
    <p class='options layout-row orderC'>
        <a href='{`/product/${product.handle}`}' class='button mute'>Añadir al carrito </a>
        <a href='/' class='button'>Comprar ahora </a>
    </p>
  </a>
</article>
<style>
	article{
		background-color: white;
		border-radius: 20px;
		width: calc(33.33% - 20px);
		margin-right: 10px;
		margin-left: 10px;
		margin-bottom: 28px;
		/*min-width: 410px;*/
	}
	article.full{
		width: 100%!important;
		margin-right: 0!important;
        margin-left: 0!important;
        min-height: 460px;
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
		width: 50%;
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
		width: 50%;
		max-width: 120px;
	}
	article img{
		max-height: 240px;
		max-width: 100%;
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
		margin: 8px 26px 25px;
	}
	.options .button{
		display: inline-block;
		font-size: 11.5px;
		padding: 12px 19px 9px;
		text-align: center;
		margin: 10px 3px;
		width: 100%;
		max-width: 170px;
	}

	@media only screen and (max-width: 820px){
      article{
		width: calc(50% - 40px);
		margin-right: 20px;
		margin-left: 20px;
	  }
	  article header .tag{
		line-height:15px;
	  }
	}
	@media only screen and (max-width: 630px){
      article header{
		padding: 30px 10px 26px;
	  }
	  .options{
		margin: 8px 10px 25px;
	  }
	  h4{
		margin: 5px 10px 0px;
		text-align: center;
	   }
	   .price {
	    margin: 1px 10px;
	    text-align: center;
	   }
	}
	@media only screen and (max-width: 400px){
       article{
		width: calc(100% - 40px);
		margin-right: 20px;
		margin-left: 20px;
	  }
	}
	
</style>
