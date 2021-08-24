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
<ul class='ribbon'>
	<li><i class='icon-envios-01'></i>Envíos Gratis</li>
	<li><i class='icon-devolu-01'></i>Devolución sin costo</li>
	<li><i class='icon-tarjeta-01'></i>Meses sin intereses</li>
	<li><i class='icon-garantia-01'></i>Garantía de un año</li>
</ul>
<style >	
	.ribbon{
		background-image: linear-gradient(45deg, #e08f59, #F89157, #e16d6d);
		height: 88px;
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
	}
	.ribbon li{
		padding: 13px 32px 0;
		position: relative;
		line-height: 68px;
	}
	.ribbon li i{
		font-size: 37px;
		position: relative;
		top: 4px;
		left: -9px;
		display: block;
		float: left;
	}
	.ribbon li:first-child i{
		font-size: 65px;
		line-height: 37px;
		top: 0;
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
		width: 762px;
		margin: 0 auto;
		position:  relative;
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
	}
	section .content p{
		margin-top: 17px;
	}
</style>