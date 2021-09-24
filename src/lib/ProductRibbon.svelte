<script>


	import { onMount } from 'svelte'
	let swiper;
	let gall;
	onMount(async () => {
		swiper = (await import('https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js')).default;

		gall = new swiper('.productGall',{
      	 slidesPerView:1.5,
      	 freeMode: true,
         loop: true,
         centeredSlides: false,
         spaceBetween: 30,
         breakpoints: {
          640: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 4.5,
          },
          1344: {
            slidesPerView: 7,
          },
         },
        });

	});

   
</script>
<section>
	<h3 class='strike-header'><span>Productos</span></h3>
	<nav class="swiper productGall">
		<div class="swiper-wrapper">

		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-16.png' alt='sillas' />
		   	 <span>Sillas</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-17.png' alt='sillas' />
		   	 <span>Escritorios</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-18.png' alt='sillas' />
		   	 <span>Metálicos</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-6.png' alt='sillas' />
		   	 <span>Promociones</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-19.png' alt='sillas' />
		   	 <span>Restaurantes</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-21.png' alt='sillas' />
		   	 <span>Escolar</span>
		    </a>
		   </div>
		   <div class="swiper-slide">
		   	<a href='/'>
		   	 <img src='/img/temp/layer-20.png' alt='sillas' />
		   	 <span>Complementos</span>
		    </a>
		   </div>

	    </div>
	</nav>
</section>
<style >
	section{
		padding-top: 29px;
		max-width: 1344px;
		margin: 0 auto;
		padding-right: 10px;
		padding-left: 10px;
	}
	nav{
		width: 100%;
	}
	/*nav{
		display: flex;
		margin-top: -4px;
	}*/
	nav a{
		display: block;
		position: relative;
		/*background-color: #a198ca;*/
		text-align: center;
		flex: 1;
		height: 116px;
		/*margin-right: 15px;*/
		border-radius: 20px;
	}
	/*nav a:last-child{
		margin-right: 0;
	}*/
	nav a img{
		position: absolute;
		bottom: 0;
		margin: 0 auto;
		left: 0;
		right: 0;
	}
	nav a span{
		position: relative;
		color: white;
		text-transform: uppercase;
		font-weight: bold;
		top: 50px;
	}
	nav .swiper-slide{
		/*min-width: 166px;
		max-width: 166px;*/
	}
	nav .swiper-slide a{
        background-color: #a198ca;
	}
	nav .swiper-slide:nth-child(7n+2) a{
		background-color: #ca98c4;
	}
	nav .swiper-slide:nth-child(7n+3) a{
		background-color: #e96473;
	}
	nav .swiper-slide:nth-child(7n+4) a{
		background-color: #f99755;
	}
	nav .swiper-slide:nth-child(7n+5) a{
		background-color: #f9c555;
	}
	nav .swiper-slide:nth-child(7n+6) a{
		background-color: #78ba54;
	}
	nav .swiper-slide:nth-child(7n+7) a{
		background-color: #00D9D1;
	}
</style>