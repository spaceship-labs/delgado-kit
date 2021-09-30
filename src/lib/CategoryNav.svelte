<nav>
	<ul>
		<li><a target="_self" href='/collection/ofertas' >Ofertas</a></li>
		<li><a target="_self" href='/collection/sillas' >Sillas</a></li>
		<li><a target="_self" href='/collection/escritorios' >Escritorios</a></li>
		<li><a target="_self" href='/collection/metalico' >Metalico</a></li>
		<li><a target="_self" href='/collection/restaurante' >Restaurante</a></li>
		<li><a target="_self" href='/collection/home-office' >Home Office</a></li>
		<li><a target="_self" href='/collection/relampago' >Relampago</a></li>
	</ul>
</nav>
<style>
	ul{
		list-style-type: none;
		display: flex;
		padding: 0;
		margin: 0 auto;
		max-width: 1059px;
	}
	li{
		margin: auto;
	}
	li a{
		display: block;
		padding: 17px 15px 18px;
		color: #757575;
		font-weight: bold;
		font-size: 16px;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1.6px;
	}
	li a.selected{
		border-bottom: 4px solid #738dc8;
		padding: 17px 0 14px;
	}
	@media only screen and (max-width: 1140px){
		nav{
			display: none;
		}
	}
</style>