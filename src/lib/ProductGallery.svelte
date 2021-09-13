<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>
<script>

	export let images;
	export let thumbs;
	export let gall;

	import { onMount } from 'svelte'
	let swiper;
	onMount(async () => {
		swiper = (await import('https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js')).default;

		thumbs = new swiper('.thumbs',{
      	// loop: true,
         spaceBetween: 10,
         slidesPerView: 6,
         freeMode: true,
         watchSlidesProgress: true,
      });
		gall = new swiper('.mainGall',{
      	slidesPerView:1,
         loop: true,
         centeredSlides: true,
         spaceBetween: 0,
         thumbs: {
          swiper: thumbs,
         },
      });

	});

	let selected = 0;
   
  
   
</script>



<section>
	

	<!-- <img src='{images[0].node.src}' alt='product 0' /> -->
	

	<div class="swiper mainGall">
		<div class="swiper-wrapper">
        {#each images as image, i}
	    	<div class="swiper-slide"><img src='{image.node.src}' alt='thumbnail-{i}' /></div>
	     {/each}
      </div>
   </div>

   <div class="swiper thumbs">
   	<div class="swiper-wrapper">
		  {#each images as image, i}
		  	<div class="swiper-slide"><img src='{image.node.src}' alt='thumbnail-{i}' /></div>
		  {/each}
	   </div>
	</div>
</section>

<style>
	section{
		margin: 11px 0;
	}
	section img{
		max-width: 553px;
		width: 100%;
		height: auto;
	}
	.thumbs{
		margin: 17px 0;
	}
	
	section .thumbs img{
		display: block;
		height: 83px;
		width:  83px;
		object-fit: cover;
		cursor: pointer;
	}
   
   .swiper{
   	max-width: 553px;
   }
   .swiper img{
      border: 3px solid rgba(0,0,0,0);
   }
   .swiper .swiper-slide-thumb-active img{
		border: 3px solid #b7b7b7;
	}
</style>