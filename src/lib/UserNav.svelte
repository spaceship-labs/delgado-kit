<nav>
	<img src='/img/logo.png' alt='Manuel Delgado logo principal' />
	<form><input type="text" name="product-search" placeholder="Buscar Muebles" class="default-input" /></form>
	<a class='cart' href='/carrito'>
		<img src='/img/cart.png' alt='carrito de compras' />
		<i>2</i>
	</a>
	<p>Hola! <a href='/login'>Acceder <img src='/img/user.png' alt='usuario'/></a></p>
</nav>
<style>
	nav{
		display: flex;
		border-bottom: 2px solid #E5E5E5;
		margin: 0 auto;
		max-width: 1359px;
		padding: 4px 40px 0px 40px;
	}

	nav form{
		margin-left: auto;
		padding-top: 38px;
		padding-right: 55px;
		position: relative;
	}
	nav form input{
		padding-right: 35px;
		width: 297px;
		position: relative;
	}
	nav form:after{
		content: '';
		background-image: url('/img/buscar.svg');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
		position: absolute;
		right: 65px;
		top: 45px;

	}
	nav .cart{
		margin: 43px 75px 0 0;
		position: relative;
	}
	nav .cart i{
		font-style: normal;
		font-weight: bold;
		background-color: #001a47;
		position: absolute;
		top: -19px;
		right: -27px;
		color: white;
		width: 34px;
		height: 34px;
		border-radius: 25px;
		display: block;
		line-height: 35px;
		text-align: center;
	}
	nav p{
		font-size: 16px;
		font-weight: bold;
		color: #767676;
		margin-top: 28px;
		margin-right: 70px;

	}
	nav p a{
		color: #d36e36;
	}
	nav p a img{
		position: relative;
		top: 13px;
	}
</style>