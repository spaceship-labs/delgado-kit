<script>
	export let post;
	
    
    console.log(post);

</script>

<article >
  <a href="{`/blog/${post.handle}`}" class="">
  	<div class="imgHolder">
       <img src='{post.image.src}' alt='arrow go' class="postImg">
    </div>
    <header class="">
        <h4>{post.title}</h4>
        <p>{post.publishedAt.split(':')[0].split('T')[0]}</p>
        <img src='/img/sig.svg' alt='arrow go'>
    </header>
     
    
  </a>
</article>

<style>
	article{
		width: 100%;
		margin-top: 30px;
		margin-bottom: 30px;
		position: relative;
		overflow: hidden;
		box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
    -webkit-box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
    -moz-box-shadow: 10px 10px 11px 1px rgba(0,0,0,0.24);
	}
	

	article header{
		color: #757575;
    font-size: 13px;
    padding: 20px 20px;
    background-color: white;
    text-align: left;
    min-height: 150px;
    width: 100%;
    box-sizing: border-box;
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
		width: 100%;
		height: 200px;
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
	.price {
	    margin: 1px 40px;
	}
	.options{
		margin: 8px 26px 25px;
	}
	.options .button{
		display: inline-block;
		font-size: 11.5px;
		padding: 12px 19px 9px;
		text-align: center;
		margin: 10px 3px;
		width: 100%;
		max-width: 170px;
	}

	
</style>
