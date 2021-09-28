<script>
	export let post;
	
    
    console.log(post);

</script>

<article >
  <a href="{`/blog/${post.handle}`}" class="">
    <header class="layout-col orderC itemsS">
        <h4>{post.title}</h4>
        <p>{post.publishedAt.split(':')[0].split('T')[0]}</p>
        <img src='/img/sig.svg' alt='arrow go'>
    </header>
     
    <div class="imgHolder">
       <img src='{post.image.src}' alt='arrow go' class="postImg">
    </div>
  </a>
</article>

<style>
	article{
		width: 100%;
		margin-top: 30px;
		margin-bottom: 30px;
		position: relative;
		overflow: hidden;
	}
	

	article header{
		color: #757575;
		font-size: 13px;
		padding: 20px 60px;
		background-color: white;
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
		font-size: 18px;
		font-weight: bold;
		color: #757575;
		line-height: 20px;
		margin-bottom: 0;
	}
	p{
		font-size: 13px;
		line-height: 15px;
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

	}
	
</style>
