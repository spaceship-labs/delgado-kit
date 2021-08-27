<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';
	import ColorPicker from '$lib/ColorPicker.svelte';
	import PolicyInfo from '$lib/PolicyInfo.svelte';
	import ProductGallery from '$lib/ProductGallery.svelte';

</script>
<main>
	<section>
		<h1>Mesa Multiusos</h1>
		<h3>SKU: AL-2627</h3>		
        
        <p class='tag'>50% de desc.</p>
        
        <p class='price'>
	        <strong>$6,128.44 mx</strong>
	        <span class='original-price'>$8,128.44 mx</span>
   		</p>
   		
   		<div class='options'>
	        <QuantityPicker />
	        <ColorPicker />
    	</div>

	    <div class='cart-options'>
	        <a href='/' class='button mute'>Añadir al carrito </a>
	        <a href='/' class='button'>Comprar ahora </a>
	    </div>

	    <PolicyInfo />
	    
	    <div class='files'>
		    <a class='button mute'>ficha tecnica</a>
		    <a class='button mute'>armado</a>
		</div>

		<div class='description'>
		    <h3>CARACTERÍSTICAS</h3>
		    <p>Las mesas multiusos son perfectas para adaptarse a cualquier situación, desde el hogar, como espacio de tareas para los estudiantes hasta las oficinas como áreas de apoyo en impresión y/o copiado, o bien, como función de retorno en los escritorios. </p>
			<p>Definitivamente aportan la versatilidad que muchas empresas necesitan.</p>
			<hr/>
			<h4>CARACTERÍSTICAS TÉCNICAS</h4>
			<ul>
				<li>Fácil de armar. No necesita herramientas.</li>
				<li>Melamina termo-fusionada de 19 mm de espesor.</li>
				<li>Cantos protegidos con chapa cinta de PVC de 1 mm de espesor.</li>
				<li>Estructura tubular calibre 20.</li>
				<li>Estructura terminada en pintura epóxica texturizada en color.</li>
				<li>Regatón nivelador de altura 100% polipropileno.</li>
			</ul>
			<hr/>
			<h4>Medidas</h4>
			<ul>
				<li>Alto: 70 cm / 27.5 in</li>
				<li>Ancho: 120 cm / 47.2 in</li>
				<li>Profundo: 60 cm / 23.6 in</li>
				<li>*Consulta colores disponibles para entrega inmediata*</li>
			</ul>
			<p class='note'>Los precios no incluyen IVA</p>
		</div>
	</section>
	<section>
		<ProductGallery />
	</section>

</main>

<style>
main{
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	justify-content: space-between;
}
section:first-child{
	width: 477px;
}	
h1{
	text-transform: uppercase;
	font-size: 31px;
	margin: 4px 0 0;
	color: #757575;
}
h3{
	font-size: 13px;
	font-weight: bold;
	margin: 0;
	line-height: 13px;
	color: #757575;
}
h4{
	color: #757575;
	text-transform: uppercase;
}
.options{
	display: flex;
}
.tag{
	margin-top: 16px;
}
.price{
	margin: 3px 0;
}
.button{
	display: inline-block;
	font-size: 11.5px;
	color: black;
	margin: 27px 12px 10px 0;
	padding: 12px 17px 9px 18px;
}

.files{
	display: flex;
	margin: 16px 0 45px;
}
.files .button{
	color: #a2a2a2;
	padding: 12px 0 13px;
	width: 162px;
	text-align: center;
}
.description{
	font-size: 13px;
}
.description p{
	margin: 6px 0 22px;
	line-height: 1.38;
}
.description ul{
	list-style-type: none;
	padding: 0;
	line-height: 1.58;
}
.description .note{
	font-size: 11px;
	font-weight: bold;
	font-style: italic;
}

</style>