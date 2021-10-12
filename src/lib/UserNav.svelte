<script>
	import { onMount } from 'svelte';
    let count = 0;
    let cart;
    onMount(() => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            count = cart.lines.edges.length;
        }
    });
</script>
<div class="holderNav layout-col orderC">
<nav >
    
    <div class="icons menu">
    	<a class='menu layout-col orderC' >
	    	<img src='/img/menu.svg' alt='carrito de compras' />
	    </a>
    </div>

    <div class="logoHolder layout-col itemsE">
	    <a href='/' class='main-logo '></a>
		<img src='/img/logo_md.png' alt='Manuel Delgado logo principal' />
    </div>

	<form><input type="text" name="product-search" placeholder="Buscar Muebles" class="default-input" /></form>
	<a class='cart ' href='/cart'>
		<img src='/img/cart.png' alt='carrito de compras' />
		<i>{count}</i>
	</a>
	<p class="user">Hola! <a href='/'>Acceder <img src='/img/user.png' alt='usuario'/></a></p>

	<div class="icons layout-row orderE itemsC">
      <div class="icon layout-col orderC">
	      <a class='search layout-col orderC' >
	    	<img src='/img/buscar.svg' alt='buscar' />
	      </a>
	  </div>

	  <div class="icon layout-col orderC">
	      <a class='cart layout-col orderC' href='/cart'>
	    	<img src='/img/cart.png' alt='carrito de compras' />
	    	<i>{count}</i>
	      </a>
	  </div>

      <div class="icon layout-col orderC">
	      <a class='user layout-col orderC' href="/" >
	    	<img src='/img/user.png' alt='usuario' />
	      </a>
	  </div>
	</div>
</nav>
</div>
<style>
	nav{
		display: flex;
		/*border-bottom: 2px solid #001a4775;*/
		margin: 0 auto;
		max-width: 1359px;
		padding: 4px 40px 0px 40px;
		background-color: #253f70;
		position: relative;
		width: 100%;
	}
	.holderNav{
		width: 100%;
		background-color: #253f70;
		border-bottom: 2px solid #001a4775;
	}
	nav a img{
      filter: invert(100%);
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
        filter: invert(100%);
	}
	nav form input::placeholder{
		color: white;
	}
	nav .cart{
		margin: 43px 75px 0 0;
		position: relative;
	}
	nav .cart i{
		font-style: normal;
		font-weight: bold;
		background-color: black;
		position: absolute;
		top: -19px;
		right: -27px;
		color: white;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: block;
		line-height: 35px;
		text-align: center;
	}
	nav p{
		font-size: 16px;
		font-weight: bold;
		color: white;
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
	.logoHolder{
		max-width: 400px;
		width: 100%;
		position: relative;
	}
	.logoHolder a{
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.logoHolder img{
       width: 100%;
       height: auto;
       margin-top: auto;
       max-height: 100px;
       object-fit: contain;
	}

	p.user{
		min-width: 155px;
	}


	.icons{
	   display: none;
	   width: 100%;
	   max-width: 40%;
	   margin-left: auto;
	   flex-wrap: nowrap;
	   padding-top: 10px;
	   padding-bottom: 10px;
	   min-width: 220px;
	}
	.icons.menu{
       min-width: unset;
       margin-left: unset;
       width: 100%;
       max-width: 50px;
	}
	.icons .icon{
		height: 50px;
		width: 50px;
		margin-left: 20px;
		border-radius: 50%;
		background-color:#E5E5E5;
	}
	.icons .icon a{
      width: 27px;
      height: 27px;
	}
	.icons img{
	   height: auto;
	   width: 30px;
	}
	nav .icons .cart{
		margin: 0;
	}
	nav .icons .cart i{
		top: -19px;
		right: -17px;
		width: 25px;
		height: 25px;
		line-height: 25px;
	}


	@media only screen and (max-width: 1140px){
       nav > .user,
       nav > .cart,
       nav > form{
       	display: none;
       }
       nav .icons{
       	display: flex;
       }
       .logoHolder img{
          margin-bottom: auto;
	   }
	   nav{
		padding: 4px 20px 0px 20px;
	   }
	}
	@media only screen and (max-width: 400px){
      nav .icons{
      	display: none;
      }
      nav .icons.menu{
      	display: flex;
      }
	}
</style>