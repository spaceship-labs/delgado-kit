<script>
	// export let options = ['#DA9458','#282828', '#634E41','#552A1A','#C9C3C3'];
	export let variants;
	export let selected = 0;
	export let qty;
	export let gall;
	export let images;
	let hasHex = true;
    
    //console.log(variants);
	let updateVariant = (num)=>{
      selected = num;
      qty = 1;
      if(gall != null && images != null){
        for (let i = images.length - 1; i >= 0; i--) {
            if(images[i].node.id == variants[num].image.id){
               gall.slideTo(i+1,false,false);
               break;
            }
        }
      }
	}

	for(let variant of variants){
       if(variant.metafield == null){
       	hasHex = false;
       }
       else{
       	 if(variant.metafield.key != 'color'){
         	hasHex = false;
         }
         else{
         	if(variant.metafield.value == '' || variant.metafield.value == null){
               hasHex = false;   
         	}
         }
       }
	}
</script>
<article>
	{#if hasHex}
	 <h4>Color</h4>
	{:else}
	 <h4>Variantes</h4>
	{/if}
	<ul>
       {#if hasHex}
		{#each variants as variant, i}
			 <li><button class="{selected === i ? 'selected' : ''}"  
				style="{variant.metafield.key == 'color' ? 'background-color:'+variant.metafield.value : 'background-color: '+'#ffff'}"  
				        on:click="{() => {updateVariant(i)} }" ></button></li>	
		    
		    
		{/each}
	   {:else}
	     <select on:change="{() => {updateVariant(this.value)} }">
	     	{#each variants as variant, i}
	     	  <option  value="{i}">{variant.title}</option>
	     	{/each}
	     </select>
	   {/if}
	</ul>
</article>

<style>
	article{
		/*margin-left: 40px;*/
	}
	ul{
		list-style-type: none;
		display: flex;
		margin: 0;
		padding: 0;
	}
	li button{
		width: 44px;
		height: 43px;
		border: 2px solid #b6b6b6;
		margin: 0 12px 0 0;
		border-radius: 0;
	}
	h4{
		text-transform: uppercase;
		color: #a2a2a2;
		font-weight: bold;
		font-size: 11.5px;
		margin: 12px 0 7px;
	}
	li button.selected{
		border: 6px solid #b6b6b6;
		width: 57px;
		height: 55px;
		margin-top: -6px;
		margin-left: -8px;
		margin-right: 4px;
	}

	li button.cafe{
      background-color: #DA9458;
	}
	li button.blanco{
	  background-color: #C9C3C3;
	}
	li button.cafe-obscuro{
	  background-color: #634E41;
	}
	li button.negro{
	  background-color: #282828;
	}
</style>