<footer class="layout-row">
	<section>
		<h4>Síguenos</h4>
		<p>
			<a href='http://facebook.com'><i class='icon-face-01'></i></a>
			<a href='http://facebook.com'><i class='icon-inst-01'></i></a>
			<a href='http://facebook.com'><i class='icon-pint-01'></i></a>
			<a href='http://facebook.com'><i class='icon-tw-01'></i></a>
		</p>
		<h3>Suscribete a nuestro newsletter</h3>
		<h5>Recibe ofertas y contenido exclusivo</h5>
		<form>
			<p><input type="text" name="email" placeholder="Escribe tu mail" class='default-input'/></p>
			<p><input type="submit" value='Suscribete' name="submit" class='button' /></p>
		</form>
	</section>
	<section>
		<h4>Nuestros Productos</h4>
		<ul>
			<li><a href='/collection/sillas'>Sillas</a></li>
			<li><a href='/collection/escritorios'>Escritorios</a></li>
			<li><a href='/collection/metalicos'>Metálicos</a></li>
			<li><a href='/collection/restaurantes'>Restaurantes</a></li>
			<li><a href='/collection/complementos'>Complementos</a></li>
			<li><a href='/collection/escolar'>Escolar</a></li>
			<li><a href='/collection/promociones'>Promociones</a></li>
		</ul>
	</section>
	<section>
		<h4>Métodos de Pago</h4>
		<ul>
			<li><a href='/'>Tarjetas de crédito / débito</a></li>
			<li><a href='/'>Paypal</a></li>
			<li><a href='/'>En efectivo</a></li>
		</ul>
		<p>
			<img src='/img/tarjetas.png' alt='tarjetas' />
		</p>
	</section>
</footer>

<style>
	section{
		margin-right: 126px;
	}
	footer{
		color: #5e5e5e;
		max-width: 1082px;
		margin: 0 auto;
		display: flex;
		padding: 26px 20px;
		flex-wrap: nowrap;
	}
	footer a{
		color:  #5e5e5e;
	}
	footer i{
		font-size: 28px;
		color: #A1A1A1;
		margin-right: 10px;
	}
	footer ul{
		list-style-type: none;
		padding: 0;
	}
	h4{
		font-size: 14.5px;
	}
	h3{
		font-weight: 300;
		font-size: 21px;
	}
	h5{
		font-size: 12.5px;
		font-weight: 500;
	}
	.button{
		border: none;
	}
	li{
		margin: 11px 0;
	}
	@media only screen and (max-width: 860px){
       footer{
       	  flex-wrap: wrap;
       }
	}
</style>