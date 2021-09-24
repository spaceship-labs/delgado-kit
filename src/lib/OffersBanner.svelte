<section>
	<div class='content'>
		<h1>Lorem ipsum dolor sit amet. </h1>
		<h2>Desc. <strong>50%</strong></h2>
		<p><a href='/' class='button'>Comprar ahora </a></p>
		<img src='/img/temp/ad.png' alt='anncio' />
	</div>
	<nav>
		<ul>
			<li><button></button></li>
			<li><button></button></li>
			<li><button class='selected'></button></li>
		</ul>
	</nav>
</section>
<ul class='ribbon layout-row orderC'>
	<li class="layout-row orderC"><i class='icon-envios-01'></i>Envíos Gratis</li>
	<li class="layout-row orderC"><i class='icon-devolu-01'></i>Devolución sin costo</li>
	<li class="layout-row orderC"><i class='icon-tarjeta-01'></i>Meses sin intereses</li>
	<li class="layout-row orderC"><i class='icon-garantia-01'></i>Garantía de un año</li>
</ul>
<style >	
	.ribbon{
		background-image: linear-gradient(45deg, #e08f59, #F89157, #e16d6d);
		min-height: 88px;
		max-width: 1300px;
		margin: 0 auto;
		display: flex;
  		justify-content: center;
		padding: 0;
		text-transform: uppercase;
		list-style-type: none;
		color: white;
		font-weight: bold;
		font-size: 13.5px;
		flex-wrap: nowrap;
	}
	.ribbon li{
		padding: 13px 32px;
		position: relative;
		text-align: center;
		/*line-height: 68px;*/
	}
	.ribbon li i{
		font-size: 37px;
		position: relative;
		top: 4px;
		/*left: -9px;*/
		margin: 0 5px;
		display: block;
		float: left;
	}
	.ribbon li:first-child i{
		font-size: 65px;
		line-height: 37px;
		top: 0;
		/*margin-bottom: -10px;*/
	}
	nav{
		margin-top: 62px;
	}
	nav ul{
		list-style-type: none;
		padding: 0;
		display: flex;
		margin: 0 auto;
		justify-content: center;
	}
	nav ul button{
		display: block;
		background-color: white;
		width: 10px;
		height: 10px;
		margin: 0 6px;
		border-radius: 50%;
		border: none;
		padding: 0;
	}
	nav ul button.selected{
		background-color: #ffcb66;
	}

	section{
		max-width: 1300px;
		margin: 0 auto;
		padding: 22px 0;
		background-image: linear-gradient(to bottom, #738dc8, #738dc8), linear-gradient(to top, #000, #1b2952);
		height: 363px;
	}
	section .content{
		max-width: 762px;
		width: 100%;
		margin: 0 auto;
		position:  relative;
		padding-left: 20px;
		-webkit-box-sizing: border-box;
        box-sizing: border-box;
	}
	h1{
		font-size: 60px;
		line-height: 70px;
		color: white;
		font-weight: 300;
		margin: 35px 0 4px;
		max-width: 578px;
	}
	h2{
		color: #ffcb66;
		font-weight: 300;
		font-size: 45px;
		margin: 0;
	}
	h2 strong{
		font-weight: 300;
		font-size: 60px;
	}
	section .content img{
		display: block;
		position: absolute;
		right: 8px;
		top: -40px;
		z-index: 1;
	}
	section .content p{
		margin-top: 17px;
		position:relative;
		z-index: 2;
	}


	@media only screen and (max-width: 762px){
        section .content{
	    	padding-left: 20px;
	    }
	    h1{
	    	 font-size: 7vw;
             line-height: 7vw;
             margin: 4vw 0 0.4vw;
             max-width: 60vw;
	    }
	    h2{
	    	font-size: 4.5vw;
	    }
	    h2 strong{
	    	font-size: 6vw;
	    }
	    section{
	    	height: auto;
	    }
	    section .content img{
	    	right: 8vw;
            top: 8px;
            width: 30vw;
	    	height: auto;
	    }
	    section .content p{
	    	margin-top: 7vw;
	    }
	}
	@media only screen and (max-width: 600px){
       .ribbon{
       	 flex-wrap: wrap;
       }
       .ribbon > *{
       	width: 50%;
       }
	}
</style>