<section class="layout-col order-center">
    <div class="bannerHolder layout-col">
        <img src="/img/md-about.svg" alt="about us" >
        <div class="bannerRibbon layout-row order-center">
             <div class="layout-row order-center">
                 <img src="/img/CALIDAD-01.svg" alt="calidad" >
                 <h3>Calidad</h3>
             </div>
             <div class="layout-row order-center">
                 <img src="/img/SEGURIDAD-01.svg" alt="calidad" >
                 <h3>Seguridad</h3>
             </div>
             <div class="layout-row order-center">
                 <img src="/img/SERVICIO-01.svg" alt="calidad" >
                 <h3>Servicio post-venta</h3>
             </div>
        </div>
    </div>
    <div class="textHolder layout-row">
	  <div class="col col1">
     
        <h3>"una empresa que entiende los espacios de trabajo como algo más que la disposición de muebles de oficina"</h3>

	  </div>
	  <div class="col col2">
		<h4>Filosofía</h4>
        <p>Llegamos al inicio del tercer milenio con la creciente globalización y competitividad de los negocios. Por eso nos propusimos establecer la filosofía de nuestra organización y un plan estratégico con el objeto de seguir participando en el mercado regional con un crecimiento continuo y desarrollando juntos la cultura del trabajo.</p>
		
	  </div>

      <div class="col col3">
        <h4>Visión</h4>
        <p>Ser empresa líder y solida en constante crecimeinto dentro del mercado Nacional, nuestro sello será el compromiso y el trabajo en equipo de directivos y colaboradores, para lograr la más alta calidad utilizando tecnología de información vanguardista a sus servicio.</p>
        
      </div>

      <div class="col col4">
        <h4>Misión</h4>
        <p>en DELGADO Y COMPAÑIA los directivos y colaboradores somos el capital más valioso de la Empresa, y nos comprometemos a cumplir responsablemente nuestra misión; trabajando en equipo, propiciando un ambiente agradable, con actitud de servicio y trato personalizado, con el propósito dirme de ofrecer a cada persona (cliente) que desempeña sus labores de trabajo en una oficina: Mobiliario con Cualidades y Diseños prácticos para crear entornos productivos, confortables y estéticos, Optimización de espacios e Inversión duradera apoyando con productos de reconocido prestigio y de la más alta calidad, respaldados con nuestros servicios de garantía. Con el objeto de lograr su satisfacción total; Brindándoles ¡El precio más Delgado del Mercado!</p>
      </div>
    </div>
</section>





<style>
    
	section{
		padding: 0 0 0 40px;
	}
	
	h2{
		font-size: 31px;
		line-height: 34px;
		font-weight: bold;
		margin-bottom: 46px;
		margin-top: 53px;
		letter-spacing: 1.6px;
		text-transform: uppercase;
		color: #757575;
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
    .order-center{
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-line-pack:center;
      align-content:center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .bannerHolder{
        background-color: white;
        width: 100%;
    }
    .bannerHolder > img{
        width: 90%;
        max-width: 500px;
        height: auto;
        margin: 0 40px;
    }
    .bannerHolder .bannerRibbon{
        background-image: linear-gradient(45deg, #396BC2, #688ECC, #00477D);
        padding: 9px 0 3px;
        min-height: 100px;
        width: 100%;
    }
    .bannerHolder .bannerRibbon div{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .bannerHolder .bannerRibbon div img{
        height: 50px;
        width: 50px;
    }
    .bannerHolder .bannerRibbon h3{
        font-size: 18px;
        line-height: 20px;
        font-weight: bold;
        margin: 0 20px 0 10px;
        letter-spacing: 1.6px;
        text-transform: uppercase;
        color: white;
    }

    .textHolder{
        max-width: 800px;
        width: 100%;
    }
    .textHolder h4{
       font-size: 18px;
       line-height: 20px;
       font-weight: bold;
       margin-bottom: 12px;
       margin-top: 0px;
       letter-spacing: 1.6px;
       text-transform: uppercase;
       color: #757575;
    }
    .textHolder p{
       font-size: 13px;
       line-height: 18px;
       color: #757575;
    }

    .col{
        padding: 40px 20px;
    }
	.col1{
	   width: 100%;
	}
    .col1 h3{
       font-size: 22px;
       line-height: 24px;
       font-weight: bold;
       margin-bottom: 12px;
       margin-top: 0px;
       letter-spacing: 1.6px;
       text-transform: uppercase;
       color: #757575;
       text-align: center;
    }
    .col2{
       width: 50%;
    }
    .col3{
       width: 50%;
    }
    .col4{
       border-top: 2px solid #e4e4e4;
       width: 100%;
    }
	


    @media only screen and (max-width: 960px){
       .col2{
          width: 100%;
       }
       .col3{
          width: 100%;
       }
    }
	@media only screen and (max-width: 500px){
        .bannerHolder .bannerRibbon div img{
            height: 30px;
            width: 30px;
        }
        .bannerHolder .bannerRibbon h3{
            font-size: 15px;
        }
	}
</style>