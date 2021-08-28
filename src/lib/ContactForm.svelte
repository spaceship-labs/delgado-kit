<section class="layout-row">
	<div class="col col1">
        <img src="/img/contacto.jpg" alt="contacto" >
        <div class="layout-col">
          <img src="/img/pinmap.png" alt="pinmap" >
		  <h3>Te esperamos</h3>
		  <a class="button" href="/">VER SUCURSALES</a>
	    </div>
	</div>
	<div class="col col2">
		<h4>CONTÁCTANOS</h4>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

		<form action='/'>
	      
	      <div>
	      	<img src="/img/mail.svg" alt="mail" >
		    <input type="text" name="email" placeholder="CORREO" class="default-input" />
		  </div>
		  <div>
		  	<img src="/img/telefono.svg" alt="telefono" >
		    <input type="text" name="telefono" placeholder="TELÉFONO" class="default-input" />
		  </div>

		  <input type="text" name="mensaje" placeholder="MENSAJE" class="default-input" />

		  <input type="submit" value="Enviar"  class="button" />
        </form>
	</div>
</section>





<style>
    
	section{
		/*background-image: linear-gradient(45deg, #396BC2, #688ECC, #00477D);*/
		color: white;
		padding: 9px 0 100px;
	}
	/*section div{
		max-width: 1143px;
		margin: 10px auto;
		display: flex;
		justify-content: space-between;
	}*/
	h3{
		color: white;
		font-size: 15.3px;
		line-height: 18.5px;
		font-weight: bold;
		margin-bottom: 12px;
	}
	h4{
		font-size: 15.3px;
		line-height: 18.5px;
		font-weight: bold;
		margin-bottom: 12px;
		letter-spacing: 1.6px;
	}
    
    .layout-col{
       -webkit-box-sizing: border-box;
       box-sizing: border-box;
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       
       -webkit-box-pack: start;
       -ms-flex-pack: start;
       justify-content: flex-start;

       -webkit-box-align: center;
       -ms-flex-align: center;
       align-items: center;
       -ms-flex-line-pack:center;
       align-content:center;

       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
       -ms-flex-direction: column;
       flex-direction: column;
    }
	.layout-row{
		-webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
      
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      
        -webkit-box-pack: start;
        -ms-flex-pack: start;
      
        justify-content: flex-start;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -ms-flex-line-pack: start;
        align-content: flex-start; 
	}
	.layout-row > *,
	.layout-col > *{
      max-width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
	.col2{
	   width: calc(50% - 50px);
       margin-left: 50px;
	}
	.col2 p{
		font-size: 13px;
	}
	.col2 h4, 
	.col2 p{
      color: #757575;
	}
	.col2 form .default-input{
      width: 100%;
      color: #a2a2a2;
      border-bottom: 3px solid #d8d8d8;
      font-size: 11px;
	}
	.col2 form > div{
	  position: relative;
	}
	.col2 form [name="email"],
	.col2 form [name="telefono"]{
	  padding-left: 40px;
	}
	.col2 form > div img{
      width: 25px;
      height: 25px;
      position: absolute;
      left: 2px;
      top: 0;
      bottom: 5px;
      margin: auto;
	}
	.col2 .button{
		margin-top: 20px;
	}
    
    .col1{
       position: relative;
       width: calc(50% - 50px);
       margin-right: 50px;
    }
	.col1 > img{
	   object-fit: cover;
	   position: absolute;
	   width: 100%;
	   height: 100%;

	}
	.col1 div{
		min-height: 329px;
		z-index: 1;
		position: relative;
		padding: 20px;
	}
	.col1 div img{
		width: 15px;
        height: auto;
        margin-top: 42px;
	}
	.col1 div .button{
        background-color: white;
        margin-top: 43px;
	}


	@media only screen and (max-width: 680px){
      .col1,
      .col2{
        width: calc(100%);
        margin:  0 15px 20px;
      }
	}
</style>