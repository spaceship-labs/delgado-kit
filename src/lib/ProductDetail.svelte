<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';
	import ColorPicker from '$lib/ColorPicker.svelte';
	import PolicyInfo from '$lib/PolicyInfo.svelte';
	import ProductGallery from '$lib/ProductGallery.svelte';
    
  export let product;
  export let addToCart;

  console.log(product);

  let qty = 1;
  let productVariants = [];
  let selectedProduct;
  let selected = 0;
  let currCode;
  let gall;

  if(product != null){
    productVariants = product.variants.edges.map((v) => v.node);
    selectedProduct = productVariants[0].id;
    currCode = productVariants[0].priceV2.currencyCode;
  }
  
  // obtener el mejor descuento de las variantes
  let bestDiscount = 0;
  let bestVariant = {};
  for(let variant of productVariants){
    if(variant.compareAtPrice != null){
      let temp = (100/variant.compareAtPrice*variant.priceV2.amount).toFixed(0); 
      if(temp >= bestDiscount){
        bestDiscount = temp;
        bestVariant = {"amount":variant.priceV2.amount,"compare": variant.compareAtPrice};
      }
    }
  }

  let getDiscount = function(num){
    let variant = productVariants[num];

    if(variant.compareAtPrice != null){
      let temp = (100/variant.compareAtPrice*variant.priceV2.amount).toFixed(0); 
      return temp;
    }
    else{
    	return 0;
    }
    
  }

  // console.log(productVariants);
</script>
<main>
	{#if product != null}
	<section>
		<h1>{product.title}</h1>

		    {#if productVariants[0].sku != null}
          <h3>SKU: {productVariants[0].sku}</h3>
        {/if}
        
        {#if getDiscount(selected) > 0}
          <p class='tag'>{getDiscount(selected)}% de desc.</p>
        {/if }
        
        <p class='price'>
          <strong>{productVariants[selected].priceV2.amount} {currCode}</strong>
          {#if productVariants[selected].compareAtPrice != null}
          <span class='original-price'>{productVariants[selected].compareAtPrice} {currCode}</span>
          {/if}
   		</p>
   		
   		<div class='options'>
	        <QuantityPicker   bind:qty={qty} max={productVariants[selected].quantityAvailable}/>
	        {#if productVariants.length > 0 }
	          <ColorPicker bind:gall={gall} bind:selected={selected} bind:qty={qty} images={product.images.edges} variants={productVariants} />
	        {/if}
    	</div>

	    <div class='cart-options'>
	        <a id="addToCart" href="#"
	           on:click="{()=>{addToCart(productVariants[selected].id,qty)}}" 
	           class='button mute'>Añadir al carrito </a>
	        <!-- <a href='/' class='button'>Comprar ahora </a> -->
	    </div>

	    <PolicyInfo />
	    
	    <div class='files'>
		    <a href='/' class='button mute'>ficha tecnica</a>
		    <a href='/' class='button mute'>armado</a>
		</div>

		<div class='description'>
		    {product.description}
			<p class='note'>Los precios no incluyen IVA</p>
		</div>
	</section>
	<section>
		<ProductGallery bind:gall={gall} images={product.images.edges}/>
	</section>
  {/if}
</main>

<style>
main{
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	justify-content: space-between;
}
section:first-child{
	width: 477px;
}	
h1{
	text-transform: uppercase;
	font-size: 31px;
	margin: 4px 0 0;
	color: #757575;
}
h3{
	font-size: 13px;
	font-weight: bold;
	margin: 0;
	line-height: 13px;
	color: #757575;
}
h4{
	color: #757575;
	text-transform: uppercase;
}
.options{
	display: flex;
}
.tag{
	margin-top: 16px;
}
.price{
	margin: 3px 0;
}
.button{
	display: inline-block;
	font-size: 11.5px;
	color: black;
	margin: 27px 12px 10px 0;
	padding: 12px 17px 9px 18px;
}

.files{
	display: flex;
	margin: 16px 0 45px;
}
.files .button{
	color: #a2a2a2;
	padding: 12px 0 13px;
	width: 162px;
	text-align: center;
}
.description{
	font-size: 13px;
}
.description p{
	margin: 6px 0 22px;
	line-height: 1.38;
}
.description ul{
	list-style-type: none;
	padding: 0;
	line-height: 1.58;
}
.description .note{
	font-size: 11px;
	font-weight: bold;
	font-style: italic;
}

</style>