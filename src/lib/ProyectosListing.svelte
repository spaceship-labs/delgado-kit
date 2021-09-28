<script>
	


</script>

<div class='container'>

	<section class="layout-row orderS itemsS">
		<article >
          <a href="" class="">
            <header class="layout-col orderC itemsS">
                <h4>proyecto de amueblado</h4>
            </header>
             
            <div class="imgHolder">
               <img src='/img/sucursales/cancun5.jpeg' alt='proyecto' class="postImg">
            </div>
          </a>
        </article>


        <article >
          <a href="" class="">
            <header class="layout-col orderC itemsS">
                <h4>proyecto de amueblado</h4>
            </header>
             
            <div class="imgHolder">
               <img src='/img/sucursales/cancun5.jpeg' alt='proyecto' class="postImg">
            </div>
          </a>
        </article>



        <article >
          <a href="" class="">
            <header class="layout-col orderC itemsS">
                <h4>proyecto de amueblado</h4>
            </header>
             
            <div class="imgHolder">
               <img src='/img/sucursales/cancun5.jpeg' alt='proyecto' class="postImg">
            </div>
          </a>
        </article>



        <article >
          <a href="" class="">
            <header class="layout-col orderC itemsS">
                <h4>proyecto de amueblado</h4>
            </header>
             
            <div class="imgHolder">
               <img src='/img/sucursales/cancun5.jpeg' alt='proyecto' class="postImg">
            </div>
          </a>
        </article>

	</section>

	
</div>
<style>
	.container{
		padding-top: 29px;
		max-width: 1312px;
		margin: 0 auto;
	}
	section{
		display: flex;
		flex-wrap: wrap;
	}

	article{
		width: 100%;
		margin-top: 30px;
		margin-bottom: 30px;
		position: relative;
		overflow: hidden;
	}
	

	article header{
		color: white;
		font-size: 13px;
		padding: 20px 60px;
		background-color: #738dc8;
        text-align: left;
        min-height: 200px;
        margin-top: 70px;
        margin-bottom: 70px;
        width: 55%;
        position: relative;
        z-index: 2;
        box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
        -webkit-box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
        -moz-box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
        text-transform: uppercase;
	}
	article header img{
		width: 30px;
	}
	
	article .postImg{
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	article .imgHolder{
		position: absolute;
		z-index: 1;
		width: 55%;
		height: 100%;
		margin: auto;
		right: 0;
		top:  0;
	}
	h4{
		font-size: 22px;
		font-weight: bold;
		color: white;
		line-height: 24px;
		margin-bottom: 0;
		margin-top: 0;
	}
	p{
		font-size: 13px;
		line-height: 15px;
	}
    
    @media only screen and (max-width: 1300px){
       .container{
       	padding-right: 20px;
       	padding-left: 20px;
       }
    }
	@media only screen and (max-width: 600px){

       article{
         padding-top: 200px;
       }

       article header{
       	 padding: 20px 20px;
         min-height: 150px;
         margin-top: 0px;
         margin-bottom: 0px;
         width: 100%;
         text-align: center;
       }
       article .imgHolder{
         position: absolute;
         z-index: 1;
         width: 100%;
         height: 200px;
         margin: auto;
         right: 0;
         top:  0;
       }

       h4{
		text-align: center;
       }
	}
	
</style>