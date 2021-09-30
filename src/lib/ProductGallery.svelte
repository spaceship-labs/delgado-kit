
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
         slidesPerView: 3.5,
         freeMode: true,
         watchSlidesProgress: true,
         breakpoints: {
          500: {
            slidesPerView: 6,
          },
         },
      });
		gall = new swiper('.mainGall',{
      	slidesPerView:1,
         // loop: true,
         centeredSlides: true,
         spaceBetween: 0,
         thumbs: {
          swiper: thumbs,
         },
         on: {
           afterInit: function () {
             console.log('swiper initialized');
             initZooms();
           },
         },
      });
    
    

    
	});

	let selected = 0;
  let initZooms = function() {
    // Get all images with the `detail-view` class
    var zoomBoxes = document.querySelectorAll('.detail-view');
  
    // Extract the URL
    zoomBoxes.forEach(function(image) {
      var imageCss = window.getComputedStyle(image, false),
        imageUrl = imageCss.backgroundImage
                           .slice(4, -1).replace(/['"]/g, '');
  
      // Get the original source image
      var imageSrc = new Image();
      imageSrc.onload = function() {
        var imageWidth = imageSrc.naturalWidth,
            imageHeight = imageSrc.naturalHeight;

        if(imageWidth > 3000){
          imageWidth *= 0.60;
        }
        if(imageHeight > 3000){
          imageHeight *= 0.60;
        }

        var ratio = imageHeight / imageWidth;

  
        // Adjust the box to fit the image and to adapt responsively
        var percentage = ratio * 100 + '%';
        image.style.paddingBottom = percentage;

        // console.log(image);
        // console.log(percentage+" "+imageWidth+" "+imageHeight+" "+ratio);
  
        // Zoom and scan on mousemove
        image.onmousemove = function(e) {
          // Get the width of the thumbnail
          var rect = e.target.getBoundingClientRect();
          var boxWidth = image.clientWidth,
              // Get the cursor position, minus element offset
              x = e.clientX - rect.left,
              y = e.clientY - rect.top,

              // Convert coordinates to % of elem. width & height
              xPercent = x / (boxWidth / 100) + '%',
              yPercent = y / (boxWidth * ratio / 100) + '%';
              // console.log(this);
              // console.log(e.clientX+" "+e.clientY+" "+rect.left+" "+rect.top);
              // console.log(xPercent+" "+yPercent+" "+x+" "+y);
          // Update styles w/actual size
          Object.assign(image.style, {
            backgroundPosition: xPercent + ' ' + yPercent,
            backgroundSize: imageWidth + 'px'
          });
  
        };
  
        // Reset when mouse leaves
        image.onmouseleave = function(e) {
          Object.assign(image.style, {
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          });
        };
      }
      imageSrc.src = imageUrl;
    });
  };   
</script>



<section>
	

	<!-- <img src='{images[0].node.src}' alt='product 0' /> -->
	

	<div class="swiper mainGall">
		<div class="swiper-wrapper">
        {#each images as image, i}
	    	  <div class="swiper-slide">

	    	  	<!-- <img src='{image.node.src}' alt='thumbnail-{i}' /> -->
	    	  	<div class="image-container">
              <div class="image detail-view" style="background-image: url('{image.node.src}');"></div>
            </div>
          </div>
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

  .mainGall .swiper-slide > div{
    position: relative;
  }
	.image-container {
		/*position: absolute;*/
    display: inline-block;
    padding: 1em;
    max-width: 100%;
    vertical-align: top;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .image-container:hover {
    /*background-color: #cde;*/
  }
  
  .image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: crosshair;
    display: block;
    max-width: 100%;
    padding-bottom: 10em;
    width: 100em;
     -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>