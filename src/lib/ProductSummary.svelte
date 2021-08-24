<script>
	export let product;
</script>
<article>
    <header>
        <p class='category'>Ejecutivas</p>
        <p class='tag'>50% de desc.</p>
    </header>
    <p class='center'><img src='/img/temp/product{product}.png' /></p>
    <h4>OMNIA</h4>
    <h5>SKU: AL-2627</h5>
    <p class='price'>
        <strong>$6,128.44 mx</strong>
        <span class='original-price'>$8,128.44 mx</span>
    </p>
    <p class='options'>
        <a href='/' class='button mute'>Añadir al carrito </a>
        <a href='/' class='button'>Comprar ahora </a>
    </p>
</article>
<style>
	article{
		background-color: white;
		border-radius: 20px;
		width: calc(33.33% - 17.33px);
		margin-right: 26px;
		margin-bottom: 28px;
		min-width: 410px;
	}
	article:nth-child(3n+3){
		margin-right: 0;
	}

	article header{
		display: flex;
		color: #757575;
		font-weight: bold;
		font-size: 13px;
		padding: 30px 21px 26px;
	}
	article header .category{
		flex: 1;
	}
	article header .tag{
		display: block;
		background-color: #76c082;
		color: #206a2c;
		padding: 0 17px;
		line-height: 25px;
		font-size: 11px;
		text-transform: uppercase;
		margin-top: -6px;
	}
	article img{
		max-height: 240px;
		width: auto;
		height: auto;
	}
	h3{
		margin: 28px 0 13px;
	}
	h4{
		font-size: 15px;
		font-weight: bold;
		color: #757575;
		line-height: 23px;
		margin: 5px 40px 0px;
	}
	h5{
		font-size: 13px;
		line-height: 20px;
		font-weight: bold;
		margin: 0 40px;
	}
	p{
		margin: 0;
	}
	.price{
		color: #757575;
		font-size: 20px;
		line-height: 26px;
		font-weight: bold;
		margin: 1px 40px;
	}
	.price strong{
		color: #ee524e;
	}
	.price .original-price{
		text-decoration: line-through;
		font-size:  18px;
	}
	.options{
		margin: 18px 40px 35px;
	}
	.options .button{
		display: inline-block;
		font-size: 11.5px;
		padding: 12px 19px 9px;
		text-align: center;
	}
	.options .button:first-child{
		margin-right: 12px;
	}
</style>
