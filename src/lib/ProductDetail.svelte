<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';
	import ColorPicker from '$lib/ColorPicker.svelte';
	import PolicyInfo from '$lib/PolicyInfo.svelte';
	import ProductGallery from '$lib/ProductGallery.svelte';
    
  export let product;
  export let addToCart;

  // console.log(product);


  function getId(url) {
    const regExp = /^.*(www.youtube.com\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    let temp =  (match && match[2].length === 11) ? match[2] : null;
    console.log(temp);
    return temp;
  }

  let qty = 1;
  let productVariants = [];
  let productMetas = [];
  let armado = null;
  let ficha = null;
  let video = null;
  let selectedProduct;
  let selected = 0;
  let currCode;
  let gall;

  if(product != null){
    productVariants = product.variants.edges.map((v) => v.node);
    selectedProduct = productVariants[0].id;
    currCode = productVariants[0].priceV2.currencyCode;
    productMetas = product.metafields.edges.map((v) => v.node);
    for(let meta of productMetas){
      if(meta.key == 'ficha_tecnica4' && meta.value != null && meta.value != ''){
      	ficha = meta.value;
      }
      if(meta.key == 'armado2' && meta.value != null && meta.value != ''){
      	armado = meta.value;
      }
      if(meta.key == 'video' && meta.value != null && meta.value != ''){
      	video = meta.value;
      }
    }
  }

  
  // obtener el mejor descuento de las variantes
  let bestDiscount = 0;
  let bestVariant = {};
  for(let variant of productVariants){
    if(variant.compareAtPrice != null){
      let temp = 100-(100/variant.compareAtPrice*variant.priceV2.amount).toFixed(0); 
      if(temp >= bestDiscount){
        bestDiscount = temp;
        bestVariant = {"amount":variant.priceV2.amount,"compare": variant.compareAtPrice};
      }
    }
  }

  let getDiscount = function(num){
    let variant = productVariants[num];

    if(variant.compareAtPrice != null){
      let temp = 100-(100/variant.compareAtPrice*variant.priceV2.amount).toFixed(0); 
      return temp;
    }
    else{
    	return 0;
    }
    
  }

  
  console.log(video);
</script>
<main class="layout-row">
	{#if product != null}
	<section class="galleryHolder">
		<h1 class="sm">{product.title}</h1>
		<ProductGallery bind:gall={gall} images={product.images.edges}/>
    
    {#if video != null}

		<div class="videoHolder">
			<iframe id="player" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/{getId(video)}?enablejsapi=1"
       frameborder="0"></iframe>
		</div>
		{/if}
	</section>

	<section class="infoHolder">
		<h1 class="lg">{product.title}</h1>

		    {#if productVariants[selected].sku != null && productVariants[selected].sku != ''}
          <h3>SKU: {productVariants[selected].sku}</h3>
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
   		
   		<div class='options layout-row'>
   			  {#if productVariants[selected].quantityAvailable > 0}
	          <QuantityPicker   bind:qty={qty} max={productVariants[selected].quantityAvailable}/>
	        {:else}
	          <h4>Sin Inventario</h4> 
	        {/if}
	        {#if productVariants.length > 1 }
	          <ColorPicker bind:gall={gall} bind:selected={selected} bind:qty={qty} images={product.images.edges} variants={productVariants} />
	        {/if}
    	</div>

	    <div class='cart-options'>
	        <a id="addToCart" 
	           on:click="{()=>{addToCart(productVariants[selected].id,qty)}}" 
	           class='button mute'>Añadir al carrito </a>
	        <!-- <a href='/' class='button'>Comprar ahora </a> -->
	    </div>

	    <PolicyInfo />
	    
	    
	    <div class='files'>
	    	{#if ficha != null}
		      <a href='{ficha}' download target="_blank" class='button mute'>ficha tecnica</a>
		    {/if}
		    {#if armado != null}
		      <a href='{armado}' download  target="_blank" class='button mute'>armado</a>
		    {/if}
		  </div>
		  

		<div class='description' >
		    {@html product.descriptionHtml}
			<!-- <p class='note'>Los precios no incluyen IVA</p> -->
		</div>

	</section>
  {#if video != null}
	<div class="sm videoSpace"></div>
	{/if}
	
  {/if}
</main>

<style>
.sm{
	display: none;
}
main{
	display: flex;
	flex-wrap: wrap;
}
section.galleryHolder{
	width: 50%;
	padding-left: 20px;
	padding-right: 20px;
}	
section.infoHolder{
	width: 50%;
	padding-left: 20px;
	padding-right: 20px;
}
.videoHolder{
	width: 100%;
	padding-bottom: 60%;
	position: relative;
	margin-top: 40px;
}
.videoHolder iframe{
	width: 100%;
  height: 100%;
  position: absolute;
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
	padding-top: 10px;
	padding-bottom: 10px;
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
@media only screen and (max-width: 860px){
	.sm{
		display: flex;
	}
	.lg{
		display: none;
	}
  section.galleryHolder{
  	width: 100%;
  	padding-left: 20px;
  	padding-right: 20px;
  }	
  section.infoHolder{
  	width: 100%;
  	padding-left: 20px;
  	padding-right: 20px;
  }
  .videoHolder{
  	width: calc(100% - 40px );
  	padding-bottom: 60%;
  	position: absolute;
  	bottom: 0;
  	left: 0;
  	margin-right: 20px;
  	margin-left: 20px;
  }
  .videoHolder iframe{
  	width: 100%;
    height: 100%;
    position: absolute;
  }
  main{
  	position: relative;
  }
  .videoSpace{
  	height: 64vw;
  	width: 100%;
  }
}

</style>