<form action='/'>
	<section>
		<h3>Suscribete a nuestro newsletter</h3>
		<h4>Recibe ofertas y contenido exclusivo</h4>
	</section>
	<section>
		<input type="text" name="email" placeholder="Escribe tu mail" class="default-input" />
	</section>
	<section>
		<input type="submit" value="Suscríbete"  class="button" />
	</section>
</form>
<style>
	form{
		box-sizing: border-box;
		max-width: 1308px; 
		background-image: linear-gradient(to bottom, #2f68cc, #2f68cc), linear-gradient(to top, #000, #1b2952);
		margin: 0 auto;
		color: white;
		padding: 0 127px;
		display: flex;
		padding-bottom: 41px;
	}
	form input{
		color: white;
    	border-bottom: 3px solid white;
		margin: 59px 0 0 24px;
		width: 296px;
	}
	form input::placeholder{
		color: white;
	}
	form input.button{
		color: black;
		border: none;		
		margin: 62px 0 0 15px;
		width: auto;
		padding: 11px 54px;
	}
	form h3{
		font-size: 29.5px;
		line-height: 40px;
		font-weight: 300;
		margin: 51px 27px 0 0;

	}
	form h4{
		font-weight: 500;
		font-size: 18px;
		margin: 9px 0;
	}
</style>